<template>
  <Card>
    <!-- 表单组件 -->
    <Form :label-width="100" inline>
      <FormItem label="年度">
        <Input
          v-model="queryParams.annual"
          clearable
          style="width: 80px"
        />
      </FormItem>
      <FormItem label="期限">
        <Input
          v-model="queryParams.deadLine"
          clearable
          style="width: 80px"
        />
      </FormItem>
      <FormItem label="问题机构">
        <Input
          v-model="queryParams.organize"
          clearable
          style="width: 100px"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="query()">查询</Button>
        <Button class="margin-left-8" @click="clearParams()">重置查询</Button>
        <Button type="error" @click="transFileByType()">文件级归档全部转化execl</Button>
      </FormItem>
    </Form>

    <Form inline>
      <FormItem>
        <Button type="info" @click="transFileByIDList()">文件转化</Button>
      </FormItem>
      <FormItem>
        <Button type="error" @click="dataSourceTrans()">文件级源数据转化</Button>
      </FormItem>
    </Form>
    <!--    <div>-->
    <!--      <Button type="info" @click="transFileByIDList()">文件转化</Button>-->
    <!--    </div>-->
    <!-- 表格组件 -->
    <Table
      :columns="table.columns"
      :data="table.dataArray"
      ref="table"
      width="1648"
      @on-selection-change="selectRowChange"
    ></Table>

    <!-- 分页组件 -->
    <Page
      :current="page.current"
      :page-size="page.pageSize"
      :total="page.total"
      placement="top"
      show-sizer
      show-elevator
      show-total
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    >
    </Page>

    <!-- 模态框 -->
    <Modal
      title="文件转化列表"
      v-model="transFile"
      :closable="true"
      width="1000"
      @on-ok="doFileListTrans"
    >
      <Table
        :columns="table.transFileColumns"
        :data="transFileList"
        ref="table"
      ></Table>
    </Modal>
  </Card>
</template>

<style lang="less">
@import "../../styles/common.less";
</style>

<script>
import apiComm from '@/services/archive/archive_comm'
import api from '@/services/archive/wen_jian_ji'
import util from '@/services/util'

let vModel

export default {
  data () {
    return {
      transFileList: [],
      transFile: false,
      // 查询对象
      queryParams: {},
      // 表单组件对象
      form: {},
      // 表格组件对象
      table: {
        columns: api.getColumns(this.mCopy, this.transFileByID),
        transFileColumns: api.getFileTransColumns(),
        dataArray: []
      },
      // 分页组件对象
      page: { current: 1, pageSize: 20, total: 0 },
      // 模态框对象
      modal: {},
      archiveType: apiComm.ATWenJianJi
    }
  },
  methods: {
    async getData () {
      let oldTotal = this.page.total
      let oldPage = this.page.current
      const response = await api.getWenJianJiListData(this.queryParams, this.page)
      util.getDataNoPagePostProcess(response, vModel)
      if (oldPage !== 1) {
        // 如果不是第一页,取旧的total
        this.page.total = oldTotal
      }
    },
    query () {
      this.page.current = 1
      this.getData()
    },
    clearParams () {
      this.queryParams = {
        archiveName: ''
      }
    },
    changePage (page) {
      this.page.current = page
      this.getData()
    },
    changePageSize (pageSize) {
      this.page.current = 1
      this.page.pageSize = pageSize
      this.getData()
    },
    selectRowChange (selection) {
      this.transFileList = selection
      console.log('this trans file list ', this.transFileList)
    },
    transFileByIDList () {
      this.transFile = true
    },
    doFileListTrans () {
      let transIDList = []
      console.log('do trans file list ', vModel.transFileList)
      for (const item of vModel.transFileList) {
        transIDList.push(item.id)
      }
      apiComm.transFileByIDList(transIDList, vModel.archiveType).then((response) => {
        if (response.code === 0) {
          vModel.$Message.info('文件转换中！')
        } else {
          let message = '转换异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        }
      })
      this.transFileList = []
      this.getData()
    },
    transFileByID (wenJianJiID) {
      api.transFileByID(wenJianJiID).then((response) => {
        if (response.code === 0) {
          vModel.$Notice.info({
            desc: '成功'
          })

          vModel.getData()
        } else {
          let message = '请求异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        }
      })
    },
    transFileByType () {
      apiComm.transFileByType(this.archiveType)
    },
    dataSourceTrans () {
      api.dataSourceTrans()
    },
    mCopy (value) {
      console.log(this.$copyText)
      this.$copyText(value).then(function (e) {
        vModel.$Message.info('复制成功')
        console.log(e)
      }, function (e) {
        vModel.$Message.info('复制失败')
        console.log(e)
      })
    }
  },
  created () {
    vModel = this
    this.getData()
  }
}
</script>
