//----------------------------------------
const mongodb = require('../lib/mongoDB')
// 创建表模块
let Schema = mongodb.mongoose.Schema

// 新增用户表
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // 用户权限  admin  normal
    auth: {
        type: Array,
        default: ['normal'],
    },
})

const User = mongodb.mongoose.model('User',UserSchema)

module.exports = {
    User
}