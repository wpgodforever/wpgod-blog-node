//----------------------------------------
const mongodb = require('../lib/mongoDB')
// 连接数据库
mongodb.connect()
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

const Comment = mongodb.mongoose.model('Comment',CommentSchema)

module.exports = {
    User,
    Comment
}