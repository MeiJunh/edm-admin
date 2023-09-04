<template>
  <div>
    <el-card>
      <!--获取指定目录文件列表-->
      <el-form ref="excelForm" :model="excelModel" :rules="excelModelValidate">
        <el-form-item label="excel文件路径" prop="excelPath">
          <el-input v-model="excelModel.excelPath" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="操作方式">
          <el-radio-group v-model="excelModel.isMove">
            <el-radio :label="false">拷贝</el-radio>
            <el-radio :label="true">迁移</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="copyOrMoveFileByExcel('excelForm')">文件迁移复制复制</el-button>
        </el-form-item>
      </el-form>
      <div style="color: #8c939d">
        <p style="font-size:16px;">备注:</p>
        <p style="font-size:14px;">excel文件需要是xlsx格式即只支持2007及以后的excel。里面的内容示例如下：</p>
        <p style="font-size:14px;">首行为标题,不会进行数据读取,第一列为旧文件路径,第二列为需要的新路径</p>
      </div>
    </el-card>
  </div>
</template>
<script>

import Api from '@/services/tools/copy_or_move_file'

var vModel
export default {
  components: {},
  data() {
    return {
      excelModel: {
        excelPath: '',
        isMove: false
      },
      excelModelValidate: {
        excelPath: [
          {required: true, message: 'excel文件路径不能为空', trigger: 'blur'}
        ]
      }
    }
  },

  computed: {},
  methods: {
    copyOrMoveFileByExcel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.copyOrMoveFileByExcel(vModel.excelModel).then(response => {
            if (response.code !== 0) {
              let message = '请求异常:' + response.msg
              vModel.$notify({
                message: message
              })
            } else {
              vModel.$notify({
                message: '文件迁移复制完成'
              })
            }
            vModel.excelModel.excelPath = ''
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
