<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';
//触发获取导航列表的action 这里是父组件，之后可以父传子的方式传给2个子组件
import {useCategoryStore} from '@/stores/category'
import { onMounted } from 'vue';
const categoryStore=useCategoryStore()
onMounted(()=>categoryStore.getCategory())
</script>

<template>
  <LayoutFixed/>
  <LayoutNav />
  <LayoutHeader />
  <!-- 解决路由缓存问题 
  方案一 添加key 破坏复用机制 强制销毁重建 但频繁销毁重建开销大 -->
  <!--<RouterView :key="$route.fullPath" />-->
  <router-view></router-view>
  <LayoutFooter />
</template>