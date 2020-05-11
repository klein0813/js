POINT
====
* 父组件获取子组件数据和方法
```
<v-header ref="header>

this.$refs.header.数据
this.$refs.header.方法
```

* 子组件获取父组件的数据和方法
```
this.$parent.数据
this.$parent.方法
```

* 非父子关系组件通讯
```
借助 vue 实例
// VueEvent.js
import Vue from "vue"
let vueEvent = new Vue();

export default vueEvent;

// publish.vue
import eventVue from "./VueEvent.js"

...
eventVue.$emit('name', data)
...

// recivier.vue
import eventVue from "./VueEvent.js"

...
eventVue.$on('name', function(){

})
...

```