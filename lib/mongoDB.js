// 用于定义数据表结构
const mongoose = require('mongoose')
const {baseUrl,port, db} = require('./config')
console.log(baseUrl)
mongoose.set('strictQuery', false);
exports.connect = () => {
    mongoose.connect(baseUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(() => {
        console.log('数据库连接失败')
    })
}
exports.mongoose = mongoose