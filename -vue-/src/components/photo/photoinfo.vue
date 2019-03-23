<template>
  <div class="photoinfo">
     <!-- 图片描述区域 -->
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | datemt }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr>
    <!-- 缩略图预览区域 -->
    <div class="thumbs">
      <img
        v-for="(item,index) in list"
        :key="item.id"
        :src="item.src"
        alt
        @click="handleImage(index)"
      >
    </div>
    <!-- 图片内容区域 -->
    <div
      class="content"
      v-html="photoinfo.content"
    ></div>
    <content-box :id='id'></content-box>
  </div>
</template>
<script>
import comment from '../../Subcomponents/comment'
import { ImagePreview } from 'vant'

export default {
  components: {
    'content-box': comment
  },
  data () {
    return {
      id: '',
      photoinfo: [],
      list: []
    }
  },
  methods: {
    /**
     * 获取图片详细
     */
    async getPhotoInfo () {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getimageInfo/${this.id}`)
      if (status === 0) {
        this.photoinfo = message
      }
    },
    async getThumbs () {
      const {data: {status, message}} = await this.$http.get('api/getthumimages/' + this.id)
      if (status === 0) {
        this.list = message
      }
    },
    handleImage (startPosition) {
      let images = []
      this.list.forEach(item => {
        if (item.src != null) {
          images.push(item.src)
        }
      })
      ImagePreview({
        images,
        startPosition

      })
    }

  },
  created () {
    this.id = this.$route.params.id
    this.getPhotoInfo()
    this.getThumbs()
  }
}
</script>
<style lang="less">
.photoinfo {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    display: flex;
    justify-content: space-around;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
