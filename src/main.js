// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/scss/element-variables.scss'
import global_ from './common/Global'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
