// 封装分类业务逻辑
import {getTopCategoryAPI} from '@/apis/category'
import {onMounted, ref} from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
export function useCategory(){
    const categoryData=ref({})
    const route=useRoute()
    const getCategory=async(id=route.params.id)=>{
        const res=await getTopCategoryAPI(id)
        categoryData.value=res.result
    }
    
    onMounted(()=>getCategory())
    // 目标:路由参数变化时，可以把接口重新发送
    onBeforeRouteUpdate((to)=>{
      console.log('路由变化了');
    //存在问题：使用最新的路由参数请求最新的分类数据 
      getCategory(route.params.id)
      
    })
    return{
        categoryData
    }   
}