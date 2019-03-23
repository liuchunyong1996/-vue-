<template>
  <div class="comment">
     <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <van-button type="danger" size="large" @click="postComments">发表评论</van-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="index">
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | datemt}}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>
    <van-button class="more" type="danger" size="large" plain @click="getMore">{{more}}</van-button>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  data: () => ({
    comments: [],
    // 默认显示第一页的内容
    pageindex: 1,
    houtainum: 8,
    msg: ''
  }),
  props: {
    id: {
      type: String
    }
  },
  methods: {
    // 显示评论内容
    async getComments () {
      const {
        data: { status, message }
      } = await this.$http.get(`/api/getcomments/${this.id}?${this.pageindex}`)
      if (status === 0) {
        this.comments = this.comments.concat(message)
        // 数组合并
      }
    },
    // 加载更多
    getMore () {
      if (this.pageindex < 8) {
        this.pageindex++
        this.getComments()
      } else {
        Toast('没有更多的内容了')
      }
    },
    // 发表评论内容
    async postComments () {
      if (this.msg.trim().length === 0) {
        return Toast('请输入bb的内容')
      }
      // 2. 如果有内容发送ajax
      const {
        data: { status }
      } = await this.$http.post('api/postcomment/' + this.id, {
        content: this.msg.trim()
      })
      if (status === 0) {
        const mt = {
          user_name: '匿名用户',
          content: this.msg.trim()
        }
        this.comments.unshift(mt)
        this.msg = ''
      }
    }
  },
  created () {
    this.getComments()
  },
  computed: {
    more () {
      return this.pageindex < this.houtainum ? '加载更多数据' : '被掏空了'
    }
  }
}
</script>
<style lang="less">
.comment {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    width: 100%;
    height: 60px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
  .more{
      position :fixed;
      bottom: 50px;
  }
}
</style>
