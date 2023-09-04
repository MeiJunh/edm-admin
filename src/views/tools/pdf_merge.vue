<template>
  <el-card>
    <!--获取指定目录文件列表-->
    <el-form ref="pdfReqForm" :model="pdfReqModel">
      <el-form-item label="pdf目录" prop="pdfDir">
        <el-input v-model="pdfReqModel.pdfDir" clearable style="width: 600px"/>
      </el-form-item>
      <el-form-item label="图片所在目录" prop="imgDir">
        <el-input v-model="pdfReqModel.imgDir" clearable style="width: 600px"/>
      </el-form-item>
      <el-form-item label="结果目录" prop="outputDir">
        <el-input v-model="pdfReqModel.outputDir" clearable style="width: 600px"/>
      </el-form-item>
      <el-radio-group v-model="pdfReqModel.transType" vertical>
        <div>
          <el-radio label=1>填写pdf目录,结果目录--单纯pdf合并 -- 将指定目录下的所有pdf合并成一个pdf</el-radio>
        </div>
        <div>
          <el-radio label=2>填写pdf目录,图片所在目录,结果目录--特殊合并,将pdf第一页替换成另外一个指定目录相同名的jpg -- 将指定目录下的pdf的第一页替换成另外一个指定目录相同名的jpg
          </el-radio>
        </div>
        <div>
          <el-radio label=3>填写pdf目录,结果目录--pdf转为jpg -- 将指定目录下的所有pdf转为jpg图片,每一个pdf的图片在单独的目录中</el-radio>
        </div>
        <div>
          <el-radio label=4>填写图片所在目录,结果目录--图片转pdf -- 将指定目录下的所有文件合并成一个pdf</el-radio>
        </div>
        <div>
          <el-radio label=5>填写pdf目录,图片所在目录,结果目录--特殊合并,将pdf最后一页替换成另外一个指定目录相同名的jpg</el-radio>
        </div>
      </el-radio-group>
      <el-form-item>
        <el-button type="primary" @click="pdfTrans">pdf转化</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>

import Api from '@/services/tools/pdf'

var vModel
export default {
  components: {},
  data() {
    return {
      pdfReqModel: {
        transType: Api.ATMergePdfDir
      }
    }
  },

  computed: {},
  methods: {
    pdfTrans() {
      if (vModel.pdfReqModel.transType === Api.ATMergePdfDir) {
        Api.mergePdfDir(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            console.info(message)
            vModel.$notify({
              message: message
            })
          } else {
            vModel.$notify({
              message: "转化成功"
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATMergePdfAndImgSpec) {
        Api.mergePdfAndImgSpec(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$notify({
              message: message
            })
          } else {
            vModel.$notify({
              message: "转化成功"
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATOPdfDir2Img) {
        Api.oPdfDir2Img(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$notify({
              message: message
            })
          } else {
            vModel.$notify({
              message: "转化成功"
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATImgDir2Pdf) {
        Api.imgDir2Pdf(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$notify({
              message: message
            })
          } else {
            vModel.$notify({
              message: "转化成功"
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATMergePdfAndImgSpecEnd) {
        Api.mergePdfAndImgSpecEnd(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$notify({
              message: message
            })
          } else {
            vModel.$notify({
              message: "转化成功"
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATMergePdfSpec) {
        Api.mergePdfSpec(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$notify({
              message: message
            })
          } else {
            vModel.$notify({
              message: "转化成功"
            })
          }
        })
      }
      // this.$forceUpdate()
    }
  },
  created() {
    vModel = this
  },
  mounted() {
  }
}
</script>
