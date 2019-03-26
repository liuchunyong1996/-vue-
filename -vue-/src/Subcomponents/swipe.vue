<template>
<div class="swipe">
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
          :src="item.img || item.src"
          alt=""
        >
      </van-swipe-item>

    </van-swipe>
</div>

</template>

<script>
export default {
  data: () => ({}),
  props: ['lunbolist']
}
</script>

<style lang="less"  scoped>
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
