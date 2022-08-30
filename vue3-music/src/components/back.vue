<template>
    <div class="back-top">
        <SvgIcon
            iconFileName="back"
            width="25"
            height="25"
            class="song-svg"
            @click.stop="handleroute"
          />
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
let router = useRouter()

function handleroute(){
    router.back()
}
</script>

<style lang="less" scoped>
.back-top{
    position: fixed;
    height: 29px;
    width: 100%;
    background: @danhui;
    z-index: 899;
}
</style>