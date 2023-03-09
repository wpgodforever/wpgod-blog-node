// express-jwt解析jwt
const { expressjwt } = require('express-jwt')


exports.expressjwt  = expressjwt({
    secret: "wp124",
    algorithms: ["HS256"]
})
.unless({
    path:[
        {
            url:/^\/api\/article\/\w+/,
            methods:["GET"]
        },
        '/user/register',
        '/user/login',
        '/article/detail',
        '/article/list',
    ]
})
// 哪个路由不需要token校验就加进去
// .unless({
//     path: [
//         "/user/login"
//     ]
// })