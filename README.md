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

使用 setup 函数时，它将接收两个参数：

props
context

1. 因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性
2. 如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作

```ts
// MyBook.vue

export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

如果 title 是可选的 prop，则传入的 props 中可能没有 title 。
在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它

```ts
// MyBook.vue
import { toRef } from 'vue'
setup(props) {
  const title = toRef(props, 'title')
  console.log(title.value)
}
```

### Context

context 是一个普通 JavaScript 对象，暴露了其它可能在 setup 中有用的值

不是响应式的

```ts
export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)

    // 暴露公共 property (函数)
    console.log(context.expose)
  }
}
/* 完全可以解构 */
// MyBook.vue
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

执行 setup 时，组件实例尚未被创建。因此，你只能访问以下 property：

props
attrs
slots
emit

```ts
// MyBook.vue

import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // 请注意这里我们需要显式使用 ref 的 value
    return () => h('div', [readersNumber.value, book.title])
  }
}
```

## expose

这个 increment 方法现在将可以通过父组件的模板 ref 访问

```ts
import { h, ref } from 'vue'
export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

## 生命周期钩子

```ts
// MyBook.vue

export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}
```

## Provide / Inject

provide 函数允许你通过两个参数定义 property：

name (<String> 类型)
value

inject 函数有两个参数：

要 inject 的 property 的 name
默认值 (可选)

```html
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide } from 'vue'
import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker
  },
  setup() {
    /* Provide */
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
<!-- inject -->
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    /* 第二个参数，是默认值 */
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
```

### 响应性

为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 或 reactive。

有时我们需要在注入数据的组件内部更新 inject 的数据。在这种情况下，我们建议 provide 一个方法来负责改变响应式 property。

```ts
export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)
  }
}
```

## 模板引用

```html
<template> 
  <!-- 这里ref="root" -->
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      /* 重点 */
      const root = ref(null)

      onMounted(() => {
        // DOM 元素将在初始渲染后分配给 ref
        console.log(root.value) // <div>This is a root element</div>
      })

      return {
        root
      }
    }
  }
</script>
```

### v-for 中的用法

```html
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      /* 重点，通过这个拿到DOM结构 */
      const divs = ref([])

      // 确保在每次更新之前重置ref
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```

### 侦听模板引用

这个挺好用的

使用模板引用的侦听器应该用 flush: 'post' 选项来定义，这将在 DOM 更新后运行副作用，
确保模板引用与 DOM 保持同步，并引用正确的元素

```html
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, watchEffect } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      watchEffect(() => {
        // 这个副作用在 DOM 更新之前运行，因此，模板引用还没有持有对元素的引用。
        console.log(root.value) // => <div>This is a root element</div>
      }, {
        flush: 'post'
      })

      return {
        root
      }
    }
  }
</script>
```

## 指令

### 动态指令

```html
<div id="dynamic-arguments-example" class="demo">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
<script>
  const app = Vue.createApp({})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // binding.value 是我们传递给指令的值——在这里是 200
    el.style.top = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
