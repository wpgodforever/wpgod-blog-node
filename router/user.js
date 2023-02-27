const express = require('express')

const app = express()
const router = express.Router()
const { User } = require('../models/user')
const { responseClient } = require('../lib/request')
// 引入jwt
const  jwt = require('jsonwebtoken')


// 用户注册接口
router.post('/register',(req, res) =>{
    const username = req.body.username
    const password = req.body.password
    if(!username){
        responseClient(res,400,1,'请输入用户名')
        return
    }
    if(!password){
        responseClient(res,400,1,'请输入密码')
        return
    }
    User.findOne({username}).then(data => {

        if(data){
            responseClient(res,400,1,'用户名重复')
            return
        }
        User.create({
            username,
            password
        }).then(doc =>{
            responseClient(res,200,0,'注册成功')
            return
        }).catch(err => {
            responseClient(res,401,1,'注册失败')
            return
        })
    })
})



router.get('/login',(req,res) =>{
    console.log('访问登录接口')
    // jwt生成token 
    // let token = jwt.sign({请求里的信息},加密密码，{expiresIn过期时间，algorithm加密方式})
    // res.json({
    //     code:200,
    //     msg:'注册成功',
    //     token
    // })
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndwIiwiaWF0IjoxNjc3NDE1OTIyLCJleHAiOjE2Nzc0MTY1MjJ9.Bg0I_6L5BOXp_l9mHTzw5ZuSR7K72CjCTt-5tUCZOiQ
    let token = jwt.sign({username:"wp"},'wp124',{
        expiresIn:'600s',
        algorithm: 'HS256'
    })
    res.json({
        code:200,
        msg:'注册成功',
        token
    })
})

router.post('/test',(req,res) => {
    console.log('访问了/user/test')
})

module.exports = router