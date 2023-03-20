// 用于定义数据表结构
const mongoose = require('mongoose')
const {baseUrl,port, db} = require('./config')
const url = baseUrl+db
console.log(url)
mongoose.set('strictQuery', false);
exports.connect = () => {
    mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(() => {
        console.log('数据库连接失败')
    })
}
exports.mongoose = mongoose