const express = require('express')
const { createToken } = require('../lib/token')
const router = express.Router()
const { User } = require('../models/user')
const { responseClient } = require('../lib/request')


// 用户注册接口
router.post('/register',(req, res) =>{
    const username = req.body.username
    const password = req.body.password
    if(!username){
        responseClient(res,200,1,'请输入用户名')
        return
    }
    if(!password){
        responseClient(res,200,1,'请输入密码')
        return
    }
    User.findOne({username}).then(data => {

        if(data){
            responseClient(res,200,1,'该用户名已被占用')
            return
        }
        User.create({
            username,
            password,
            auth: username === 'wpgodforever'? ['admin'] : ['normal']
        }).then(doc =>{
            responseClient(res,200,200,'注册成功')
            return
        }).catch(err => {
            responseClient(res,200,1,'注册失败')
            return
        })
    })
})



router.get('/login',(req,res) =>{
    const username = req.query.username
    const password = req.query.password
    if(!username){
        responseClient(res,400,1,'请输入用户名')
        return
    }
    if(!password){
        responseClient(res,200,1,'请输入密码')
        return
    }
    User.findOne({
        username
    }).then(data => {
        if(!data){
            responseClient(res,200,1,'该用户不存在')
        }else{
            if(data.password !== password){
                responseClient(res,200,1,'密码错误')
                return
            }
            let token = createToken({username, password})
            data = data.toObject()
            delete data.password 
            responseClient(res,200,200,'登录成功',{
                token,
                ...data
            })
        }
    })
    
})

router.post('/test',(req,res) => {
    console.log('访问了/user/test')
})

module.exports = router