/*
文件级档案转化
*/
import timeUtil from '@/libs/timeUtil'
import rest from '@/libs/rest.js'
import config from '@/config/index.js'

// 暴露的方法
function getColumns (copyTransFileFunc, transFileFunc) {
  let columns = getFileTransColumns()
  columns.unshift({
    type: 'selection',
    width: 30,
    align: 'center'
  })
  columns.push({
    title: '操作',
    key: 'action',
    width: 250,
    fixed: 'right',
    align: 'left',
    render: (h, params) => {
      let buttonList = []
      let editBtn = h(
        'el-button',
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
        'el-button',
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
      buttonList.push(copyBtn)
      return h('div', {}, buttonList)
    }
  })
  return columns
  // return [
  //   {
  //     type: 'selection',
  //     width: 60,
  //     align: 'center'
  //   },
  //   {
  //     title: '自增编号',
  //     key: 'id',
  //     width: 120,
  //     align: 'center'
  //   },
  //   {
  //     title: '年度',
  //     key: 'annual',
  //     width: 200,
  //     align: 'center'
  //   },
  //   {
  //     title: '期限',
  //     key: 'deadLine',
  //     width: 120,
  //     align: 'center'
  //   },
  //   {
  //     title: '问题机构',
  //     key: 'organize',
  //     width: 150,
  //     align: 'center'
  //   },
  //   {
  //     title: 'md5值',
  //     key: 'md5',
  //     width: 150,
  //     align: 'center'
  //   },
  //   {
  //     title: '转化文件路径',
  //     key: 'trans_file_path',
  //     width: 100,
  //     align: 'center'
  //   },
  //   {
  //     title: '创建时间',
  //     width: 220,
  //     align: 'center',
  //     render: (h, params) => {
  //       return h('div', timeUtil.formatDate(new Date(params.row.createdTimestamp * 1000), 'yyyy-MM-dd hh:mm:ss', '-'))
  //     }
  //   }, {
  //     title: '操作',
  //     key: 'action',
  //     width: 300,
  //     fixed: 'right',
  //     align: 'left',
  //     render: (h, params) => {
  //       let buttonList = []
  //       let editBtn = h(
  //         'el-button',
  //         {
  //           props: {type: 'info', size: 'small', class: 'container'},
  //           style: {margin: '5px 5px'},
  //           on: {
  //             click: () => {
  //               transFileFunc(params.row.id)
  //             }
  //           }
  //         },
  //         '文件转化'
  //       )
  //
  //       let copyBtn = h(
  //         'el-button',
  //         {
  //           props: {type: 'error', size: 'small'},
  //           style: {margin: '5px 5px'},
  //           on: {
  //             click: () => {
  //               copyTransFileFunc(params.row.transFilePath)
  //             }
  //           }
  //         },
  //         '复制转化文件'
  //       )
  //
  //       buttonList.push(editBtn)
  //       buttonList.push(copyBtn)
  //       return h('div', {}, buttonList)
  //     }
  //   }
  // ]
}

function getFileTransColumns () {
  return [
    {
      title: '自增编号',
      key: 'id',
      width: 100,
      align: 'center'
    },
    {
      title: '年度',
      key: 'annual',
      width: 100,
      align: 'center'
    },
    {
      title: '期限',
      key: 'deadLine',
      width: 80,
      align: 'center'
    },
    {
      title: '问题机构',
      key: 'organize',
      width: 150,
      align: 'center'
    },
    {
      title: 'md5值',
      key: 'md5',
      width: 250,
      align: 'center'
    },
    {
      title: '转化文件路径',
      key: 'transFilePath',
      width: 200,
      align: 'center'
    },
    {
      title: '创建时间',
      width: 220,
      align: 'center',
      render: (h, params) => {
        return h('div', timeUtil.formatDate(new Date(params.row.createdTimestamp * 1000), 'yyyy-MM-dd hh:mm:ss', '-'))
      }
    }
  ]
}

function getWenJianJiListData (params, page) {
  let data = {
    annual: params.annual,
    deadLine: params.deadLine,
    organize: params.organize,
    page: parseInt(page.current),
    pageSize: parseInt(page.pageSize)
  }
  return rest({
    url: `${config.ApiHost}/wenJianJi/list`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

function transFileByID (wenJianJiID) {
  return rest({
    url: `${config.ApiHost}/wenJianJi/transByID?id=` + wenJianJiID,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

function dataSourceTrans () {
  return rest({
    url: `${config.ApiHost}/wenJianJi/dataSourceTrans`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export default {
  // 暴露的方法
  getColumns: getColumns,
  getFileTransColumns: getFileTransColumns,
  getWenJianJiListData: getWenJianJiListData,
  transFileByID: transFileByID,
  dataSourceTrans: dataSourceTrans
}
