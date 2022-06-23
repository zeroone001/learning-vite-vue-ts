<template>
  <div>
    <!-- eslint-disable -->
    <canvas id="renderCanvas"></canvas>
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <div id="counter">Counter: {{ counter }}</div>
    <div @click="changeName">{{ name }}</div>
    <div @click="addCounters">{{ thisCounter }}+{{doubleCounter}}</div> -->
  </div>
</template>
<script setup>
import { ref, onMounted, watch, reactive, onBeforeUpdate, defineProps } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { useMouse } from '@vueuse/core';
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter';
// import { demoFun } from "./seraphine.js";
// import { demoFun } from "./webgl_loader_mmd.js";
// BabylonJS 机器狗
import { demoFun } from "./BabylonJS";

// renderer
onMounted(() => {
  demoFun();
});

// const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
// camera.position.z = 1;

// 创建场景对象Scene
// const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

// const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

// const renderer = new THREE.WebGLRenderer( { antialias: true } );
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animation );
// document.body.appendChild( renderer.domElement );

// // animation

// function animation( time ) {

// 	mesh.rotation.x = time / 2000;
// 	mesh.rotation.y = time / 1000;

// 	renderer.render( scene, camera );

// }



// let counter = ref(1);
// let counter2 = ref(1);
// let name = ref('lys');
// const list = reactive([1, 2, 3])
// const divs = ref([])
// const { x, y } = useMouse();

// /* store */
// const myCounters = useCounterStore();
// const { thisCounter, doubleCounter } = storeToRefs(myCounters);

// const addCounters = myCounters.addCounters;

// onMounted(() => {
// });
// const changeName = () => {
//   name.value = 'ad';
// }

// watch(counter, (newVal, prevVal) => {
//   console.log('12312', newVal);
// });
// watch(counter2, (newVal, prevVal) => {
//   console.log('counter2', newVal);
//   console.log('x,y', x.value, y.value);

// });

// onBeforeUpdate(() => {
//   divs.value = []
// })

</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
