<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { zdmCaptcha } from 'zdm-utils';

// 极验初始化
zdmCaptcha({
    url: 'https://zhiyou.m.smzdm.com/user/getgeetest/captcha_init_v3',
    scene: 'mobile_code', //场景 active：活动交互, login：登录注册, mobile_code: 验证码, ta_index：他人主页
    readyCallBack: () => {
        // 此处写初始化成功后，准备好的逻辑
    },
    successCallBack: (result: any) => {
        // 此处写验证成功后执行的逻辑
      console.log(result);
    },
    closeCallBack: () => {
        // 此处写关闭验证弹窗执行的逻辑
    }
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
