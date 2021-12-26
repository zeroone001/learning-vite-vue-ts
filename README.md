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

根组件

注意，mount是返回的根组件实例
```ts
const RootComponent = { 
  /* 选项 */ 
}
const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
```
组件实例 Property

```ts
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})

const vm = app.mount('#app')

console.log(vm.count) // => 4
```

```ts

```

```ts

```
```ts

```

```ts

```
```ts

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