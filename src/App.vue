<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import HelloWorld from './components/HelloWorld.vue'

let counter = ref(1);
let name = ref('lys');

onMounted(() => {
  setInterval(() => {
    counter.value += 1;
  }, 1000)
});
const changeName = () => {
  name.value = 'ad';
}
watch(counter, (newVal, prevVal) => {
  console.log('12312', newVal);
});
</script>

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <div id="counter">Counter: {{ counter }}</div>
    <div @click="changeName">{{ name }}</div>
  </div>
  <div></div>
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
