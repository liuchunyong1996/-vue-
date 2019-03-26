import Vue from 'vue'
import VueRouter from 'vue-router'
import Fly from '../components/Fly'
import Svip from '../components/Svip'
import Vip from '../components/Vip'
import Xy from '../components/Xy'
import newlist from '../components/news/news'
import newinfo from '../components/news/newsinfo'
import photo from '../components/photo/photo'
import photoinfo from '../components/photo/photoinfo'
import shop from '../components/shop/Shop'
import shopinfo from '../components/shop/shopinfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    redirect: '/fly'
  },
  {
    path: '/fly',
    component: Fly
  },
  {
    path: '/svip',
    component: Svip
  },
  {
    path: '/vip',
    component: Vip
  },
  {
    path: '/xy',
    component: Xy
  },
  {
    path: '/home/newslist',
    component: newlist
  },
  {
    path: '/home/newsinfo/:id',
    component: newinfo
  },
  {
    path: '/home/photolist',
    component: photo
  },
  {
    path: '/home/photoinfo/:id',
    component: photoinfo
  },
  {
    path: '/home/goodslist',
    component: shop
  },
  {
    path: '/home/shopinfo/:id',
    component: shopinfo,
    name: 'shopinfo'
  }

  ]
})
