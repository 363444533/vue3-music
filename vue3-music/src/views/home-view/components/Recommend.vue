<template>
    <div class="recommend">
        <p class="recommend-top">热门</p>
        <div class="swiper-container">
            <van-swipe class="remd-swiper" :autoplay="3000" indicator-color="red" lazy-render>
                <van-swipe-item v-for="item in swiperImgList " :key="item">
                    <img :src="item.imageUrl" alt="图片">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 推荐歌单 -->
        <section class="recommend-playlist">
            <div class="remd-header">
                <p class="recommend-top">热门歌单推荐</p>
            </div>
            <u class="remd-playlist">
                <li v-for="(item, index) in playlist" :key="index" @click="handleClickPlayList(item.id)">
                    <img v-loadingimg="item.picUrl" alt="封面" class="cover">
                    <p class="name">{{item.name}}</p>
                    <!-- <p>good</p> -->
                </li>
            </u>
        </section>
        <!-- 推荐新歌 -->
        <section class="recommend-newsong">
            <div class="remd-header">
                <p class="recommend-top">推荐新歌</p>
            </div>
             <u class="remd-newsong">
                <li v-for="(item, index) in newSongList" :key="index" @click="addOneSong(item)">
                    <img v-loadingimg="item.picUrl" alt="图片" class="cover">
                    <div class="info">
                        <p class="name">{{item.name}}</p>
                        <p class="zuthor">
                            <span v-for="(aItem, aI) in item.song.artists" :key="aI">{{aItem.name}}</span>
                        </p>
                        <SvgIcon class="icon" width="25" height="25" iconFileName="playmusic" />
                    </div>
                    
                </li>
            </u>
        </section>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import { getRecommendSwiperImg, getRecommendPlaylist, getRecommendNewSong } from "@/api/recommend"
import { useStore } from "vuex"

const swiperImgList = reactive([])
const playlist = reactive([])
const newSongList = reactive([])
let router = useRouter([])
let store = useStore()
onMounted(() => {
    getPlaylist()
    getSwiperImg()
    getNewSongList()
})
//请求轮播图数据
let getSwiperImg = () => {
    getRecommendSwiperImg({ type: 2 })
        .then(res => {
            swiperImgList.push(...res.data.banners)
        })
        .catch(err => { console.log("请求出错") })
}

//请求歌单数据
let getPlaylist = () =>{
    getRecommendPlaylist()
    .then(res =>{
        playlist.push(...res.data.result)
    })
    .catch(err=>{
        console.log("请求歌单数据失败")
    })
}

//请求新歌
let getNewSongList = () =>{
    getRecommendNewSong()
    .then(res =>{
        newSongList.push(...res.data.result)
    })
    .catch(err=>{
        console.log("请求歌单数据失败")
    })
}

let handleClickPlayList = (id)=>{
    router.push(`/m/playList/${id}`)
}

//点击播放歌曲
function addOneSong({id,name,picUrl,song}){
    // {id,name,picUrl,artists:song.artists}
    store.dispatch("addSongPlay",{id,name,picUrl,ar:song.artists})
}

</script>

<style lang="less" scoped>
.recommend {
    .recommend-top {
        border-left: @main-top 2px solid;
        padding-left: 15px;
        margin: 10px 0 10px;
        font-size: @font-size-medium;
    }

    .swiper-container {
        width: 100%;
        .remd-swiper {
            width: 100%;
            .van-swipe-item {
            height: 20%;

                img {
                    width: 100%;
                }
            }
        }
    }
    .recommend-playlist{
        width: 100%;
        .remd-playlist{
            display: flex;
            flex-wrap:wrap;
            justify-content: space-between;
            width: 100%;
            text-decoration: none;
            li{
                flex: 0 0 32%;
                max-width: 32%;
                margin: 10px 1px;
                box-sizing: border-box;
                img{
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    
                }
                p{
                    padding: 0 5px;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    height: 3em;
                    line-height: 1.5em;
                    font-size: @font-size-small;
                }
            }
        }
    }
    .recommend-newsong{
        margin-left: 10px;
        width: 100%;
        
        .remd-newsong{
            text-decoration: none;
            li{
                position: relative;
                display: flex;
                height: 60px;
                margin-bottom: 10px;
                justify-content: space-between;
                align-items: center;
                .cover{
                    width: 56px;
                    height: 56px;
                    border-radius: 10px;
                }
                .info{
                    overflow: hidden;
                    flex: 1;
                    margin-left: 12px;
                    height: 100%;
                    border-bottom: @main-glide 1px solid;
                    .name{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        -webkit-line-clamp: 1;
                        font-size: @font-size-medium;
                    }
                    .zuthor{
                        font-size: @font-size-mini;
                        color: @recommon-author;
                        margin: 8px 4px;
                        span{
                            margin-right: 5px;
                        }
                    }
                    .icon{
                        position:absolute;
                        right: 20px;
                        top: 20px;
                    }
                }
                
            }
        }
    }
}
</style>