import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import uploadImage from '../pages/upload/uploadImage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    }, {
      path: '/home',
      component: home,
      children: [
        {
          path: '/home/uploadImage',
          component: uploadImage,
        }
      ]
    },
  ]
})