</script>
<!-- 2 -->
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
<script>
export default {
  const app = Vue.createApp({
  data() {
    return {
      direction: 'right'
    }
  }
})

app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    // binding.arg 是我们传递给指令的参数
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
}
</script>>
```

### 函数简写

```ts
app.directive('pin', (el, binding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```

### 对象字面量

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```ts
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

### 在组件中使用

```html
<my-component v-demo="test"></my-component>
```

```ts
app.component('my-component', {
  template: `
    <div> // v-demo 指令将会被应用在这里
      <span>My component content</span>
    </div>
  `
})
```

## teleport

一旦我们按钮打开模态框，Vue将正确的把模态框渲染为body元素的子级

```ts
app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data() {
    return { 
      modalOpen: false
    }
  }
})
```

### 在同一目标上使用多个 teleport

```html
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

## 渲染函数

```ts
const { createApp, h } = Vue

const app = createApp({})

app.component('anchored-heading', {
  render() {
    return h(
      'h' + this.level, // 标签名
      {}, // prop 或 attribute
      this.$slots.default() // 包含其子节点的数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

### 虚拟DOM树

```html
<h1>{{ blogTitle }}</h1>
```

```ts
return h('h1', {}, this.blogTitle);
```

### 约束

```ts
/* 下面两个是一样的 */
Array.from({length: 20})
new Array(20).fill()

render() {
  return h('div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

### Vue 中使用 JSX 语法

https://github.com/vuejs/jsx-next

```ts
import AnchoredHeading from './AnchoredHeading.vue'

const app = createApp({
  render() {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})

app.mount('#demo')
```

## Vue 与 Web Components

### defineCustomElement

Vue 支持使用 defineCustomElement 方法创建自定义元素，并且使用与 Vue 组件完全一致的 API。该方法接受与 defineComponent 相同的参数，但是会返回一个扩展自 HTMLElement 的自定义元素构造函数：

```ts
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 在此提供正常的 Vue 组件选项
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement 独有特性: CSS 会被注入到隐式根 (shadow root) 中
  styles: [`/* inlined css */`]
})

// 注册自定义元素
// 注册完成后，此页面上的所有的 `<my-vue-element>` 标签会被更新
customElements.define('my-vue-element', MyVueElement)

// 你也可以编程式地实例化这个元素：
// (只能在注册后完成此操作)
document.body.appendChild(
  new MyVueElement({
    // initial props (optional)
  })
)
```

## 深入响应性原理

当 ref 作为响应式对象的 property 被访问或更改时，为使其行为类似于普通 property，它会自动解包内部值：

```ts
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```


### 解构赋值

```ts
import { reactive } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})

let { author, title } = toRefs(book)

title.value = 'Vue 3 Detailed Guide' // 我们需要使用 .value 作为标题，现在是 ref
console.log(book.title) // 'Vue 3 Detailed Guide'
```

### readonly

```ts
import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })

const copy = readonly(original)

// 通过 original 修改 count，将会触发依赖 copy 的侦听器

original.count++

// 通过 copy 修改 count，将导致失败并出现警告
copy.count++ // 警告: "Set operation on key 'count' failed: target is readonly."
```

## SFC 单文件组件

Vue SFC 是框架指定的文件格式，必须由 @vue/compiler-sfc 预编译为标准的 JavaScript 与 CSS。编译后的 SFC 是一个标准的 JavaScript（ES）模块——这意味着通过正确的构建配置，可以像模块一样导入 SFC

### 定义 Vue 组件

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  // 已启用类型推断
})
/* SFC */
import { defineComponent } from 'vue'
export default defineComponent({
  // 已启用类型推断
})
```

### type Assertion

```ts
interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book
    }
  }
})
```
### 为 globalProperties 扩充类型

```ts
// 用户定义
import axios from 'axios'
const app = Vue.createApp({})
app.config.globalProperties.$http = axios
// 验证数据的插件
export default {
  install(app, options) {
    app.config.globalProperties.$validate = (data: object, rule: object) => {
      // 检查对象是否合规
    }
  }
}
```

### 类型声明

```ts
import axios from 'axios'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof axios
    $validate: (data: object, rule: object) => boolean
  }
}
```

### 注解返回类型

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // 需要注解
    greeting(): string {
      return this.message + '!'
    },

    // 在使用 setter 进行计算时，需要对 getter 进行注解
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

### 注解 Props

Vue 对定义了 type 的 prop 执行运行时验证。要将这些类型提供给 TypeScript，我们需要使用 PropType 指明构造函数：

```ts
import {defineComponent, PropType} from 'vue';

interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  props: {
    name: String,
    id: [Number, String],
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    metadata: {
      type: null // metadata 的类型是 any
    }
  }
})
```

validator 和 default

```ts
import { defineComponent, PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

const Component = defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // 请务必使用箭头函数
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    },
    bookB: {
      type: Object as PropType<Book>,
      // 或者提供一个明确的 this 参数
      default(this: void) {
        return {
          title: 'Function Expression'
        }
      },
      validator(this: void, book: Book) {
        return !!book.title
      }
    }
  }
})
```

### 注解 emit

```ts
const Component = defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // perform runtime 验证
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // 类型错误！
      })
      this.$emit('non-declared-event') // 类型错误！
    }
  }
})
```

### 与组合式 API 一起使用

在 setup() 函数中，不需要将类型传递给 props 参数，因为它将从 props 组件选项推断类型。



```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const result = props.message.split('') // 正确, 'message' 被声明为字符串
    const filtered = props.message.filter(p => p.value) // 将引发错误: Property 'filter' does not exist on type 'string'
  }
})
```

### refs

如果泛型的类型未知，建议将 ref 转换为 Ref<T>。

```ts
const year = ref<string | number>(2020);
year.value = '2020';

```

### 为模板引用定义类型

```ts
import { defineComponent, ref } from 'vue'
const MyModal = defineComponent({
  setup() {
    const isContentShown = ref(false)
    const open = () => (isContentShown.value = true)
    return {
      isContentShown,
      open
    }
  }
})
const app = defineComponent({
  components: {
    MyModal
  },
  template: `
    <button @click="openModal">Open from parent</button>
    <my-modal ref="modal" />
  `,
  setup() {
    /* 这里要跟 ref="modal" 一样的 */
    const modal = ref<InstanceType<typeof MyModal>>()
    const openModal = () => {
      /* 可选链 */
      modal.value?.open()
    }
    return { modal, openModal }
  }
})
```

### 类型声明 reactive

```ts
import { defineComponent, reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const book = reactive<Book>({ title: 'Vue 3 Guide' })
    // or
    const book: Book = reactive({ title: 'Vue 3 Guide' })
    // or
    const book = reactive({ title: 'Vue 3 Guide' }) as Book
  }
})
```

### 类型声明 computed

计算值将根据返回值自动推断类型，自动推断，所以不需要添加

### 为事件处理器添加类型

```ts
<template>
  <input type="text" @change="handleChange" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    // `evt` 将会是 `any` 类型
    const handleChange = (evt: Event) => {
      console.log((evt.target as HTMLInputElement).value) // 此处 TS 将抛出异常
    }
    return { handleChange }
  }
})
</script>
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

## 删除的API

`$on $off $once`

移除了一些特性 filter，内联模板


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


# 应用API

## component

注册或者检索全局组件

```ts
import { createApp } from 'vue'

const app = createApp({})

// 注册一个名为my-component的组件
app.component('my-component', {
  /* ... */
})

// 检索注册的组件(始终返回构造函数)
const MyComponent = app.component('my-component')
```

## config

```js
import { createApp } from 'vue'
const app = createApp({})

app.config = {...}
```

## directive

注册全局指令

```js
import { createApp } from 'vue'
const app = createApp({})

// 注册
app.directive('my-directive', {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {},
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 绑定元素的父组件被挂载时调用
  mounted(el) {
    // el 直接操作DOM
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {},
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  unmounted() {}
})

// 注册 (功能指令)
/* 重点 */
app.directive('my-directive', () => {
  // 这将被作为 `mounted` 和 `updated` 调用
})

// getter, 如果已注册，则返回指令定义
const myDirective = app.directive('my-directive')
```

## use 

```js
import { createApp } from 'vue'
import MyPlugin from './plugins/MyPlugin'

const app = createApp({})

app.use(MyPlugin)
app.mount('#app')
```

# 全局API

## createApp 

```ts
import { createApp, h, nextTick } from 'vue'
const app = createApp({})
```

## defineComponent

```ts
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  data() {
    return { count: 1 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})

```

## defineAsyncComponent

创建 一个只有在需要的时候，才会加载的异步组件

```ts
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)

/* 2 */
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

## defineCustomElement

```ts
import { defineCustomElement } from 'vue'
const MyVueElement = defineCustomElement({
  // 这里是普通的 Vue 组件选项
  props: {},
  emits: {},
  template: `...`,
  // 只用于 defineCustomElement：注入到 shadow root 中的 CSS
  styles: [`/* inlined css */`]
})
// 注册该自定义元素。
// 注册过后，页面上所有的 `<my-vue-element>` 标记会被升级。
customElements.define('my-vue-element', MyVueElement)
// 你也可以用编程的方式初始化这个元素：
// (在注册之后才可以这样做)
document.body.appendChild(
  new MyVueElement({
    // 初始化的 prop (可选)
  })
)
```

## resolveComponent 

如果在当前应用实例中可用，则允许按名称解析 component。
返回一个 Component。如果没有找到，则返回接收的参数 name。

resolveComponent 只能在 render 或 setup 函数中使用。


```ts
import { resolveComponent } from 'vue'
render() {
  const MyComponent = resolveComponent('MyComponent')
}
```

## nextTick

将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它

```ts
import { createApp, nextTick } from 'vue'

const app = createApp({
  setup() {
    const message = ref('Hello!')
    const changeMessage = async newMessage => {
      message.value = newMessage
      await nextTick()
      console.log('Now DOM is updated')
    }
  }
})
```

## useCssModule

useCssModule 只能在render或者setup 中使用 

```html
<script>
import { h, useCssModule } from 'vue'
export default {
  setup() {
    const style = useCssModule()
    return () =>
      h(
        'div',
        {
          class: style.success
        },
        'Task complete!'
      )
  }
}
</script>
<style module>
.success {
  color: #090;
}
</style>
```

# 选项

## emits

emits 可以是数组或对象，从组件触发自定义事件，emits 可以是简单的数组，也可以是对象，后者允许配置事件验证。

emits 选项中列出的事件不会从组件的根元素继承，也将从 $attrs property 中移除。

## 声明周期钩子

### renderTracked

跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。


### renderTriggered

当虚拟 DOM 重新渲染被触发时调用。和 renderTracked 类似，接收 debugger event 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。

## 组合

1. mixins
2. extends 允许一个组件扩展到另一个组件，且继承该组件选项。

从实现的角度看，extends 几乎等同于 mixins。可以认为其作为第一个 mixin 作用在被 extends 的组件上。

然而，extends 和 mixins 表达了不同的意图。mixins 选项主要用来组合功能，而 extends 主要用来考虑继承性。

```ts
const CompA = { ... }

const CompB = {
  extends: CompA,
  ...
}
```

## setup

在创建组件实例时，在初始 prop 解析之后立即调用 setup。在生命周期方面，它是在 beforeCreate 钩子之前调用的。

## 指令

### v-once

只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

### v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

### v-memo

v-memo 仅供性能敏感场景的针对性优化，会用到的场景应该很少。渲染 v-for 长列表 (长度大于 1000) 可能是它最有用的场景：

```html
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```
