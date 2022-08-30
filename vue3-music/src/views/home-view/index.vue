<template>
  <div class="home">
    <!-- 顶部栏 -->
    <div class="m-topbar">
      <SvgIcon class="logo" iconFileName="music" width="35" height="35"/>
      <span>实战music</span>     
    </div>
    <div class="m-tab-container">
      <nav class="m-tabs-header">
        <router-link :to="{name:'recommend'}">推荐</router-link>
        <router-link :to="{name:'raking'}">排名</router-link>
        <router-link :to="{name:'singer'}">歌手</router-link>
        <router-link :to="{name:'search'}">搜索</router-link>
      </nav>
      <div class="m-tab-panel">
        <router-view></router-view>
      </div>
    </div> 
    

  </div>
</template>

<script setup>
import {ref} from "vue";
const active = ref(0)
</script>

<style lang="less" scoped>
.m-topbar{
  position: fixed;
  -webkit-box-pack: justify;
  z-index: 199;
  top: 0;
  left: 0;
  background-color: @main-top;
  height: 84px;
  width: 100%;
  line-height: 84px;

  >.logo{
    background-color: white;
    vertical-align:middle;
    margin: 10px;
  }
  >span{
    color: @main-background;
    font-size: @font-size-oversized;
    font-weight:800;

  }
  
}
.m-tab-container{
    position: relative;
    .m-tabs-header{
      position: fixed;
      top: 84px;
      left: 0px;
      width: 100%;
      z-index: 199;
      display: flex;
      justify-content: space-around;
      align-items:center;
      height: 44px;
      line-height: 44px;
      background-color: @main-background;
      border-bottom: 1px solid @main-glide;
      a {
        color: black;
        &.router-link-active{
          color: @main-top;
          border-bottom: 3px solid @main-top;
        }
      }
    }
    .m-tab-panel{
      overflow: hidden;
      margin-top: 128px;
      width: 100%;
    }
  }

</style>
