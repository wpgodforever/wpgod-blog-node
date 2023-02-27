// 用于定义数据表结构
const mongoose = require('mongoose')
exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1/test')
    .then(() => {
        console.log('连接成功')
    })
    .catch(() => {
        console.log('连接失败')
    })
}
exports.mongoose = mongoose