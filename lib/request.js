// 响应客户端封装
const responseClient = (res,httpCode = 500, code = 3, message = '服务端异常', data = {}) => {
    let responseData = {};
    responseData.code = code;
    responseData.msg = message;
    responseData.data = data;
    res.status(httpCode).json(responseData);
}




module.exports = {
    responseClient
}