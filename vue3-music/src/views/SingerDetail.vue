<template>
        <back/>

    <div class="singer-detail">
        <div class="artist-info">
            <img class="a-cover" :src="artistInfo.cover" :alt="artistInfo.name">
            <div class="a-content">
                <div class="avatar">
                    <img :src="artistInfo.cover" :alt="artistInfo.name">

                </div>
                <h2 class="name">{{artistInfo.name}}</h2>
                <p class="identify">{{identify.imageDesc}}</p>
                <p class="desc">{{artistInfo.briefDesc}}</p>
            </div>
        </div>
        <SongsList :songsData="songsListData" />
    </div>
</template>

<script setup>
import { onMounted,ref,reactive } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { getSingerDetail, getSingerAllsongs } from "@/api/song"
import SongsList from "@/components/songlist.vue"
import back from "@/components/back.vue"

let route = useRoute(),
    id = route.params.id
let artistInfo = ref({})
let identify = ref({})
let songsListData = reactive([])
 onMounted(()=>{
     getSingerDetail(id)
     .then(res=>{
         artistInfo.value = res.data.data.artist
         identify.value = res.data.data.identify
     })
     .catch(err=>{console.log("歌手信息获取失败")})

     getSingerAllsongs(id).then(res=>{
        // songsListData.value = res.data.songs
        songsListData.push(...res.data.songs)
     })
     .catch(err=>{console.log("歌手歌曲获取失败")})
 })  
  
</script>

<style lang="less" scoped>
.singer-detail{
    .artist-info{
        position: relative;
        height: 40vh;
        .a-cover{
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center center;

        }
        .a-content{
            position: absolute;
            // bottom: 0;
            top: 53%;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
            height: 40%;
            padding: 10px;
            border-radius: 10px;
            filter: bightness(0.9);
            box-shadow: 0 0 4px @main-background;
            background-color: @recommon-author;
            font-size: @font-size-small;
            line-height:2em;
            text-align: center;
            .avatar{
                overflow: hidden;
                position: absolute;
                top: 0;
                left: 50%;
                width: 80px;
                height: 80px;
                background-size: cover;
                background-position: center center;
                transform: translateX(-50%) translateY(-50%);
                border-radius: 50%; 
                img{
                    position: absolute;
                    top: 0;
                    left: 50%;
                    height: 100%;
                    transform: translateX(-50%);
                }
                }
                .name{
                    padding-top: 40px;
                    font-size:"@font-size-large"
                }
                .identify{
                    overflow: hidden;
                    padding: 0 60px;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                }
                .desc{
                    // color: white;
                    display: -webkit-box;
                    line-height: 25px;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-top: 3px;

                }
            }
    }
    
}
</style>