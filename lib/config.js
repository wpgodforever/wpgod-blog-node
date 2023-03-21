const env = process.env.NODE_ENV;
const port = 1244
const db = '/test'
let baseUrl = ''
if(env){
    baseUrl = 'mongodb://127.0.0.1:27017' + db
}else{
    console.log('----------------------')
    // 线上数据库需要加密验证
    baseUrl = 'mongodb://47.95.203.205:27017'
}
module.exports = {
    port,
    baseUrl,
    db
}
