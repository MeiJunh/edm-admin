<template>
  <el-card>
    <!-- 表单组件 -->
    <el-form :label-width="100" inline>
      <el-form-item label="年度">
        <el-input
          v-model="queryParams.annual"
          clearable
          style="width: 80px"
        />
      </el-form-item>
      <el-form-item label="期限">
        <el-input
          v-model="queryParams.deadLine"
          clearable
          style="width: 80px"
        />
      </el-form-item>
      <el-form-item label="问题机构">
        <el-input
          v-model="queryParams.organize"
          clearable
          style="width: 100px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query()">查询</el-button>
        <el-button class="margin-left-8" @click="clearParams()">重置查询</el-button>
        <el-button type="danger" @click="transFileByType()">文件级归档全部转化execl</el-button>
      </el-form-item>
    </el-form>

    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="transFileByIDList()">文件转化</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="dataSourceTrans()">文件级源数据转化</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="文件转化列表"
      :visible.sync="transFile">
      <el-table
        :data="transFileList"
        ref="table"
      >
        <el-table-column
          prop="id"
          label="自增编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="annual"
          label="年度"
          width="100">
        </el-table-column>
        <el-table-column
          prop="deadLine"
          label="期限"
          width="80">
        </el-table-column>
        <el-table-column
          prop="organize"
          label="问题机构"
          width="150">
        </el-table-column>
        <el-table-column
          prop="md5"
          label="md5值"
          width="280">
        </el-table-column>
        <el-table-column
          prop="transFilePath"
          label="转化文件路径"
          width="300">
        </el-table-column>
        <el-table-column
          prop="createdTimestamp"
          label="创建时间"
          width="120">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transFile = false">取 消</el-button>
        <el-button type="text" @click="doFileListTrans()">确 定</el-button>
      </div>
    </el-dialog>

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
        label="自增编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="annual"
        label="年度"
        width="100">
      </el-table-column>
      <el-table-column
        prop="deadLine"
        label="期限"
        width="80">
      </el-table-column>
      <el-table-column
        prop="organize"
        label="问题机构"
        width="150">
      </el-table-column>
      <el-table-column
        prop="md5"
        label="md5值"
        width="280">
      </el-table-column>
      <el-table-column
        prop="transFilePath"
        label="转化文件路径"
        width="300">
      </el-table-column>
      <el-table-column
        prop="createdTimestamp"
        label="创建时间"
        width="120">
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
import api from '@/services/archive/wen_jian_ji'
import util from '@/services/util'

let vModel

export default {
  data() {
    return {
      transFileList: [],
      transFile: false,
      // 查询对象
      queryParams: {},
      // 表单组件对象
      form: {},
      // 表格组件对象
      table: {
        dataArray: []
      },
      // 分页组件对象
      page: {current: 1, pageSize: 20, total: 0},
      // 模态框对象
      modal: {},
      archiveType: apiComm.ATWenJianJi
    }
  },
  methods: {
    async getData() {
      let oldTotal = this.page.total
      let oldPage = this.page.current
      const response = await api.getWenJianJiListData(this.queryParams, this.page)
      util.getDataNoPagePostProcess(response, vModel)
      if (oldPage !== 1) {
        // 如果不是第一页,取旧的total
        this.page.total = oldTotal
      }
    },
    query() {
      this.page.current = 1
      this.getData()
    },
    clearParams() {
      this.queryParams = {
        archiveName: ''
      }
    },
    changePage(page) {
      this.page.current = page
      this.getData()
    },
    changePageSize(pageSize) {
      this.page.current = 1
      this.page.pageSize = pageSize
      this.getData()
    },
    selectRowChange(selection) {
      this.transFileList = selection
      console.log('this trans file list ', this.transFileList)
    },
    transFileByIDList() {
      this.transFile = true
    },
    doFileListTrans() {
      this.transFile = false
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
          vModel.$notify({
              message: message
            })
        }
      })
      this.transFileList = []
      this.getData()
    },
    transFileByID(wenJianJiID) {
      api.transFileByID(wenJianJiID).then((response) => {
        if (response.code === 0) {
          vModel.$Notice.info({
            desc: '成功'
          })

          vModel.getData()
        } else {
          let message = '请求异常:' + response.msg
          vModel.$notify({
              message: message
            })
        }
      })
    },
    transFileByType() {
      apiComm.transFileByType(this.archiveType)
    },
    dataSourceTrans() {
      api.dataSourceTrans()
    },
    mCopy(value) {
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
  created() {
    vModel = this
    this.getData()
  }
}
</script>
