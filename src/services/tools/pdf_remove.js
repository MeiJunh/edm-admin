// 获取指定目录的文件路径信息
import rest from '@/libs/rest'
import config from '@/config'

// removePdf 截取指定pdf指定区间生成新文件
function removePdf (params) {
  return rest({
    url: `${config.ApiHost}/tools/removePdf`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  removePdf: removePdf
}
