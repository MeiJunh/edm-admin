<template>
  <Card>
    <!-- 表单组件 -->
    <Form :label-width="100" inline>
      <FormItem label="档案名">
        <Input
          v-model="queryParams.archiveName"
          clearable
          style="width: 200px"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="query()">查询</Button>
        <Button class="margin-left-8" @click="clearParams()">重置查询</Button>
      </FormItem>
    </Form>

    <!-- 表格组件 -->
    <Table
      :columns="table.columns"
      :data="table.dataArray"
      ref="table"
      width="1648"
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
  </Card>
</template>

<style lang="less">
@import "../../styles/common.less";
</style>

<script>
import apiComm from '@/services/archive/archive_comm'
import util from '@/services/util'

let vModel

export default {
  data () {
    return {
      // 查询对象
      queryParams: {},
      // 表单组件对象
      form: {},
      // 表格组件对象
      table: {
        columns: apiComm.getColumns(this.handleCopy),
        dataArray: []
      },
      // 分页组件对象
      page: { current: 1, pageSize: 20, total: 0 },
      // 模态框对象
      modal: {}
    }
  },
  methods: {
    handleCopy (value) {
      this.$Copy({
        text: value,
        showTip: true
      })
    },
    async getData () {
      let oldTotal = this.page.total
      let oldPage = this.page.current
      const response = await apiComm.getArchiveListData(this.queryParams, this.page, apiComm.ATGanBuRenShi)
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
    }
  },
  created () {
    vModel = this
    this.getData()
  }
}
</script>
