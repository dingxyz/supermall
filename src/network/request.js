// 这个文件是封装的 axios的模块

import axios from 'axios'

export function request(config) {
  // 1.创建 axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  // 2.axios拦截器 (对数据进行拦截检查, 防止黑客攻击, 或者错误提交)
  // 2.1: 请求拦截
  instance.interceptors.request.use(config => {

    return config      // 一定记得返回出去, 不然请求就失败了
  }, err => {
    // 拦截请求 失败(很少进入这里)
    // console.log(err)
  })

  // 2.2: 响应拦截
  instance.interceptors.response.use(res => {
    // 响应拦截 成功
    return res.data     // 一定记得返回出去, 不然别的地方就拿不到这个结果了
  }, err => {
    // 响应拦截 失败
    console.log(err)
  })


  // 3.发送真正的网络请求
  // instance的返回值就是一个Promise
  return instance(config)
}

