const { User } = require('../models/user')
//----------------------------------------
// 用于获取token
exports.getToken = (req) =>{
    const token = req.headers.authorization.slice(7)
    return token
}

// 鉴权
// expressjwt在校验通过后会将用户信息放在在req.auth字段中。若是需要用户信息或者鉴权，可以使用
exports.isAdmin = (req, res, next) =>{
    const username = req.auth.username
    User.findOne({
        username
    }).then( userRes => {
        console.log(userRes,'用户')
        if(userRes.auth.includes('admin')) next()
        else res.status(200).json({code:403, msg: '您没有该权限' })
    })
    
}
