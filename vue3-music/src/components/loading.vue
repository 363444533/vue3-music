<template>
    <div class="loading-wrap"> 
        <div class="loading-content">
            <img width="24" height="24" src="@/assets/lolding.gif" alt="">
            <p class="desc">正在加载...</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.loading-wrap{
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate3d(-50%);
    .loading-content{
        text-align: center;
        font-size: @font-size-medium;
        
    }
}
</style>