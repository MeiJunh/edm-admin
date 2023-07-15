<template>
  <div>
    <Card>
      <!--获取指定目录文件列表-->
      <Form ref="unicastForm" :model="pdfReqModel">
        <FormItem label="pdf目录" prop="pdfDir">
          <Input v-model="pdfReqModel.pdfDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="图片所在目录" prop="imgDir">
          <Input v-model="pdfReqModel.imgDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="结果目录" prop="outputDir">
          <Input v-model="pdfReqModel.outputDir" clearable style="width: 600px"/>
        </FormItem>
        <RadioGroup v-model="pdfReqModel.transType" vertical>
          <Radio label=1>
            <Icon type="social-apple"></Icon>
            <span>填写pdf目录,结果目录--单纯pdf合并 -- 将指定目录下的所有pdf合并成一个pdf</span>
          </Radio>
          <Radio label=2>
            <Icon type="social-android"></Icon>
            <span>填写pdf目录,图片所在目录,结果目录--特殊合并,将pdf第一页替换成另外一个指定目录相同名的jpg -- 将指定目录下的pdf的第一页替换成另外一个指定目录相同名的jpg</span>
          </Radio>
          <Radio label=3>
            <Icon type="social-windows"></Icon>
            <span>填写pdf目录,结果目录--pdf转为jpg -- 将指定目录下的所有pdf转为jpg图片,每一个pdf的图片在单独的目录中</span>
          </Radio>
          <Radio label=4>
            <Icon type="social-windows"></Icon>
            <span>填写图片所在目录,结果目录--图片转pdf -- 将指定目录下的所有文件合并成一个pdf</span>
          </Radio>
          <Radio label=5>
            <Icon type="social-windows"></Icon>
            <span>填写pdf目录,图片所在目录,结果目录--特殊合并,将pdf最后一页替换成另外一个指定目录相同名的jpg</span>
          </Radio>
        </RadioGroup>
        <FormItem>
          <Button type="primary" @click="pdfTrans">pdf转化</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>

import Api from '@/services/tools/pdf'

var vModel
export default {
  components: {},
  data () {
    return {
      pdfReqModel: {
        transType: Api.ATMergePdfDir
      }
    }
  },

  computed: {},
  methods: {
    pdfTrans () {
      if (vModel.pdfReqModel.transType === Api.ATMergePdfDir) {
        Api.mergePdfDir(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$Notice.error({
              desc: message
            })
          } else {
            vModel.$Notice.info({
              desc: '转化成功'
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATMergePdfAndImgSpec) {
        Api.mergePdfAndImgSpec(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$Notice.error({
              desc: message
            })
          } else {
            vModel.$Notice.info({
              desc: '转化成功'
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATOPdfDir2Img) {
        Api.oPdfDir2Img(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$Notice.error({
              desc: message
            })
          } else {
            vModel.$Notice.info({
              desc: '转化成功'
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATImgDir2Pdf) {
        Api.imgDir2Pdf(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$Notice.error({
              desc: message
            })
          } else {
            vModel.$Notice.info({
              desc: '转化成功'
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATMergePdfAndImgSpecEnd) {
        Api.mergePdfAndImgSpecEnd(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$Notice.error({
              desc: message
            })
          } else {
            vModel.$Notice.info({
              desc: '转化成功'
            })
          }
        })
      } else if (vModel.pdfReqModel.transType === Api.ATMergePdfSpec) {
        Api.mergePdfSpec(vModel.pdfReqModel).then(response => {
          if (response.code !== 0) {
            let message = '请求异常:' + response.msg
            vModel.$Notice.error({
              desc: message
            })
          } else {
            vModel.$Notice.info({
              desc: '转化成功'
            })
          }
        })
      }
      // this.$forceUpdate()
    }
  },
  created () {
    vModel = this
  },
  mounted () {
  }
}
</script>
