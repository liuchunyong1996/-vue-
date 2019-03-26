<template>
  <div class="fly">
   <swipe :lunbolist="lunbolist"></swipe>
    <!-- 轮播图 -->
    <!-- 九宫格 -->
    <Gird></Gird>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Gird from '../Subcomponents/Gird'
import swipe from '../Subcomponents/swipe'
export default {
  components: {
    Gird,
    swipe
  },
  data: () => ({
    lunbolist: []
  }),
  created () {
    this.getlunbo()
  },
  methods: {
    async  getlunbo () {
      const {data: { status, message }} = await this.$http.get('api/getlunbo')
      if (status === 0) {
        this.lunbolist = message
      } else {
        Toast('图片错误')
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
