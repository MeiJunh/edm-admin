<template>
  <div>
    <el-card>
      <!--获取指定目录文件列表-->
      <el-form ref="imgTransForm" :model="imgTransModel" :rules="imgTransModelValidate">
        <el-form-item label="文件目录" prop="imgDir">
          <el-input v-model="imgTransModel.imgDir" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="结果目录" prop="outDir">
          <el-input v-model="imgTransModel.outDir" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="格式转化类型">
          <el-radio-group v-model="imgTransModel.imgType">
            <el-radio label="jpg">png转jpg</el-radio>
            <el-radio label="png">jpg转png</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否删除旧的文件">
          <el-radio-group v-model="imgTransModel.delOld">
            <el-radio :label=true>删除</el-radio>
            <el-radio :label=false>不删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="mImgDirTrans(imgTransForm)">图片格式转化</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>

import Api from '@/services/tools/img_format_trans'

var vModel
export default {
  components: {},
  data() {
    return {
      imgTransModel: {
        imgType: 'jpg',
        delOld: false
      },
      imgTransModelValidate: {
        imgDir: [
          {required: true, message: '文件目录文件路径不能为空'}
        ]
      }
    }
  },

  computed: {},
  methods: {
    mImgDirTrans(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.mImgDirTrans(vModel.imgTransModel).then(response => {
            if (response.code !== 0) {
              let message = '请求异常:' + response.msg
              vModel.$notify({
                message: message
              })
            } else {
              vModel.$notify({
                message: '图片转化完成'
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
