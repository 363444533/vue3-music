<template>
  <div class="root">
    <router-view></router-view>
    <MusicPlayer></MusicPlayer>
  </div>
</template>
<script setup>
import MusicPlayer from "@/views/music-player/index.vue"
</script>

<style lang="less">

.van-toast{
  background: transparent;
}
.van-toast__text{
        width: 100px;
        height: 60px;
        line-height: 60px;
        justify-content:center;
        border-radius: 10px;
        display: flex;
        align-items: center;
        background:rgba(0,0,0,.15);
   
    }
</style>
