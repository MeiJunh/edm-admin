<template>
  <div>
    <el-card>
      <!--获取指定目录文件列表-->
      <el-form ref="pdfRemoveForm" :model="pdfRemoveModel" :rules="pdfRemoveModelValidate">
        <el-form-item label="pdf目录" prop="pdfDir">
          <el-input v-model="pdfRemoveModel.pdfDir" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="结果目录" prop="outputDir">
          <el-input v-model="pdfRemoveModel.outputDir" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="新pdf的首页(eg:1表示从旧pdf的首页开始,小于等于0也表示从首页开始截取)" prop="startNum">
          <InputNumber v-model="pdfRemoveModel.startNum" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="新pdf的结束页(eg:1表示到旧pdf的第1页就结束,需要大于等于1)" prop="endNum">
          <InputNumber v-model="pdfRemoveModel.endNum" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="removePdf('pdfRemoveForm')">pdf转化</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>

import Api from '@/services/tools/pdf_remove'

var vModel
export default {
  components: {},
  data() {
    return {
      pdfRemoveModel: {
        startNum: 1,
        endNum: 1
      },
      pdfRemoveModelValidate: {
        pdfDir: [
          {required: true, message: 'pdf目录文件路径不能为空'}
        ]
      }
    }
  },
  computed: {},
  methods: {
    removePdf(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.removePdf(vModel.pdfRemoveModel).then(response => {
            if (response.code !== 0) {
              let message = '请求异常:' + response.msg
              vModel.$notify({
                message: message
              })
            } else {
              vModel.$notify({
                message: '转化完成'
              })
            }
          })
        } else {
          return false;
        }
      })
      this.$forceUpdate()
    }
  },
  created() {
    vModel = this
  },
  mounted() {
  }
}
</script>
