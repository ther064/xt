import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/Layout'
export const useCategoryStore = defineStore('category', () => {
    // 导航列表数据管理
    // state导航数据
    const categoryList=ref([])
    //action 获取导航数据的方法
    const getCategory=async()=>{
        const res=await getCategoryAPI()
        categoryList.value=res.result
    }
    return{
        categoryList,getCategory
    }
})
