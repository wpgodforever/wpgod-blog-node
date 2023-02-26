const express = require('express')

const app = express()
// 引入user模块
const user = require('./router/user')
// 引入jwt校验模块
const { expressjwt } = require('./lib/expressJwt')
app.use(expressjwt)
app.use('/user',user)

// jwt错误捕获
app.use((err, req, res, next) => {
    console.log('错误名',err.name)
    if(err.name === "UnauthorizedError"){
        res.status(401)
        .json({
            code:0,
            msg:"无效token,请重新登录"
        })
    }else{
        next(err)
    }
})

app.listen(1244,() => {
    console.log('node启动成功，端口为1244')
})
