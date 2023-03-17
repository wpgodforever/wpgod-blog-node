const express = require('express')
const { port, baseUrl } = require('../lib/config')
const fs=require('fs')
const app = express()
const router = express.Router()
const { Comment, Reply } = require('../models/comment')
const { responseClient } = require('../lib/request')

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
module.exports = router