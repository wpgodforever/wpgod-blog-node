const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/test')
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
    new: Boolean,
})

// 创建集合并应用规则
const Test = mongoose.model('Test',testScheme)

// ----------------------------------------------增

// // 用定义的集合来创造数据集合
// const test = new Test({
//     name: 'test1',
//     test: true,
// })
// // 再保存
// test.save()

// 用集合上的create方法插入数据  
//注意：这种方法不需要调用save方法
// Test.create({new:true},(err, doc) =>{
//     console.log(err)//错误对象
//     console.log(doc)//插入的文档
// })

// // 也可以用promise的方式
// Test.create({name:'creat插入数据2',test:true}).then(res=>{
//     console.log('插入成功',res)
// })
// .catch(err=>{
//     console.log(err)
// })



// ------------------------------------------查
//查询全部
// Test.find().then(res =>{
//     console.log('查询结果',res)
// })

// 查询某一条件
// Test.find({
//     name:'import'
// }).then(res =>{
//     console.log('查询结果',res)
// })

// 表达式查询 匹配大于小于 $gt大于  $lt小于
// Test.find({
//      age: {$gt:20, $lt:50}
// }).then(res =>{
//     console.log('查询结果',res)
// })

// 匹配包含 $in
// Test.find({
//      hobbies: {$in: ['敲代码']}
// }).then(res =>{
//     console.log('查询结果',res)
// })

// 查询某一字段 
// Test.find().select('name -_id')
// .then(res =>{
//     const arr = res.filter(v => {
//         return JSON.stringify(v) !== "{}"
//     })
//     console.log('查询结果',arr)
// }).catch(err =>{
//     console.log(err)
// })

// 删除数据
// Test.findByIdAndDelete('63f83035f25d8e234d568602')
// .then(res =>{
//     console.log('删除成功',res)
// }).catch(err =>{
//     console.log(err)
// })


// -----------------------------------改
// // 更新数据
// Test.updateOne({name:'test1'},{name:'test111'})
// .then(res =>{
//     console.log('更新成功',res)
// }).catch(err =>{
//     console.log(err)
// })






