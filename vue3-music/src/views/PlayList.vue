<template>
        <back/>

    <div class="m-playlist">
        <section class="m-p-header">
            <img :src="playListData.coverImgUrl" alt="图片" class="p-header-bg"> 
            <div class="p-head-container">
                <div class="p-h-cover">
                    <img :src="playListData.coverImgUrl" alt="图片"> 
                    <span class="gd">歌单</span>
                    <div class="play-count">
                        <SvgIcon iconFileName="music1" width="15" height="15" class="svg-head" />
                        <span>{{handlePlayCount(playListData.playCount)}}</span>
                    </div>
                </div>
                <!-- 文本描述 -->
                <div class="p-h-text-info">
                    <p class="info-name">{{playListData.name}}</p>
                    <p class="creator">
                        <img :src="creatorInfo.avatarUrl" :alt="creatorInfo.nickname" class="avatar">
                        {{creatorInfo.nickname}}
                    </p>
                </div>                
            </div>
        </section>
        <!-- 播放全部 -->
        <!-- <section class="m-p-song">
            <p class="songs-subtit">
                <svg-icon class="icon" width="30" height="30" iconFileName="playmusic1"></svg-icon>
                <span>播放全部({{songsData.length}})</span>
                
            </p>
            <ul class="song-list" v-loading="loading">
                    <li class="songs-item" v-for="(item, index) in songsData" :key="index" >
                        <p class="order">{{index+1}}</p>
                        <div class="content">
                            <p class="name">{{item.name}}</p>
                            <p class="desc">
                                <span v-for="aItem in item.ar" :key="aItem.id">
                                    {{aItem.name}}&nbsp;
                                </span>
                            </p>
                            <SvgIcon iconFileName="playmusic" width="25" height="25" class="song-svg" />
                        </div>
                    </li>
                </ul>
        </section> -->
        <SongsList :songsData="songsData" />
        
    </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { computed, onMounted, reactive, ref } from "vue"
import { getPlaylist } from "@/api/recommend"
import { getSongDtail } from "@/api/song"
import SongsList from "@/components/songlist.vue"
import back from "@/components/back.vue"
let route = useRoute();
let playListData = ref([]);
let creatorInfo = ref([]);
let songsData = reactive([]);
//转换播放数单位
let handlePlayCount = (count) =>{
    if (count >= 10000 && count <100000000){
        return (count / 10000).toFixed()+"万"
    }else if (count>=100000000){
        return (count / 100000000).toFixed()+"亿"
    }else{
        return count
    }
}
// 请求数据
let getPlaylistdetail = () =>{
    getPlaylist(route.params.id)
    .then(res=>{
        playListData.value = res.data.playlist
        creatorInfo.value = res.data.playlist.creator
        let trackIds = res.data.playlist.trackIds
        trackIds.length = Math.min(30, trackIds.length)
        getSongs(trackIds)

    })
    .catch(err=>{console.log("请求歌单详情错误")})
}
let getSongs = (trackIds) =>{
    let ids = [];
    trackIds.forEach(item => ids.push(item.id));
    getSongDtail(ids.toString())
    .then(
        res=>{
            songsData.push(...res.data.songs)
        }
    ).catch(err=>{console.log("批量获取歌曲失败！")})
}
onMounted(() => {
    getPlaylistdetail()

})




</script>

<style lang="less" scoped>
.m-playlist{
    .m-p-header{
        overflow: hidden;
        position: relative;
        height: 200px;
        .p-header-bg{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            filter:blur(40px);
            -webkit-filter: blur(40px);
        }
        .p-head-container{
            display: flex;
            justify-content: space-between;
            height: 200px;
            padding: 30px 10px 30px 15px;
            box-sizing: border-box;
            .p-h-cover{
                position: relative;
                width: 40%;
                img{
                    height: 100%;
                    width: 100%;
                }
                .gd{
                    position: absolute;
                    border-top-right-radius:10px;
                    border-bottom-right-radius:10px;
                    color: #fff;
                    height: 20px;
                    width: 40px;
                    font-size: @font-size-small;
                    padding-left: 5px;
                    background-color: rgb(181,48,50);
                    top: 15px;
                    left: -5px;
                    
                }
                .play-count{
                    .svg-head{
                        vertical-align: middle;
                        margin-right: 2px;
                    }
                    position: absolute;
                    right: 4px;
                    top: 2px;
                    color: #fff;
                    font-size: @font-size-mini;
                    }
                
            }
            .p-h-text-info{
                  width: 55%;  
                  .info-name{
                      display: -webkit-box;
                      overflow: hidden;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                      height: 3em;
                      line-height: 1.5em;
                      color: #fff;
                      margin-bottom: 16px;
                      font-size: @font-size-large;
                  }
                  .creator{
                      color: rgb(235,225,225);
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      img{
                          
                          width: 30px;
                          height: 30px;
                          border-radius: 50%;
                          vertical-align: middle;
                      }
                  }
            }
            
            
        }
    }
    .m-p-song{
        font-size: @font-size-medium;       
        .songs-subtit{
            background-color: @danhui;
            color: #666;
                    .icon{
                            vertical-align: middle;
                            margin-right: 10px;
                        } 
        }

        .song-list{
            padding-top: 5px;
            background-color: @main-background;
            .songs-item{
                display: flex;
                align-content: center;
                box-sizing: border-box;
                height: 55px;
                .order{
                    width: 30px;
                    height: 30px;
                    margin: 15px 10px;
                    font-size: @font-size-large;
                    color: @recommon-author;
                }
                .content{
                    position: relative;
                    width: 100%;
                    border-bottom: 1px @main-glide solid;
                    .name{
                        width: 85%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        -webkit-line-clamp: 1;
                        font-size: @font-size-medium;
                    }
                    .desc{
                        width: 88%;
                        margin: 5px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        -webkit-line-clamp: 1;
                        font-size: @font-size-small;
                        color: @recommon-author;
                        
                    }
                    .song-svg{
                        position:absolute;
                        top: 13px;
                        right: 10px;
                    }
                }
            }
        }
    }
}
</style>