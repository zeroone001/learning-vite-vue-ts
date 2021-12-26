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

```ts

```

```ts

```

## vue-loader

当使用 vue-loader 时，*.vue 文件中的模板会在构建时预编译为 JavaScript，在最终的捆绑包中并不需要编译器，因此可以只使用运行时构建版本

## swiper

[swiper@6](https://swiperjs.com/vue)

## 快捷键

`command + shift + P` : 打开 VSCode command palette
`command + m`: 打开Vue文件的split

## SFC <script setup>

https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.