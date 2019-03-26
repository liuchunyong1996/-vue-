<template>
<div class="cart">
    <div
      class="cart-group"
      v-for="(good,i) in $store.state.car"
      :key="i"
    >
    <div class="cart-s">
        <van-switch
          v-model="good.selected"
          size="20px"
        />
      </div>
      <div class="cart-p">
        <van-card
          :num="good.count"
          :price="good.price"
          :title="good.title"
          :thumb="good.src"
        >
          <div slot="desc">
            <van-stepper
              v-model="good.count"
              integer
              class="number"
            />
          </div>

        </van-card>
      <a id="del" href="#" @click.prevent="remove(good.id)">删除</a>

      </div>
       <van-submit-bar
     :price="$store.getters.getAllPrice.allprice*100"
     button-text="提交订单"
     @submit="onSubmit"
    />
    </div>

  </div>

</template>

<script>
import { Toast } from 'vant'

export default {
  data: () => ({
    goodslist: [],
    flag: true

  }),
  created () {
    // this.getGoodsList()
  },
  methods: {
    // async getGoodsList () {
    //   // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
    //   var idArr = []
    //   this.$store.state.car.forEach(item => idArr.push(item.id))
    //   // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
    //   if (idArr.length <= 0) {w
    //     return
    //   }
    //   // 获取购物车商品列表
    //   const {
    //     data: { status, message }
    //   } = await this.$http.get('api/goods/getshopcarlist/' + idArr.join(','))
    //   if (status === 0) {
    //     this.goodslist = message
    //     console.log(this.goodslist)
    //   }
    // },
    remove (id) {
      this.$store.commit('delet', id)
    },
    onSubmit () {
      Toast('没有接口')
    }
  }
}
</script>

<style  lang="less">
  .cart {
  padding: 10px;
  .cart-group {
    border: 1px solid pink;
    margin-top: 10px;
    box-shadow: 1px 1px 3px pink;
    display: flex;
    // border-bottom: none;
    .cart-s {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .cart-p {
      flex: 4;
    }
    .van-stepper__minus, .van-stepper__plus {
      width: 28px;
    }
    .van-stepper {
      margin-top: 10px;
    }
  }
  #del{
    float: right;
    color : deeppink;
  }
}
</style>
