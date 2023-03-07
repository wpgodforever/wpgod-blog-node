const env = process.env.NODE_ENV || 'development';
const port = 1244
let baseUrl = ''
if(env === 'development'){
    baseUrl = 'http://127.0.0.1'
}else{
    baseUrl = '待上线'
}
module.exports = {
    port,
    baseUrl
}