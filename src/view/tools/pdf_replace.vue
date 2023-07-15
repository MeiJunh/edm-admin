<template>
  <div>
    <Card>
      <!--获取指定目录文件列表-->
      <Form ref="unicastForm" :model="pdfReplaceModel" :rules="pdfReplaceModelValidate">
        <FormItem label="原pdf所在目录" prop="pdfDir">
          <Input v-model="pdfReplaceModel.pdfDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="需要替换的pdf所在目录" prop="newPdfDir">
          <Input v-model="pdfReplaceModel.newPdfDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="旧pdf替换起始页(eg:1表示从旧pdf的首页开始,小于等于0也表示从首页开始替换)" prop="index">
          <InputNumber v-model="pdfReplaceModel.index" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="结果目录" prop="outputDir">
          <Input v-model="pdfReplaceModel.outputDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="replacePdf">pdf转化</Button>
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
      pdfReplaceModel: {},
      pdfReplaceModelValidate: {
        pdfDir: [
          { required: true, message: '原pdf所在目录不能为空' }
        ],
        newPdfDir: [
          { required: true, message: '需要替换的pdf所在目录不能为空' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    replacePdf () {
      Api.mergePdfSpec(vModel.pdfReplaceModel).then(response => {
        if (response.code !== 0) {
          let message = '请求异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        } else {
          vModel.$Notice.info({ desc: '转化完成' })
        }
      })
      this.$forceUpdate()
    }
  },
  created () {
    vModel = this
  },
  mounted () {
  }
}
</script>
