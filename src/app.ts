import Vue from 'vue'
import store from './store'
import Mixins from './Mixins';

import './app.less'

// Vue.config.productionTip = false

const App = new Vue({
  mixins: [Mixins],
  store,
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
})


export default App
