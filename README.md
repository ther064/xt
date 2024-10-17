# 路由缓存问题
```
> 原因：路由只有参数变化时，组件会产生复用
> 解决方案：(1)追求性能 使用onBeforeRouteUpdate钩子函数
(2) 不追求性能 选择key 简单粗暴
```
# axios
```javascript
import axios from 'axios'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
instance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
instance.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})
// 
```
# Axios网络请求封装
在`src`目录下创建文件夹`utils`，并创建文件`request`，用来存储网络请求对象 `axios`

```js
import axios from "axios"
import qs from "querystring"


const errorHandle = (status,info) => {
    switch(status){
        case 400:
            console.log("语义有误");
            break;
        case 401:
            console.log("服务器认证失败");
            break;
        case 403:
            console.log("服务器拒绝访问");
            break;
        case 404:
            console.log("地址错误");
            break;
        case 500:
            console.log("服务器遇到意外");
            break;
        case 502:
            console.log("服务器无响应");
            break;
        default:
            console.log(info);
            break;
    }
}


const instance = axios.create({
    timeout:5000
})

instance.interceptors.request.use(
    config =>{
        if(config.method === "post"){
            config.data = qs.stringify(config.data)
        }
        return config;
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error =>{
        const { response } = error;
        errorHandle(response.status,response.info)
    }
)

export default instance;
```
在`src`目录下创建文件夹`api`，并创建文件`index`和`path`分别用来存放网络请求方法和请求路径

```js
// path.js
const base = {
    baseUrl:"http://iwenwiki.com",
    chengpin:"/api/blueberrypai/getChengpinDetails.php"
}

export default base
```

```js
// index.js
import path from "./path"
import axios from "../utils/request"

export default {
    getChengpin(){
        return axios.get(path.baseUrl + path.chengpin)
    }
}
```
在组件中直接调用网络请求

```js
import api from "../api/index"

api.getChengpin().then(res =>{
    console.log(res.data);
})
```
# project
```js
> 挂载ref属性的作用:ref属性允许我们在Vue组件中访问另一个元素或组件。
在Vue的生命周期中，组件被创建、挂载到DOM、更新并销毁。
在组件的挂载过程中，ref属性将在组件实例上创建一个名为$h1data的键，它的值是指向该h1元素的引用。
这使得我们可以在组件逻辑中轻松地引用该元素，并对其进行操作

> 在Vue中，provide和inject是用于进行跨级组件通信的API。
通常，在父组件中定义数据或函数，并将它们提供给子组件使用，这些数据和函数在父组件内可供数据变化时进行监听和响应。
为方便起见，我们可以使用provide和inject来进行这种数据或函数的传递。

> `provide`: provide是一个在父组件中提供数据或方法的选项。
它是一个非响应式的函数，其作用是设置一个可以被子组件访问的数据或方法。provide应该在父组件的setup()函数中进行定义，并使用对象的方式传递多个数据或函数项
> `inject`: inject是一个在子组件中接收和引用父组件数据和方法的选项。
它通过特殊的语法将父组件中的数据注入到子组件中。
inject选项中传递一个数组，数组中包含代表父组件中属性名或键名的字符串，或是一个父组件中的provide的替代对象。inject可以在子组件的`setup()`函数中进行定义
> `注意`通过这种方式，父组件和子组件可以进行跨级通信，便于组件之间的信息传递和共享。需要注意的是，provide和inject并不会进行响应式处理，所以不推荐在两个组件之间进行频繁更新数据。
```

# 封装业务逻辑(自定义hook)
```
将需要单独维护的功能组件通过外层封装方法封装起来,函数use打头然后需要用到的数据进行return 在调用以后使用方法并且结构
```
# 封装复杂交互组件的思路
功能拆解 寻找核心实现思路 寻找实现技术 逐个实现，逐个优化
# sku组件使用
```
> 遇到第三方组件时，首先重点看props和emit
验证组件是否正常使用：传入必要数据是否交互功能正常，点击选择规格是否正常产> 生数据
```
# useRouter
```
> 不带r获取参数,带r调取方法 
> useRoute获取参数,useRouter调用方法
```
# pinia持久化
```
1.安装插件包 2.pinia注册插件 3.进行配置
在设置state的时候会自动把数据同步给localstorage,在获取state数据的时候会优先从localstorage中取
```
# pinia管理用户数据
```
## 一、登录
> 1. Pinia管理用户数据
遵循理念：和数据相关的所有操作（state + action）都放到Pinia中，组件只负责触发action函数
> 2. Pinia用户数据持久化
原来存在的问题：
1）用户数据中有一个关键的数据叫做Token （用来标识当前用户是否登录），而Token持续一段时间才会过期
2）Pinia的存储是基于内存的，刷新就丢失，为了保持登录状态就要做到刷新不丢失，需要配合持久化进行存储
运行机制：在设置state的时候会自动把数据同步给localStorage，在获取state数据的时候会优先从localStorage中取
> 3. 登录和非登录状态的模版适配
思路：有几个需要适配的模版就准备几个template片段，通过条件渲染控制显示即可
<template v-if="条件一">
<!--模板1-->
</template>
<template v-if="条件二">
<!--模板2-->
</template>
```
# 请求拦截器携带Token
```
> 理由：Token作为用户标识，在很多个接口中都需要携带Token才可以正确获取数据，所以需要在接口调用时携带Token。另外，为了统一控制采取请求拦截器携带的方案
> 配置：Axios请求拦截器可以在接口正式发起之前对请求参数做一些事情，通常Token数据会被注入到请求header中，格式按照后端要求的格式进行拼接处理
```
# 购物车全选功能
```
> 通过cartList获取数据得到isAll,当所有多选框为true时isAll为true
在全选按钮上使用:model-value绑定isAll,控制它的值
当全选按钮状态发生切换时,使用@change把store项中所有项的select改变为全选按钮的状态
> 不用v-model的原因:computed为只读属性,多选框状态不能即时更改
```
# 购物车删除功能
```
> 遇到请求的入参为空或者格式错误问题
在api中定义delCart接口传入参数为ids,在后端返回数据中ids为一整个商品对象，于是在购物车界面调用delCart(i)发生错误,后改为delCart(i.skuId)返回数据正常
```
# 购物车结算提交订单
```
> 通过调用接口生成订单id,并携带id到支付页
> 调用更新购物车接口，更新购物车状态
```
# sku组件切换选中状态
```
> 定义一个changeSelectesStatus函数,传入item(同排对象)val(当前对象),
给val新增一个selected属性,点击它时如果为true,selected值为false;
如果为false,遍历item将同排的selected值赋为false,最后把当前项的selected值改为true。
```
# vue-rabbit

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
