const express = require('express')
const { port, baseUrl } = require('../lib/config')
const fs=require('fs')
const app = express()
const router = express.Router()
const { Article } = require('../models/article')
const { responseClient } = require('../lib/request')
//引入multer模块
const  multer = require('multer')
//创建上传对象
// let upload = multer({ storage: storage });
let upload = multer({ dest: 'public/uploadImg/' });

// 上传图片接口  -------------------------------------------
//upload.single("coverImg")  单文件
//upload.array("coverImg",8)  走多文件上传
// coverImg为前端上传时表单对应的字段
router.post('/uploadImg',upload.single("file",8),(req, res) =>{
    //获取文件后缀名
    const appendName=req.file.originalname.split('.')[1]
    fs.rename(req.file.path,`public/uploadImg/${req.file.filename}.${appendName}`,function (err) {
        if (err) throw err
    })
    // console.log(req.file,req.files);
    responseClient(res,200,200,'上传成功',{
        url:`${baseUrl}:${port}/public/uploadImg/${req.file.filename}.${appendName}`
    })
})

// 发布文章接口
router.post('/post',(req, res) => {
    console.log(req.body)
})


module.exports = router