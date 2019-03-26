<template>
    <div class="goods-list">
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <van-button type="danger" size="large" @click="getMore">{{pageindex > max? "没有更多数据":"加载更多"}}</van-button>

  </div>

</template>
<script>
export default {
  data () {
    return {
      goodslist: [],
      pageindex: 1,
      limit: 3,
      max: 3
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      if (this.pageindex > this.max) {
        return
      }
      const {data: {status, message}} = await this.$http.get('api/getgoods?pageindex=' + this.pageindex + '&limit=' + this.limit)
      if (status === 0) {
        this.goodslist = this.goodslist.concat(message)
      }
    },
    getMore () {
      this.pageindex++
      this.getGoodsList()
    },
    goDetail (id) {
      this.$router.push({ name: 'shopinfo', params: { id } })
    }
  }
}
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  // 两边对齐中间留空格
  justify-content: space-between;

  .goods-item {
    width: 48%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    // 默认x 轴
    // 设置为column 改为 y轴
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
  .van-button {
    z-index:999;
  }
}
</style>
