const express = require('express')
const { port, baseUrl } = require('./lib/config')
const app = express()
let cors = require('cors'); //引入cors库
const bodyParser = require('body-parser')
// 引入user模块
const user = require('./router/user')
// 引入文章模块
const article = require('./router/article')
// 引入评论模块
const comment = require('./router/comment')
// 引入jwt校验模块
const { expressjwt } = require('./lib/expressJwt')
const mongodb = require('./lib/mongoDB')
// 连接数据库
mongodb.connect()
//----------------------------------------
// 用于处理跨域
app.use(cors())
//----------------------------------------
// 用于解析post请求
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//----------------------------------------
// 接口token验证  过期token验证
app.use(expressjwt)
//----------------------------------------
app.use('/user',user)
app.use('/article',article)
app.use('/comment',comment)
app.get('/',(req,res)=>{
    res.json({
        msg:'部署成功测试'
    })
})

// jwt错误捕获
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(200) 
        .json({
            code:401,
            msg:"token已过期,请重新登录"
        })
        return
    }else{
        res.send(err)
    }
})

app.listen(port,() => {
    console.log(`node启动成功，端口为${port}`)
    console.log(`node部署成功，端口为${port}`)
})
