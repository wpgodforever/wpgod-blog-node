const express = require('express')
const { port, baseUrl } = require('../lib/config')
const fs = require('fs')
const app = express()
const router = express.Router()
const { Article, Tags } = require('../models/article')
const { responseClient } = require('../lib/request')
const { isAdmin } = require('../lib/middleware')
const { accessKeyId, accessKeySecret } = require('../ossConfig')
//引入multer模块
const multer = require('multer')
// 阿里云OSS 相关-+-------------------------------------
const MAO = require('multer-aliyun-oss');//npm install --save multer-aliyun-oss
//创建上传对象----------------------------------------------------
// let upload = multer({ dest: 'public/uploadImg/' });
// 阿里云上传文章详情图片使用
const upload = multer({
    storage: MAO({
        config: {
            region: 'oss-cn-guangzhou',
            accessKeyId: accessKeyId,
            accessKeySecret: accessKeySecret,
            bucket: 'wpbucket124'
        },
        destination: 'public/images/detail'
    })
});


// 文章详情上传图片接口  -------------------------------------------
//upload.single("coverImg")  单文件
//upload.array("coverImg",8)  走多文件上传
// coverImg为前端上传时表单对应的字段
router.post('/uploadImg/detail', upload.single("file"), (req, res) => {
    // 本地上传---------------------------
    // //获取文件后缀名
    // const appendName=req.file.originalname.split('.')[1]
    // fs.rename(req.file.path,`public/uploadImg/${req.file.filename}.${appendName}`,function (err) {
    //     if (err) throw err
    // })
    // res.send({
    //     code:200,
    //     msg:'上传成功',
    //     data:{
    //         url:`${baseUrl}:${port}/public/uploadImg/${req.file.filename}.${appendName}`
    //     }
    // })
    // 阿里云OSS上传-------------------------------
    // 可以自定义返回结果，推荐打印 req.file 查看，再决定如何返回数据给前端
    const file = req.file;
    res.send({
        status: '上传成功',
        code: 200,
        url: `https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/images/detail/${file.filename}`
    });
})
// 阿里云上传文章详情图片使用
const uploadCover = multer({
    storage: MAO({
        config: {
            region: 'oss-cn-guangzhou',
            accessKeyId: accessKeyId,
            accessKeySecret: accessKeySecret,
            bucket: 'wpbucket124'
        },
        destination: 'public/images/cover'
    })
});


// 文章封面上传图片接口  -------------------------------------------
router.post('/uploadImg/cover', uploadCover.single("file"), (req, res) => {
    const file = req.file;
    res.send({
        status: '上传成功',
        code: 200,
        url: `https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/images/cover/${file.filename}`
    });
})

// 发布文章接口
router.post('/post', isAdmin, (req, res) => {
    console.log(req.body)
    const { title, tags, desc, cover, text, author } = req.body
    // 先看看文章标签表里面有没有新增的没有的标签
    Tags.find({}, { _id: 0, __v: 0 }, { lean: true }).then(tagRes => {

        let tagResArry = tagRes.map(v => v.tag)
        tags.forEach(tagResItem => {
            if (!tagResArry.includes(tagResItem)) {
                Tags.create({
                    tag: tagResItem
                })
            }
        })
    }).then(() => {
        Article.create({
            title,
            tags,
            desc,
            cover,
            text,
            author,
        }).then(articleRes => {
            responseClient(res, 200, 200, '发布成功')
        }).catch(err => {
            responseClient(res, 200, 400, err)
        })
    })
})

// 更新文章接口
router.post('/update', isAdmin, (req, res) => {
    const { title, tags, desc, cover, text, id } = req.body
    // 先看看文章标签表里面有没有新增的没有的标签
    Tags.find({}, { _id: 0, __v: 0 }, { lean: true }).then(tagRes => {

        let tagResArry = tagRes.map(v => v.tag)
        tags.forEach(tagResItem => {
            if (!tagResArry.includes(tagResItem)) {
                Tags.create({
                    tag: tagResItem
                })
            }
        })
    }).then(() => {
        Article.findOneAndUpdate({ _id: id }, {
            title,
            tags,
            desc,
            cover,
            text,
        }).then(articleRes => {
            console.log(articleRes, '------------------')
            responseClient(res, 200, 200, '更新成功')
        }).catch(err => {
            responseClient(res, 200, 400, err)
        })
    })
})

// 删除文章接口
router.post('/delete', isAdmin, (req, res) => {
    const { id } = req.body
    Article.deleteOne({ _id: id }).then(articleRes => {
        console.log(articleRes, '------------------')
        responseClient(res, 200, 200, '删除成功')
    }).catch(err => {
        responseClient(res, 200, 400, err)
    })
})

// 文章详情接口
// populate方法可以关联查询改表的虚拟字段，这里有评论的虚拟字段，要查出来
router.get('/detail', (req, res) => {
    //查出对应id的文章
    // 再查出该文章下的所有评论
    // 再根据每个评论的id查出对应的回复
    Article.find({ ...req.query }).populate([
        {
            path: 'coms',
            model: 'Comment',
            options:{
                sort:{
                    'createdAt':-1
                }
            },
            populate:[{
                path: 'replys',
                model: 'Reply',
                options:{
                    sort:{
                        'createdAt':-1
                    }
                },
            },{
                path: 'reply_user_id',
                select: 'username',
                model: 'User',
                
            }]
        },
    ])
    .then((articleRes, articleReq) => {
        if (!articleRes) return responseClient(res, 200, 400, '没找到该文章')
        responseClient(res, 200, 200, '查询成功', articleRes)
    }).catch(err => {
        responseClient(res, 200, 400, '错误', err)
    })
})

// 文章列表接口
router.get('/list', async (req, res) => {
    const { pageSize = 10, pageNo = 1, tags = '' } = req.query
    // 查询出已有的所有标签
    const tagsArr = await Tags.find({}, { _id: 0, __v: 0 }, { lean: true })
    const tagsArr1 = tagsArr.map(v => v.tag)
    // 获取前端传来想查的标签
    const tagsArrNew = tags ? tags.split(',') : []
    // 因为有可能是查询全部，tags可能为空，所以做一个3元判断
    // 分页
    // .skip((+pageNo -1)*(+pageSize)).limit(+pageSize)
    Article.find({
        tags: { $in: (tagsArrNew.length ? tagsArrNew : tagsArr1) }
    }, {
        title: 1,
        tags: 1,
        updatedAt: 1,
        createdAt: 1,
        cover: 1,
    }).then((articleRes, articleReq) => {
        if (!articleRes) return responseClient(res, 200, 400, '没找到该文章')
        responseClient(res, 200, 200, '查询成功',
            {
                list: [...articleRes],
                tagsNum: tagsArr.length
            })
    })
})

module.exports = router