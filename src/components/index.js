// 通用组件统一全局注册 新建index.js文件,在文件中导入组件，统一注册
import ImageView from '@/components/Imageview/index.vue'
import Sku from '@/components/XtxSku/index.vue'
export const componentPlugin={
    install(app){
        // app.component('组件名字'，组件配置对象)
        app.component('XtxImageView',ImageView)
        app.component('XtxSku',Sku)
    }
}