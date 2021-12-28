<script setup lang="ts">
import { ref, onMounted, watch, reactive, onBeforeUpdate } from 'vue';
import HelloWorld from './components/HelloWorld.vue'

let counter = ref(1);
let counter2 = ref(1);
let name = ref('lys');
const list = reactive([1, 2, 3])
const divs = ref([])

onMounted(() => {
  setInterval(() => {
    counter.value += 1;
    counter2.value += 1;
  }, 1000)
  console.log('divs.value', divs.value[0]);
  
});
const changeName = () => {
  name.value = 'ad';
}
watch(counter, (newVal, prevVal) => {
  console.log('12312', newVal);
});
watch(counter2, (newVal, prevVal) => {
  console.log('counter2', newVal);
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
