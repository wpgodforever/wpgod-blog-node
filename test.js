const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/test')
.then(() => {
    console.log('连接成功')
})
.catch(() => {
    console.log('连接失败')
})
// 设定集合规则
const testScheme =  new mongoose.Schema({
    name: String,
    test: Boolean,
})

// 创建集合并应用规则
const Test = mongoose.model('Test',testScheme)

// 用定义的集合来创造数据集合
const test = new Test({
    name: 'test',
    test: true,
})
// 再保存
test.save()




