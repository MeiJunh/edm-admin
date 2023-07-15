// 获取指定目录的文件路径信息
import rest from '@/libs/rest'
import config from '@/config'

// mImgDirTrans 图片格式转化
function mImgDirTrans (params) {
  return rest({
    url: `${config.ApiHost}/tools/mImgDirTrans`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  mImgDirTrans: mImgDirTrans
}
