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

const Comment = mongodb.mongoose.model('Comment',CommentSchema)

// 回复评论表
const ReplySchema = new Schema(
    {
        content: {//回复内容
            type: String,
            required: true,
        },
        reply_common_id: {//回复的那条评论的id
            type:Schema.Types.ObjectId,
            required: true,
            ref: 'Article'
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