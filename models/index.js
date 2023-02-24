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
        // 作者字段需关联用户表ID
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    // 记录创建时间和修改时间
    timestamps:true
})
// 文章关联一对多(一篇文章查出该文章所有的评论)
// 用虚拟字段virtual
ArticleSchema.virtual("coms",{
    ref: "Comment",
    localField: "_id",//用当前文章的id 关联评论表里article_id
    foreignField: "article_id",
    justOne: false,//全部评论
    // count: true //若为true则只显示数组长度，不显示数组内容
})
// 下面这两句必须要写，这样虚拟字段才可以显性看到
ArticleSchema.set("toObject", {virtuals:true})
ArticleSchema.set("toJSON", {virtuals:true})

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