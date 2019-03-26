import Vue from 'vue'
import Vuex, { Store } from 'vuex'
Vue.use(Vuex)

// 避免获取不到值
var car = JSON.parse(localStorage.getItem('car') || '[]')
export default new Store({
  state: {
    car
  },
  // 同步操作
  mutations: {
    add (state, goodsinfo) {
      var flag = false
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    delet (state, id) {
      state.car.forEach((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // 类似于computed 和 filter的结合
    getAllCount (state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getAllPrice (state) {
      let p = {
        count: 0,
        allprice: 0
      }
      state.car.forEach(item => {
        if (item.selected === true) {
          p.count += item.count
          p.allprice += item.price * item.count
        }
      })
      return p
    }

  },
  actions: {
    adds ({commit}, goodsinfo) {
      commit('add', goodsinfo)
    }
  }
})
