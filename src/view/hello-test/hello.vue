<template>
  <div>
    <Card>
      <Form ref="unicastForm" :model="helloModel">
        <FormItem>
          <Button type="primary" @click="getHelloRsp">hello测试</Button>
        </FormItem>
        <FormItem label="hello返回的结果:">
          <div><span style="color:#F00">{{ helloModel.helloRsp }}</span></div>
        </FormItem>
      </Form>

    </Card>

  </div>
</template>
<script>
import Api from '@/services/hello-test/hello'

var vModel
export default {
  components: {},
  data () {
    return {
      helloModel: {
        helloRsp: ''
      }
    }
  },

  computed: {},
  methods: {
    getHelloRsp () {
      Api.getHelloRsp().then(response => {
        if (response.code === 0) {
          vModel.helloModel.helloRsp = response.data
        } else {
          let message = '请求异常:' + response.msg
          vModel.$Notice.error({
            desc: message
          })
        }
      })
    }
  },
  created () {
    vModel = this
  }
}
</script>
