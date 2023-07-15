<template>
  <div>
    <Card>
      <!--获取指定目录文件列表-->
      <Form ref="unicastForm" :model="pdfRemoveModel" :rules="pdfRemoveModelValidate">
        <FormItem label="pdf目录" prop="pdfDir">
          <Input v-model="pdfRemoveModel.pdfDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="结果目录" prop="outputDir">
          <Input v-model="pdfRemoveModel.outputDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="新pdf的首页(eg:1表示从旧pdf的首页开始,小于等于0也表示从首页开始截取)" prop="startNum">
          <InputNumber v-model="pdfRemoveModel.startNum" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="新pdf的结束页(eg:1表示到旧pdf的第1页就结束,需要大于等于1)" prop="endNum">
          <InputNumber v-model="pdfRemoveModel.endNum" clearable style="width: 600px"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="removePdf">pdf转化</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>

import Api from '@/services/tools/pdf_remove'

var vModel
export default {
  components: {},
  data () {
    return {
      pdfRemoveModel: {
        startNum: 1,
        endNum: 1
      },
      pdfRemoveModelValidate: {
        pdfDir: [
          { required: true, message: 'pdf目录文件路径不能为空' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    removePdf () {
      Api.removePdf(vModel.pdfRemoveModel).then(response => {
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
