<template>
        <svg  :width=width :height=height>
            <use :xlink:href="'#icon-' + iconFileName"></use>
        </svg>
</template>

<script setup>
import {defineProps} from "vue"
const props = defineProps({
    iconFileName:{
        type:String,
        required:true
    },
    width:{
        default:20
    },
    height:{
        default:20
    }
})
</script>

<style lang="less" scoped>
    svg{
        border-radius: 50%;
    }
</style>