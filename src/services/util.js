// getDataNoPagePostProcess 请求接口异常统一处理列表接口
function getDataNoPagePostProcess (response, vModel) {
  if (response.code === 0) {
    vModel.table.dataArray = response.data.list
    vModel.page.total = response.data.total
    console.log('data', response.data)
  } else {
    let message = '请求异常:' + response.msg
    vModel.$Notice.error({
      desc: message
    })
  }
}

export default {
  getDataNoPagePostProcess: getDataNoPagePostProcess
}
