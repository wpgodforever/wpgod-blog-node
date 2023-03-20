//----------------------------------------
const mongodb = require('../lib/mongoDB')
// 创建表模块
let Schema = mongodb.mongoose.Schema
// 新增文章表
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    author:{
        // 作者字段需关联用户表ID
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    // 是否置顶
    isTop:{
        type: Number || String
    },
    // 摘要
    desc: {
        type: String,
    },
    // 封面
    cover: {
        type: String,
    },
    // 文章内容
    text: {
        type: String,
        required: true,
    },
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

const Article = mongodb.mongoose.model('Article',ArticleSchema)

// 新增标签表
const TagSchema = new Schema({
    tag:{
        type: String,
        required: true,
    }
})
const Tags = mongodb.mongoose.model('Tags',TagSchema)

module.exports = {
    Article,
    Tags
}