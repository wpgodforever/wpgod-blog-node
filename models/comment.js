//----------------------------------------
const mongodb = require('../lib/mongoDB')
// 连接数据库
mongodb.connect()
// 创建表模块
let Schema = mongodb.mongoose.Schema

// 评论表
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
        // 评论人的id
        reply_user_id:{
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        // 记录创建时间和修改时间  
        timestamps:true
    }
)
// 评论关联一对多(查出该条评论的所有回复)
// 用虚拟字段virtual
CommentSchema.virtual("replys",{
    ref: "Reply",
    localField: "_id",//用当前评论的id 关联回复表里article_id
    foreignField: "reply_common_id",
    justOne: false,//全部回复
    // count: true //若为true则只显示数组长度，不显示数组内容
})
// 下面这两句必须要写，这样虚拟字段才可以显性看到
CommentSchema.set("toObject", {virtuals:true})
CommentSchema.set("toJSON", {virtuals:true})
const Comment = mongodb.mongoose.model('Comment',CommentSchema)

// 回复评论表
const ReplySchema = new Schema(
    {
        replyContent: {//回复内容
            type: String,
            required: true,
        },
        reply_common_id: {//回复的那条评论的id
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'Comment'
        },
        // 回复的人的id
        reply_user_id:{
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        // 被回复的人的id
        get_reply_user_id:{
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        article_id: {//该回复在那个文章里
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'Article'
        },
    },
    {
        // 记录创建时间和修改时间  
        timestamps:true
    }
)


const Reply = mongodb.mongoose.model('Reply',ReplySchema)


module.exports = {
    Comment,
    Reply,
}