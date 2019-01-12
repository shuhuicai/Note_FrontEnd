// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import VueContextMenu from 'vue-contextmenu'
import constant from './common/constant'

import 'element-ui/lib/theme-chalk/index.css'
import './common/scss/element-variables.scss'
// import 'vue-contextmenu/style/css/font-awesome.min.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(VueContextMenu);//右键菜单组件
Vue.prototype.constant = constant; //挂载到Vue实例上面 常量
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
