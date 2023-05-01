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
    // 请求处理
    instance(options)
      .then((res) => {
        // 请求成功时,根据业务判断状态
        resolve(res.data)
        return false
      })
  })
}
