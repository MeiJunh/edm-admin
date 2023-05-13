import timeUtil from '@/libs/timeUtil'
import rest from '@/libs/rest.js'
import config from '@/config/index.js'

// 暴露的方法
function getColumns (copyTransFileFunc, transFileFunc) {
  return [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: '档案编号',
      key: 'id',
      width: 120,
      align: 'center'
    },
    {
      title: '档案信息名',
      key: 'name',
      width: 200,
      align: 'center'
    },
    {
      title: '批次id',
      key: 'batchId',
      width: 80,
      align: 'center'
    },
    {
      title: '批次名',
      key: 'batchNo',
      width: 120,
      align: 'center'
    },
    {
      title: '图片所在目录',
      key: 'imageFolder',
      width: 150,
      align: 'center'
    },
    {
      title: '图片总分数',
      key: 'imageCount',
      width: 150,
      align: 'center'
    },
    {
      title: '插入的页面数',
      key: 'insertPages',
      width: 150,
      align: 'center'
    },
    {
      title: '转化后的文件路径',
      key: 'transFilePath',
      width: 300,
      align: 'left'
    },
    {
      title: '创建时间',
      width: 220,
      align: 'center',
      render: (h, params) => {
        return h('div', timeUtil.formatDate(new Date(params.row.createdTimestamp * 1000), 'yyyy-MM-dd hh:mm:ss', '-'))
      }
    },
    {
      title: '最后一次更新时间',
      width: 220,
      align: 'center',
      render: (h, params) => {
        return h('div', timeUtil.formatDate(new Date(params.row.lastUpdateTime * 1000), 'yyyy-MM-dd hh:mm:ss', '-'))
      }
    }, {
      title: '操作',
      key: 'action',
      width: 300,
      fixed: 'right',
      align: 'left',
      render: (h, params) => {
        let buttonList = []
        let editBtn = h(
          'Button',
          {
            props: { type: 'info', size: 'small', class: 'container' },
            style: { margin: '5px 5px' },
            on: {
              click: () => {
                transFileFunc(params.row.id)
              }
            }
          },
          '文件转化'
        )

        let copyBtn = h(
          'Button',
          {
            props: { type: 'error', size: 'small' },
            style: { margin: '5px 5px' },
            on: {
              click: () => {
                copyTransFileFunc(params.row.transFilePath)
              }
            }
          },
          '复制转化文件'
        )

        buttonList.push(editBtn)
        if (params.row.transStatus === 1) {
          buttonList.push(copyBtn)
        }
        return h('div', {}, buttonList)
      }
    }
  ]
}

function getFileTransColumns () {
  return [
    {
      title: '档案编号',
      key: 'id',
      width: 120,
      align: 'center'
    },
    {
      title: '档案信息名',
      key: 'name',
      width: 200,
      align: 'center'
    },
    {
      title: '批次名',
      key: 'batchNo',
      width: 120,
      align: 'center'
    },
    {
      title: '图片所在目录',
      key: 'imageFolder',
      width: 150,
      align: 'center'
    },
    {
      title: '图片总分数',
      key: 'imageCount',
      width: 150,
      align: 'center'
    },
    {
      title: '插入的页面数',
      key: 'insertPages',
      width: 150,
      align: 'center'
    },
    {
      title: '创建时间',
      width: 220,
      align: 'center',
      render: (h, params) => {
        return h('div', timeUtil.formatDate(new Date(params.row.createdTimestamp * 1000), 'yyyy-MM-dd hh:mm:ss', '-'))
      }
    },
    {
      title: '最后一次更新时间',
      width: 220,
      align: 'center',
      render: (h, params) => {
        return h('div', timeUtil.formatDate(new Date(params.row.lastUpdateTime * 1000), 'yyyy-MM-dd hh:mm:ss', '-'))
      }
    }
  ]
}

function getArchiveListData (params, page, archiveType) {
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

function transFileByArchiveID (archiveID) {
  return rest({
    url: `${config.ApiHost}/archive/transOne?id=` + archiveID,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

function transFileByType (archiveType) {
  return rest({
    url: `${config.ApiHost}/archive/transByType?archiveType=` + archiveType,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

function transFileByIDList (archiveIDList, archiveType) {
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
  getColumns: getColumns,
  getArchiveListData: getArchiveListData,
  transFileByArchiveID: transFileByArchiveID,
  transFileByType: transFileByType,
  transFileByIDList: transFileByIDList,
  getFileTransColumns: getFileTransColumns,
  ATGanBuRenShi: 1, // 干部人事
  ATLiuDongRenYuan: 2, // 流动人员
  ATAnJuanJi: 3, // 案卷级档案
  ATWenJianJi: 4, // 文件级档案
  ATFaYuanSuSong: 5, // 法院诉讼档案
  ATBuDongChan: 6 // 不动产档案

}
