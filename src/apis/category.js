import httpInstance from "@/utils/http"

/**
 * @description: 获取分类数据
 * @param {*} id 分类id 
 * @return {*}
 */
export const getTopCategoryAPI = (id) => {
  return httpInstance({
    url:'/category',
    params:{
      id
    }
    
  })
}
/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}
export const getSubCategoryAPI = (data) => {
 return httpInstance({
   url:'/category/goods/temporary',
   method:'POST',
   data
 })
}