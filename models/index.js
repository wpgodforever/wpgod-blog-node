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
},{
    // 记录创建时间和修改时间
    timestamps:true
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
        // 作者字段需关联用户表ID
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    // 记录创建时间和修改时间
    timestamps:true
})

const Article = mongoose.model('Article',ArticleSchema)

// 新增评论表
const CommentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        article_id: {
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'Article'
        },
        // 回复的人的id
        reply_user_id:{
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        // 记录创建时间和修改时间
        timestamps:true
    }
)

const Comment = mongoose.model('Comment',CommentSchema)

module.exports = {
    Article,
    User,
    Comment
}