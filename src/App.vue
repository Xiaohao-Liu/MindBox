<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template> 

<script>
import MindMap from './components/MindMap.vue'
import Login from './components/Login.vue'

import VueRouter from 'vue-router';


const router = new VueRouter({
  routes: [
  { path: '/', component: MindMap, alias:['/mindbox','/read'] },
  { path: '/login', component: Login }
]})

const {getToken} = require("./api")
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if(to.path === '/read'){
    next()
  }else{
    //检查是否有token
    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }
  }
})

export default {
  router
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  position:absolute;
  top:0px;
  left: 0px;
  height:100%;
  width:100%;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
 ::-webkit-scrollbar
{
    width:5px;
    height:5px;
    background-color:transparent;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    /* -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3); */
    /* border-radius:10px; */
    background-color:transparent;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 5px;
    /* -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3); */
    background-color:#4353b6;
}
</style>
