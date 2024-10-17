import { defineStore } from "pinia";
import{computed, ref} from 'vue'
import { useUserStore } from "./userStore";
import { insertCartAPI,findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore=defineStore('cart',()=>{
    const userStore=useUserStore()
    const isLogin=computed(()=>userStore.userInfo.token)
    // 1.定义state
    const cartList=ref([])
    // 获取最新购物车action
    const updateNewList=async()=>{
        const res=await findNewCartListAPI()
        cartList.value=res.result
    }
    
    // 2.定义action
    const addCart=async(goods)=>{
        
        const {skuId,count}=goods
        if(isLogin.value){
            // 登录之后的逻辑
            await insertCartAPI({skuId,count})
            updateNewList()
        }
        else{
            // 添加购物车操作
            // 已添加过- count+1
            // 未添加过-添加商品
            // 思路:通过匹配传递过来的的商品对象的skuId能否在cartList中找到，找到了就是添加过
            console.log(goods);
            const item=cartList.value.find((item)=>goods.skuId===item.skuId)
            if(item){
                // 找到了
                item.count++
            }else{
                // 没找到
                cartList.value.push(goods)
            }
            // console.log(item);
            }
    }
    // 删除购物车操作
    const delCart=async(skuId)=>{
        if(isLogin.value){
            await delCartAPI([skuId])
            console.log(skuId);
            updateNewList()
            
        }else{
            const idx=cartList.value.findIndex((item)=>skuId===item.skuId)
            cartList.value.splice(idx,1)
        }
        
    }
    // 清空购物车
    const clearCart=()=>{
        cartList.value=[]
    }
    // 购物车列表全选功能
    /* 通过cartList获取数据得到isAll,当所有多选框为true时isAll为true
        在全选按钮上使用:model-value绑定isAll,控制它的值
        当全选按钮状态发生切换时,使用@change把store项中所有项的select改变为全选按钮的状态
        不用v-model的原因:computed为只读属性,多选框状态不能即时更改
    */
    // 单选功能

    const singleCheck = (skuId, selected) => {
        // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    // 全选功能
    const allCheck=(selected)=>{
        cartList.value.forEach(item =>item.selected=selected);
    }
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 计算购物车总价和数量
    // a：累加器，表示之前计算出的总价格。
    // c：当前商品对象，包含商品的 count 和 price 属性。
    // 总数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    
    // 已选中数量
    const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
    
    // 可以调两次方法的原因:链式调用 使用filter之后是数组可以继续调用
    // 已选中商品价格
    const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))
    
    return{
        cartList,
        isAll,
        allCount,
        allPrice,
        selectedPrice,
        selectedCount,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        clearCart,
        updateNewList
        
    }
},{
    persist:true
}
)