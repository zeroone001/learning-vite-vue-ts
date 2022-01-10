<script setup lang="ts">
import { ref, onMounted, watch, reactive, onBeforeUpdate, defineProps } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { useMouse } from '@vueuse/core';

let counter = ref(1);
let counter2 = ref(1);
let name = ref('lys');
const list = reactive([1, 2, 3])
const divs = ref([])
const { x, y } = useMouse();



onMounted(() => {
  // setInterval(() => {
  //   counter.value += 1;
  //   counter2.value += 1;
  // }, 1000)
});
const changeName = () => {
  name.value = 'ad';
}

watch(counter, (newVal, prevVal) => {
  console.log('12312', newVal);
});
watch(counter2, (newVal, prevVal) => {
  console.log('counter2', newVal);
  console.log('x,y', x.value, y.value);

});

onBeforeUpdate(() => {
        divs.value = []
      })

</script>

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <div id="counter">Counter: {{ counter }}</div>
    <div @click="changeName">{{ name }}</div>
  </div>
  <div>
    <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }" :key="i">
    {{ item }}
  </div>
  </div>
   
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
