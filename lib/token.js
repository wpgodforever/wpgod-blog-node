// 引入jwt
const  jwt = require('jsonwebtoken')
const secret = 'wp124'; //自定义密匙
// jwt生成token 
// let token = jwt.sign({请求里的信息},加密密码，{expiresIn过期时间，algorithm加密方式})
let createToken = function (data) {
  let token =  jwt.sign(data, secret, {
    expiresIn:  60 * 60 * 24 * 3, // 以s作为单位（目前设置的过期时间为3天）
    algorithm: 'HS256'
    });
  return token;
};
 module.exports = { createToken };