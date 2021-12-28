# Vue 3 + Typescript + Vite

## install

`npm init vite@latest <project-name> -- --template vue-ts`

`yarn create vite <project-name> --template vue-ts`

## 应用 & 组件实例

创建一个应用实例

```ts
const app = Vue.createApp({});
```

注册全局组件

```ts
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

### 根组件

注意，mount是返回的根组件实例
```ts
const RootComponent = { 
  /* 选项 */ 
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```

### 组件实例 Property

可以将用户定义的 property 添加到组件实例中，
例如 methods，props，computed，inject 和 setup

Vue 还通过组件实例暴露了一些内置 property，如 $attrs 和 $emit。
这些 property 都有一个 $ 前缀，以避免与用户定义的 property 名冲突

```ts
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```

### 生命周期钩子

1. created 钩子可以用来在一个实例被创建之后执行代码;
2. 不要在选项 property 或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())
3. 因为箭头函数是没有this的


```ts
Vue.createApp({
  data() {
    return { count: 1}
  },
  created() {
    // `this` 指向 vm 实例
    console.log('count is: ' + this.count) // => "count is: 1"
  }
})
```

## 模板语法

### v-once

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

### v-html

```html
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

### v-bind

注意 isButtonDisabled 为空字符串，也会包含在内，建议直接TRUE，FALSE

```ts
<button v-bind:disabled="isButtonDisabled">按钮</button>
```

### 动态参数

在这个示例中，当 eventName 的值为 "focus" 时，v-on:[eventName] 将等价于 v-on:focus

```ts
<a v-bind:[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
```

### 修饰符

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### 防抖和节流

```ts
app.component('my-button', {
    created() {
        this.debouncedClick = _.debounce(this.click, 500)
    },
    unmounted () {
        this.debouncedClick.cancel();
    },
    methods: {
        click() {}
    },
    template: `
        <button @click="debouncedClick">
        Save
        </button>
    `
})
```

## 低级静态组件与 v-once

在 Vue 中渲染纯 HTML 元素的速度非常快，但有时你可能有一个包含很多静态内容的组件。在这些情况下，可以通过向根元素添加 v-once 指令来确保只对其求值一次，然后进行缓存，如下所示：


```ts
app.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```

## 过渡 & 动画

### 进入过渡 & 离开过渡

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

条件渲染 (使用 v-if)
条件展示 (使用 v-show)
动态组件
组件根节点

```html
<div id="demo">
  <button @click="show = !show">
    Toggle
  </button>

  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>

```

```scss
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### 过渡 class

v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

### 状态过渡

Vue 的过渡系统提供了非常多简单的方法来设置进入、离开和列表的动效，那么对于数据元素本身的动效呢？比如：

数字和运算
颜色的显示
SVG 节点的位置
元素的大小和其他的 property

## toRefs

```ts
/* 使用 `toRefs` 创建对 `props` 中的 `user` property 的响应式引用 */
const { user } = toRefs(props);
```

## computed

为了访问新创建的计算变量的 value，我们需要像 ref 一样使用 .value property

```ts
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```

## composables 组合物 demo 组合式函数

```ts
// src/composables/useUserRepositories.js

import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch } from 'vue'

export default function useUserRepositories(user) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

## Setup

```ts

```

## vue-loader

当使用 vue-loader 时，*.vue 文件中的模板会在构建时预编译为 JavaScript，在最终的捆绑包中并不需要编译器，因此可以只使用运行时构建版本

## swiper

[swiper@6](https://swiperjs.com/vue)

## 快捷键

`command + shift + P` : 打开 VSCode command palette
`command + m`: 打开Vue文件的split

## SFC `<script setup>`

[https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.