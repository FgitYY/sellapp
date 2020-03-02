//所有请求封装接口文件
import axios from 'axios'
// axios.defaults.baseURL='http://127.0.0.1:3000'
// 相等
//创建一个请求对象
const req= axios.create({
    baseURL:'http://127.0.0.1:3000',//基本路径
    timeout: 5000//ms  请求5秒 10秒没请求到就提示超时   超时限制
})
// 二次封装
//请求商家信息
export function getseller(){
   return req.get('/api/seller')
}
//请求商品信息
export function getgoods(){
    return req.get('/api/goods',{
        params:{
            seller:self.messageInfo
        }
    })
}
//请求坪价信息
export function getratings(){
    return req.get('/api/ratings')
}