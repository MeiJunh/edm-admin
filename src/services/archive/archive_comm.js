import rest from '@/libs/rest.js'
import config from '@/config/index.js'

function getArchiveListData(params, page, archiveType) {
  let data = {
    archiveName: params.archiveName,
    archiveType: archiveType,
    page: parseInt(page.current),
    pageSize: parseInt(page.pageSize)
  }
  return rest({
    url: `${config.ApiHost}/archive/list`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

function transFileByArchiveID(archiveID) {
  return rest({
    url: `${config.ApiHost}/archive/transOne?id=` + archiveID,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

function transFileByType(archiveType) {
  return rest({
    url: `${config.ApiHost}/archive/transByType?archiveType=` + archiveType,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

function transFileByIDList(archiveIDList, archiveType) {
  let data = {
    archiveIdList: archiveIDList,
    archiveType: archiveType
  }
  return rest({
    url: `${config.ApiHost}/archive/transByIDList`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  getArchiveListData: getArchiveListData,
  transFileByArchiveID: transFileByArchiveID,
  transFileByType: transFileByType,
  transFileByIDList: transFileByIDList,
  ATGanBuRenShi: 1, // 干部人事
  ATLiuDongRenYuan: 2, // 流动人员
  ATAnJuanJi: 3, // 案卷级档案
  ATWenJianJi: 4, // 文件级档案
  ATFaYuanSuSong: 5, // 法院诉讼档案
  ATBuDongChan: 6 // 不动产档案

}
