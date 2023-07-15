import rest from '@/libs/rest'
import config from '@/config'

// 单纯pdf合并 -- 将指定目录下的所有pdf合并成一个pdf pdf_result
function mergePdfDir (params) {
  return rest({
    url: `${config.ApiHost}/tools/mergePdfDir`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 特殊合并,将pdf第一页替换成另外一个指定目录相同名的jpg -- 将指定目录下的pdf的第一页替换成另外一个指定目录相同名的jpg
function mergePdfAndImgSpec (params) {
  return rest({
    url: `${config.ApiHost}/tools/mergePdfSpecFirst`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//  pdf转为jpg -- 将指定目录下的所有pdf转为jpg图片,每一个pdf的图片在单独的目录中
function oPdfDir2Img (params) {
  return rest({
    url: `${config.ApiHost}/tools/oPdfDir2Img`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//  图片转pdf -- 将指定目录下的所有文件合并成一个pdf pdf_result
function imgDir2Pdf (params) {
  return rest({
    url: `${config.ApiHost}/tools/imgDir2Pdf`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//  特殊合并,将pdf最后一页替换成另外一个指定目录相同名的jpg -- 将指定目录下的pdf的第一页替换成另外一个指定目录相同名的jpg
function mergePdfAndImgSpecEnd (params) {
  return rest({
    url: `${config.ApiHost}/tools/mergePdfAndImgSpecEnd`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//  特殊合并,从指定页数开始替换pdf页内容，替换的页数等于新pdf的页数
function mergePdfSpec (params) {
  return rest({
    url: `${config.ApiHost}/tools/mergePdfSpec`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  mergePdfDir: mergePdfDir,
  mergePdfAndImgSpec: mergePdfAndImgSpec,
  oPdfDir2Img: oPdfDir2Img,
  imgDir2Pdf: imgDir2Pdf,
  mergePdfAndImgSpecEnd: mergePdfAndImgSpecEnd,
  mergePdfSpec: mergePdfSpec,
  ATMergePdfDir: '1',
  ATMergePdfAndImgSpec: '2',
  ATOPdfDir2Img: '3',
  ATImgDir2Pdf: '4',
  ATMergePdfAndImgSpecEnd: '5'
}
