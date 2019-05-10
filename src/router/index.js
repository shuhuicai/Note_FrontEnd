import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import uploadImage from '../pages/upload/uploadImage'
import showImage from '../pages/file/showImage'
import showFile from '../pages/file/showFile'
import noteFile from '../pages/file/noteFile'
import login from '../pages/login'
import adminHome from '../pages/admin/adminHome'
import userList from '../pages/admin/pages/userList'
import folderList from '../pages/admin/pages/folderList'
import register from '../pages/register'
import note_list from '../pages/file/noteList'
import showWord from '../pages/file/showWord'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    }, {
      path: '/login',
      component: login,
    }, {
      path: '/register',
      component: register
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
          name: 'showWord',
          path: '/home/showWord',
          component: showWord
        }, {
          name: 'noteFile',
          path: '/home/noteFile',
          component: noteFile
        }, {
          name: 'note_list',
          path: '/home/note_list',
          component: note_list
        }
      ]
    }, {
      path: '/admin/home',
      component: adminHome,
      children: [
        {
          path: '/admin/userList',
          component: userList,
        }, {
          path: '/admin/folderList',
          component: folderList
        }
      ]
    }
  ]
})
