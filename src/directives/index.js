import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin={
    install(app){
        app.directive('img-lazy',{
            mounted(el,binding){
                // el:指令绑定的元素 img
                // binding:binding.value 指令后面等于号表达式的值
                const {stop} =useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                      if(isIntersecting){
                        el.src=binding.value
                        stop()
                      }
                    },
                  )
            }
        })
    }

}