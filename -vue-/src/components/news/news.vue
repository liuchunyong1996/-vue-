<template>
  <div class ="newlist">
  <router-link :to="'/home/newsinfo/'+item.id" v-for=" (item,index) in newslist" :key="index">
   <van-card
  :title="item.title"
  :thumb="item.img_url"
   >
<!-- 插槽作用域 -->
   <div slot="price">
   <span>发表时间:{{item.add_time | datemt}}</span>
   </div>
    <div slot="num">
  <span>{{item.click}}</span>
   </div>
</van-card>
</router-link>
  </div>
</template>
<script>
import { Toast } from 'vant'

export default {
  data: () => ({
    newslist: []
  }),
  created () {
    this.getnewslist()
  },
  methods: {
    async getnewslist () {
      const {data: {status, message}} = await this.$http.get('api/getnewslist')
      if (status === 0) {
        this.newslist = message
      } else {
        Toast('信息错误')
      }
    }
  }
}
</script>
<style lang="less">
   .newlist{
     .van-card {
       overflow :hidden;
       height:55px;
     }
   }
</style>
