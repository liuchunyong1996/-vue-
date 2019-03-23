<template>
  <div class="newsinfo">
  <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | datemt }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr>
    <!-- 内容区域 -->
    <div class="content">{{newsinfo.content}}</div>
    <content-box></content-box>
  </div>
</template>

<script>
import { Toast } from 'vant'
import comment from '../../Subcomponents/comment'
export default {
  components: {
    'content-box': comment
  },
  data () {
    return {
      id: '',
      newsinfo: {}
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getnew()
  },
  methods: {
    async getnew () {
      const {data: {status, message}} = await this.$http.get('api/getnew/' + this.id)
      if (status === 0) {
        this.newsinfo = message
      } else {
        Toast('信息错误')
      }
    }
  }
}
</script>
<style lang="less">
.newsinfo {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
