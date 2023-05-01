import Vue from 'vue'
import axios from 'axios'
import JSONbig from 'json-bigint'
import iView from 'iview'

Vue.use(iView)

export default function rest (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 300000, /** 5分钟超时 **/
      withCredentials: true,
      crossDomain: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      transformResponse: [function (data) {
        return JSONbig.parse(data)
      }]
    })
    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        iView.LoadingBar.start()
        // config.headers.Authorization = 'token'
        return config
      },
      err => {
        iView.LoadingBar.error()
        return Promise.reject(err)
      })

    // http response 拦截器
    instance.interceptors.response.use(
      response => {
        iView.LoadingBar.finish()
        return response
      },
      error => {
        iView.LoadingBar.error()
        return Promise.reject(error) // 返回接口返回的错误信息
      })
  })
}
