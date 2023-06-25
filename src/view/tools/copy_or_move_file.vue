<template>
  <div>
    <Card>
      <!--获取指定目录文件列表-->
      <Form ref="unicastForm" :model="excelModel" :rules="excelModelValidate">
        <FormItem label="excel文件路径" prop="dirPath">
          <Input v-model="excelModel.excelPath" clearable style="width: 600px"/>
        </FormItem>
        <FormItem label="操作方式">
          <RadioGroup v-model="excelModel.isMove">
            <Radio :label="false">拷贝</Radio>
            <Radio :label="true">迁移</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="getFileAbsPath">文件迁移复制复制</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>

import Api from '@/services/tools/copy_or_move_file'

var vModel
export default {
  components: {},
  data () {
    return {
      excelModel: {
        excelPath: '',
        isMove: false
      },
      excelModelValidate: {
        excelPath: [
          { required: true, message: 'excel文件路径不能为空' }
        ]
      }
    }
  },

  computed: {},
  methods: {
    getFileAbsPath () {
      Api.copyOrMoveFileByExcel(vModel.excelModel).then(response => {
        if (response.code !== 0) {
          let message = '请求异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        } else {
          vModel.$Notice.info({ desc: '文件迁移复制完成' })
        }
        vModel.excelModel.excelPath = ''
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
