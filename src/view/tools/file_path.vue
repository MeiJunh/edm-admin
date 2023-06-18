<template>
  <div>
    <Card>
      <!--获取指定目录文件列表-->
      <Form ref="unicastForm" :model="filePathModel" :rules="filePathModelValidate">
        <FormItem label="文件目录" prop="dirPath">
          <Input v-model="filePathModel.dirPath" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="查询文件关键词" prop="kw">
          <Input v-model="filePathModel.kw" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="查询文件后缀" prop="suffix">
          <Input v-model="filePathModel.suffix" clearable style="width: 600px"/>
        </FormItem>
        <!--         <input type="dir" ref="fileInput" @change="handleFileChange"/>-->
        <FormItem>
          <Button type="primary" @click="getFileAbsPath">获取目录文件列表</Button>
          <Button type="error" style="margin-left: 420px" @click="getPicExInfo">获取图片信息</Button>
        </FormItem>
        <FormItem label="结果文件路径:">
          <div><span style="color:#ff0000">{{ filePathModel.resultUrl }}</span></div>
        </FormItem>
      </Form>

    </Card>

  </div>
</template>
<script>

import Api from '@/services/tools/file_path'

var vModel
export default {
  components: {},
  data () {
    return {
      filePathModel: {
        resultUrl: ''
      },
      filePathModelValidate: {
        dirPath: [
          { required: true, message: '目录不能为空' }
        ]
      }
    }
  },

  computed: {},
  methods: {
    getFileAbsPath () {
      Api.getFileAbsPath(vModel.filePathModel).then(response => {
        if (response.code === 0) {
          vModel.filePathModel.resultUrl = response.data
        } else {
          let message = '请求异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        }
      })
      this.$forceUpdate()
    },
    getPicExInfo () {
      Api.getPicExInfo(vModel.filePathModel).then(response => {
        if (response.code === 0) {
          vModel.filePathModel.resultUrl = response.data
        } else {
          let message = '请求异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        }
      })
      this.$forceUpdate()
    }
    // handleFileChange() {
    //   const input = this.$refs.fileInput
    //   vModel.filePathModel.dir = input.files[0]
    //   console.log(vModel.filePathModel.dir)
    // }
  },
  created () {
    vModel = this
  },
  mounted () {
  }
}
</script>
