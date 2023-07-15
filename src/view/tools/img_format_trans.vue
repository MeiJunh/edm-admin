<template>
  <div>
    <Card>
      <!--获取指定目录文件列表-->
      <Form ref="unicastForm" :model="imgTransModel" :rules="imgTransModelValidate">
        <FormItem label="文件目录" prop="imgDir">
          <Input v-model="imgTransModel.imgDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="结果目录" prop="outDir">
          <Input v-model="imgTransModel.outDir" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="格式转化类型">
          <RadioGroup v-model="imgTransModel.imgType">
            <Radio label="jpg">png转jpg</Radio>
            <Radio label="png">jpg转png</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否删除旧的文件">
          <RadioGroup v-model="imgTransModel.delOld">
            <Radio :label=true>删除</Radio>
            <Radio :label=false>不删除</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="mImgDirTrans">图片格式转化</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>

import Api from '@/services/tools/img_format_trans'

var vModel
export default {
  components: {},
  data () {
    return {
      imgTransModel: {
        imgType: 'jpg',
        delOld: false
      },
      imgTransModelValidate: {
        imgDir: [
          { required: true, message: '文件目录文件路径不能为空' }
        ]
      }
    }
  },

  computed: {},
  methods: {
    mImgDirTrans () {
      Api.mImgDirTrans(vModel.imgTransModel).then(response => {
        if (response.code !== 0) {
          let message = '请求异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        } else {
          vModel.$Notice.info({ desc: '图片转化完成' })
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
