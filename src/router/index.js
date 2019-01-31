import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import uploadImage from '../pages/upload/uploadImage'
import showImage from '../pages/file/showImage'
import showFile from '../pages/file/showFile'
import noteFile from '../pages/file/noteFile'
import login from '../pages/login'
import admin_home from '../pages/admin/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    }, {
      path: '/login',
      component: login,
    }, {
      path: '/home',
      component: home,
      children: [
        {
          name: 'uploadImage',
          path: '/home/uploadImage',
          component: uploadImage,
        }, {
          name: 'showImage',
          path: '/home/showImage',
          component: showImage,
        }, {
          name: 'showFile',
          path: '/home/showFile',
          component: showFile,
        }, {
          name: 'noteFile',
          path: '/home/noteFile',
          component: noteFile
        }
      ]
    }, {
      path: '/admin/home',
      component: admin_home,
    }
  ]
})
