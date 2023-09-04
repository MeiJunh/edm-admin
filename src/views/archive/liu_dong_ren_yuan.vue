<template>
  <el-card>
    <!-- 表单组件 -->
    <el-form :label-width="100" inline>
      <el-form-item label="档案名">
        <el-input
          v-model="queryParams.archiveName"
          clearable
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query()">查询</el-button>
        <el-button class="margin-left-8" @click="clearParams()">重置查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格组件 -->
    <el-table
      :data="table.dataArray"
      ref="table"
      width="1648"
      @selection-change="selectRowChange"
    >
      <el-table-column
        type=selection
        width="80">
      </el-table-column>

      <el-table-column
        prop="id"
        label="档案编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="档案信息名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="batchNo"
        label="批次名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="imageFolder"
        label="图片所在目录"
        width="150">
      </el-table-column>
      <el-table-column
        prop="imageCount"
        label="图片总分数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="flow4Status"
        label="数据录入状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="flow5Status"
        label="监理质检状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="transFilePath"
        label="转化后的文件路径"
        width="300">
      </el-table-column>
      <el-table-column
        prop="createdTimestamp"
        label="创建时间"
        width="220">
      </el-table-column>
      <el-table-column
        prop="lastUpdateTime"
        label="最后一次更新时间"
        width="220">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="transFileByID(scope.row.id)" type="text" size="small">文件转化</el-button>
          <el-button @click="mCopy(scope.row.transFilePath)" type="text" size="small">复制转化文件路径</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :total="page.total"
      :current-page.sync="page.current"
      :page-size.sync="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changePage"
    />

  </el-card>
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
        dataArray: []
      },
      // 分页组件对象
      page: { current: 1, pageSize: 20, total: 0 },
      // 模态框对象
      modal: {}
    }
  },
  methods: {
    async getData () {
      let oldTotal = this.page.total
      let oldPage = this.page.current
      const response = await apiComm.getArchiveListData(this.queryParams, this.page, apiComm.ATLiuDongRenYuan)
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
