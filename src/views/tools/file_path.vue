<template>
  <div>
    <el-card>
      <!--获取指定目录文件列表-->
      <el-form ref="filePathForm" :model="filePathModel" :rules="filePathModelValidate">
        <el-form-item label="文件目录" prop="dirPath">
          <el-input v-model="filePathModel.dirPath" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="查询文件关键词" prop="kw">
          <el-input v-model="filePathModel.kw" clearable style="width: 600px"/>
        </el-form-item>
        <el-form-item label="查询文件后缀" prop="suffix">
          <el-input v-model="filePathModel.suffix" clearable style="width: 600px"/>
        </el-form-item>
        <!--         <input type="dir" ref="fileInput" @change="handleFileChange"/>-->
        <el-form-item>
          <el-button type="primary" @click="getFileAbsPath('filePathForm')">获取目录文件列表</el-button>
          <el-button type="warning" style="margin-left: 420px" @click="getPicExInfo('filePathForm')">获取图片信息</el-button>
        </el-form-item>
        <el-form-item label="结果文件路径:">
          <div><span style="color:#ff0000">{{ filePathModel.resultUrl }}</span></div>
        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>
<script>

import Api from '@/services/tools/file_path'

var vModel
export default {
  components: {},
  data() {
    return {
      filePathModel: {
        resultUrl: ''
      },
      filePathModelValidate: {
        dirPath: [
          {required: true, message: '目录不能为空'}
        ]
      }
    }
  },

  computed: {},
  methods: {
    getFileAbsPath(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.getFileAbsPath(vModel.filePathModel).then(response => {
            if (response.code === 0) {
              vModel.filePathModel.resultUrl = response.data
            } else {
              let message = '请求异常:' + response.msg
              vModel.$notify({
                message: message
              })
            }
          })
        } else {
          return false;
        }
      })
      this.$forceUpdate()
    },
    getPicExInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Api.getPicExInfo(vModel.filePathModel).then(response => {
            if (response.code === 0) {
              vModel.filePathModel.resultUrl = response.data
            } else {
              let message = '请求异常:' + response.msg
              vModel.$notify({
                message: message
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
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
  created() {
    vModel = this
  },
  mounted() {
  }
}
</script>
