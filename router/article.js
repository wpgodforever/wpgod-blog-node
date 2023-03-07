const express = require('express')
const app = express()
const router = express.Router()
const { Article } = require('../models/article')
const { responseClient } = require('../lib/request')
//引入multer模块
const  multer = require('multer')
let storage = multer.diskStorage({
    //设置文件存储目录
    destination(req, file, callback) {
        callback(null,'../public/uploadImg');  //传到upload文件中
    },
    //设置上传文件相关信息
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});
//创建上传对象
let upload = multer({ storage: storage });

// 上传图片
//upload.single("coverImg")  单文件
//upload.array("coverImg",8)  走多文件上传
// coverImg为前端上传时表单对应的字段
router.post('/uploadImg',upload.single("coverImg",8),(req, res) =>{
    console.log(req.file,req.files);
    responseClient(res,200,200,'上传成功')
})

module.exports = router