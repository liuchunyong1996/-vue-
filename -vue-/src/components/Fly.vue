<template>
  <div class="fly">
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      class="myswiper"
    >
      <van-swipe-item
        class="item"
        v-for="item in lunbolist"
        :key="item.img"
      >
        <img
          :src="item.img"
          alt=""
        >
      </van-swipe-item>

    </van-swipe>
    <!-- 轮播图 -->
    <!-- 九宫格 -->
    <Gird></Gird>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Gird from '../Subcomponents/Gird'
export default {
  components: {
    Gird
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
.myswiper {
  height: 200px;
  .item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
