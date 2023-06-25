// 获取指定目录的文件路径信息
import rest from '@/libs/rest'
import config from '@/config'

// copyOrMoveFileByExcel 迁移或者复制文件
function copyOrMoveFileByExcel (params) {
  return rest({
    url: `${config.ApiHost}/tools/copyOrMoveFileByExcel`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  copyOrMoveFileByExcel: copyOrMoveFileByExcel
}
