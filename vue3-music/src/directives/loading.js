import  loading  from "@/components/loading"
import { createApp } from 'vue'

export default
{
    // 指令绑定的dom元素挂载后触发 
    // el 指令绑定的dom元素
    // binding 指令绑定的值以及配置信息
    mounted(el, binding){
        // console.log(binding)
        let loadApp = createApp(loading)
        let instance = loadApp.mount(document.createElement("div"))
        el.instance = instance.$el
        if(binding.value){
            append(el)
        }
    },
    updated(el, binding){
        binding.value ? append(el) : remove(el)

    }
}
function append(el){
    let allStyle = getComputedStyle(el)
    let arr = ["absolute", "fixed", "relative"];
    if(arr.indexOf(allStyle.position) === -1){
        el.position = "relative"
    }
    el.appendChild(el.instance)

}
function remove(el){
    el.removeChild(el.instance);
}
// 接受响应内容之前，显示加载框