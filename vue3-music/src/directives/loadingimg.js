import defaultimg from "@/assets/defaultimg.jpg"  
import { useIntersectionObserver } from "@vueuse/core"
export default
{
    // 指令绑定的dom元素挂载后触发 
    // el 指令绑定的dom元素
    // binding 指令绑定的值以及配置信息
    mounted(el, binding){
        el.src = defaultimg      
        // console.log(useIntersectionObserver())  
        // isIntersecting 是否进入可视区
        let {stop} = useIntersectionObserver(el, ([{isIntersecting}])=>{
            if(isIntersecting){
                el.src = binding.value
                el.onerror=()=>{
                    el.src = defaultimg      
                }
                // 在可视区域里了，停止监听
                stop()
            }
        })    
    },
    updated(el, binding){

    }
}