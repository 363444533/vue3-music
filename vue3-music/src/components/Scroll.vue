<template>
    <div ref="scrollRootRef">
            <!-- 插槽 -->
            <slot></slot>
    </div>
</template>

<script setup>
import BScroll from "@better-scroll/core"
import ObserveDom from "@better-scroll/observe-dom"
import { onMounted,onUnmounted,ref } from "@vue/runtime-core"

BScroll.use(ObserveDom)
// 建立滚动容器
let scrollRootRef = ref(null)
let scroll = ref(null)
let emit = defineEmits(["scroll"])
let props = defineProps({
    probeType:{
        type: Number,
        default: 0
    },
    click: {
        // 关闭默认click
        type: Boolean,
        default: true
        // default:false
    }
})
onUnmounted(()=>{
    scroll.value.destroy()
})

onMounted(()=>{
    scroll.value = new BScroll(scrollRootRef.value,{
        observeDOM: true,  //开启插件
        ...props
    })
    // position:自身滚动距离
    if(props.probeType > 0){
            scroll.value.on("scroll", (position)=>{
                emit("scroll", position.y)
            })
    }
})

defineExpose({
    scroll
})
</script>

<style lang="less" scoped>

</style>