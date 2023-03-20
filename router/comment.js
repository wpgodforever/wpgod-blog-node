const express = require('express')
const router = express.Router()
const { Comment, Reply } = require('../models/comment')
const { responseClient } = require('../lib/request')

// 评论接口
router.post('/input',(req,res) => {
    const { content, article_id, reply_user_id, } = req.body
    Comment.create({
        content,
        article_id,
        reply_user_id,
    }).then(commentRes => {
        console.log(commentRes)
        responseClient(res,200,200,'评论成功')
    }).catch(err => {
        responseClient(res,200,400,err)
    })
})
// 回复评论接口
router.post('/reply',(req,res) => {
    const { replyContent, reply_common_id, reply_user_id, get_reply_user_id, article_id } = req.body
    Reply.create({
        replyContent,
        article_id,
        reply_user_id,
        reply_common_id,
        get_reply_user_id
    }).then((commentRes) => {
        responseClient(res,200,200,'回复成功',commentRes)
    }).catch(err => {
        responseClient(res,200,400,err)
    })
})

// 获取留言板评论接口
router.get('/list',(req,res) => {
    Comment.find({
        article_id:null,
    }).populate([{
        path: 'replys',
        model: 'Reply',
        options:{
            sort:{
                'createdAt':-1
            }
        },
        populate:[{
            path: 'reply_user_id',
            select: 'username',
            model: 'User',
        },{
            path: 'get_reply_user_id',
            select: 'username',
            model: 'User',
        },]
    },{
        path: 'reply_user_id',
        select: 'username',
        model: 'User',
        
    }]).then(commentRes => {
        responseClient(res,200,200,'查询成功',commentRes)
    }).catch(err => {
        responseClient(res,200,400,err)
    })
})

module.exports = router