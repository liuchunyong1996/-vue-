<template>
  <div class="photo">
    <van-tabs @click="getcatId">
      <van-tab
        v-for="item in catelist"
        :key="item.id"
        :title="item.title"
      >
        <router-link
          :to="'/home/photoinfo/'+img.id"
          v-for="img in imglist"
          :key="img.id"
        >
          <img v-lazy="img.img_url" />
        </router-link>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      catelist: [],
      imglist: []
    }
  },
  methods: {
    async getimgcategory () {
      const {
        data: { status, message }
      } = await this.$http.get('/api/getimgcategory')
      if (status === 0) {
        message.unshift({ id: 0, title: '全部' })
        this.catelist = message
      } else {
        Toast('出错了')
      }
    },
    async getcatId (index) {
      const {
        data: { status, message }
      } = await this.$http.get('/api/getimages/' + index)
      if (status === 0) {
        this.imglist = message
      } else {
        Toast('出错了')
      }
    }
  },
  created () {
    this.getimgcategory()
    this.getcatId(0)
  }
}
</script>
<style lang="less">
</style>
