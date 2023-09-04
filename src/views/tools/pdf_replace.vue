<template>
  <div>
    <el-card>
      <!--获取指定目录文件列表-->
      <el-form ref="pdfReplaceForm" :model="pdfReplaceModel" :rules="pdfReplaceModelValidate">
        <el-form-item label="原pdf所在目录" prop="pdfDir">
          <el-input v-model="pdfReplaceModel.pdfDir" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="需要替换的pdf所在目录" prop="newPdfDir">
          <el-input v-model="pdfReplaceModel.newPdfDir" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="旧pdf替换起始页(eg:1表示从旧pdf的首页开始,小于等于0也表示从首页开始替换)" prop="index">
          <InputNumber v-model="pdfReplaceModel.index" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="结果目录" prop="outputDir">
          <el-input v-model="pdfReplaceModel.outputDir" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="replacePdf('pdfReplaceForm')">pdf转化</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>

import Api from '@/services/tools/pdf'

var vModel
export default {
  components: {},
  data() {
    return {
      pdfReplaceModel: {},
      pdfReplaceModelValidate: {
        pdfDir: [
          {required: true, message: '原pdf所在目录不能为空'}
        ],
        newPdfDir: [
          {required: true, message: '需要替换的pdf所在目录不能为空'}
        ]
      }
    }
  },
  computed: {},
  methods: {
    replacePdf(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.mergePdfSpec(vModel.pdfReplaceModel).then(response => {
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
