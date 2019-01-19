// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import constant from './common/constant'
import contextmenu from 'v-contextmenu'

import 'element-ui/lib/theme-chalk/index.css'
import './common/scss/element-variables.scss'
import 'v-contextmenu/dist/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(contextmenu)
Vue.prototype.constant = constant; //挂载到Vue实例上面 常量
new Vue({
  el: '#app',
  router,
  data() {
    return {
      Bus:new Vue(),
    }
  },
  components: {App},
  template: '<App/>'
})
