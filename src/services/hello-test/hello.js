import config from '@/config/index.js'
import rest from '@/libs/rest.js'

function getHelloRsp() {
  return rest({
    url: `${config.ApiHost}/hello/imp`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  getHelloRsp: getHelloRsp,
}
