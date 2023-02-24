// 用于定义数据表结构
const mongoose = require('mongoose')
// 创建表模块
let Schema = mongoose.Schema

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
})

const User = mongoose.model('User',UserSchema)

// 新增文章表
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // 分类
    tag: {
        type: String,
        required: true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Article = mongoose.model('Article',ArticleSchema)

module.exports = {
    Article,
    User
}