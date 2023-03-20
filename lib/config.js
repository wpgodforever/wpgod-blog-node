const env = process.env.NODE_ENV;
const port = 1244
const db = '/test'
let baseUrl = ''
if(env){
    baseUrl = 'mongodb://127.0.0.1:27017'
}else{
    console.log('----------------------')
    baseUrl = 'mongodb://root:wp19970319@47.95.203.205:27017'
}
console.log(baseUrl,'----------------------')
module.exports = {
    port,
    baseUrl,
    db
}