import rest from '@/libs/rest'
import config from '@/config'

// 获取指定目录的文件路径信息
function getFileAbsPath (params) {
  return rest({
    url: `${config.ApiHost}/tools/getFileAbsPath`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 获取图片信息
function getPicExInfo (params) {
  return rest({
    url: `${config.ApiHost}/tools/getPicExInfo`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  getFileAbsPath: getFileAbsPath,
  getPicExInfo: getPicExInfo
}
