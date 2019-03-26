<template>
  <div class="shopinfo">
    <!-- 小球 -->
     <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
     </transition>
    <!-- 轮播图区域 -->
     <swipe :lunbolist="lunbolist"></swipe>
     <!-- 加入购物车区域 -->
      <div class="panel">
      <h2 class="title">荣耀</h2>
      <hr>
      <div class="panel-body">
        <div class="price-group">
          市场价格:
          <span class="old">{{goodsinfo.market_price}}</span>
          销售价格:
          <span class="new">{{goodsinfo.sell_price}}</span>
        </div>
        <div class="stepper">
          <div class="number">购买数量:</div>

          <van-stepper v-model="value" integer class="number" />
        </div>
        <div class="btn-group">
          <van-button type="primary" size="small">立即购买</van-button>
          <van-button type="danger" :disabled="btnFlag"  size="small" @click="addToCart">加入购物车</van-button>
        </div>
      </div>
    </div>
     <!-- 商品参数 -->
      <div class="panel">
      <h2 class="title">商品参数</h2>
      <hr>
      <div class="panel-body">
        <p>商品货号：{{ goodsinfo.goods_no }}</p>
        <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
        <p>上架时间：{{ goodsinfo.add_time | datemt }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import swipe from '../../Subcomponents/swipe'
import { Toast } from 'vant'

export default {
  data () {
    return {
      id: this.$route.params.id,
      lunbolist: [],
      goodsinfo: {},
      value: 1,
      btnFlag: false,
      ballFlag: false,
      xDist: 0,
      yDist: 0
    }
  },
  components: {
    swipe
  },
  methods: {
    async getThumbs () {
      let id = Number(this.id) + 100
      const {data: {status, message}} = await this.$http.get('api/getthumimages/' + id)
      if (status === 0) {
        this.lunbolist = message
      }
    },
    async getGoodsInfo () {
      // 获取商品的信息
      const {
        data: { status, message }
      } = await this.$http.get('api/goods/getinfo/' + this.id)
      if (status === 0) {
        this.goodsinfo = message
      } else {
        Toast('获取商品信息失败')
      }
    },
    addToCart () {
      var goodsinfo = {
        id: this.id,
        count: this.value,
        price: this.goodsinfo.sell_price,
        selected: true,
        title: this.goodsinfo.title,
        src: this.lunbolist[0].src
      }
      this.$store.dispatch('adds', goodsinfo)
      this.ballFlag = !this.ballFlag
      this.btnFlag = true
      setTimeout(() => {
        this.btnFlag = false
      }, 400)
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0,0)'
    },
    enter (el, done) {
      this.getBound()
      el.offsetLeft
      el.style.transform = `translate(${this.xDist}px,${this.yDist}px)`
      el.style.transition = 'all 1s ease'
      done()
    },
    afterEnter (el) {
      this.ballFlag = !this.ballFlag
    },
    getBound () {
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      const badgePosition = document
        .querySelector('#cart .van-info')
        .getBoundingClientRect()
      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top
      this.xDist = xDist
      this.yDist = yDist
    }

  },
  created () {
    this.getThumbs()
    this.getGoodsInfo()
  }
}
</script>
<style lang="less" scoped>
.shopinfo {
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    position: absolute;
    top: 342px;
    left: 130px;
    z-index: 20;
    opacity: 1;

  }
  .panel {
    width: 96%;
    border: 2px dashed #38f;
    border-radius: 6px;
    box-shadow: 0 0 3px #38f;
    margin: 0 auto;
    margin-top: 10px;
    .my-swiper {
      text-align: center;
      height: 166px;
      line-height: 166px;
      img {
        vertical-align: middle;
      }
    }
    .title {
      font-size: 16px;
      margin: 10px 0 10px 10px;
    }
    .panel-body {
      margin-left: 16px;
      margin-bottom: 10px;
      color: #8f8f94;
      font-size: 14px;
      .price-group {
        margin-bottom: 12px;
        .old {
          text-decoration: line-through;
          margin-right: 6px;
        }
      }
      .stepper {
        color: #8f8f94;
        font-size: 0;
        .number {
          display: inline-block;
          font-size: 14px;
          margin-right: 6px;
        }
      }
      .btn-group {
        margin-top: 10px;
      }
      p {
        margin-top: 10px;
      }
    }
  }
}
</style>
