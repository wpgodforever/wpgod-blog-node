const express = require('express')

const app = express()
const router = express.Router()
// 引入jwt
const  jwt = require('jsonwebtoken')

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