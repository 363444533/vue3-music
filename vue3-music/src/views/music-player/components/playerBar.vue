<template>
  <transition name="player-bar">
    <div class="player-bar" v-show="!fullScreen" ref="playerBar">
      <div class="play-progress" :style="progressWidth">
        <div class="player">
          <div class="record-box"  @click="handlefull" :class="isRoutate">
            <img class="cd" src="@/assets/R-C.png" alt="cd" />

            <img :src="currentSong.picUrl" :alt="currentSong.name" />

          </div>
          <div class="info"  @click="handlefull">
            <span class="title">{{ currentSong.name }}</span>
            -
            <span v-for="item in currentSong.artists" :key="item.name"
              >{{ item.name }}&nbsp;</span>
          </div>
          <!-- 控制器 -->
          <div class="control">
            <SvgIcon class="icon" :iconFileName="playing ? 'end' : 'bofang'" width="30" height="30" @click="togglePlayState"/>
            <SvgIcon class="icon" iconFileName="next" width="30" height="30" @click="nextPlay"/>
            <SvgIcon class="icon" iconFileName="playlist" width="30" height="30" @click="showPopup = !showPopup"/>
          </div>
        </div>
      </div>
      <!-- 弹出层 -->
      <div class="popup">
          <van-popup v-model:show="showPopup" position="bottom"
          closeable
           style="max-height:30%;"
          >
          <h3 @click="changeMode">播放列表
          </h3>
          <p class="mos">
              <SvgIcon class="mos" :iconFileName="modeInfo.modeIcon"  width="25" height="25"/>&nbsp;{{modeInfo.modeText}}
          </p>
            <transition-group tag="ul" class="list" name="list">
                <li v-for="(item, index) in songplayList" :key="item.id">
                    <div class="inner-box">
                        <SvgIcon iconFileName="zzmusic" v-if="index === currentIndex" class="play icon"  width="25" height="25"/>
                        <span class="name" @click="playSong(item)">{{item.name}}</span>
                        <SvgIcon iconFileName="delete"  class="icon" @click="removeSong(item)"/>

                    </div>
                </li>
            </transition-group>
          </van-popup>

      </div>
    </div>

  </transition>
</template>

<script setup>
import {computed,ref,watch} from "vue"
import { useStore } from "vuex";
const store = useStore()
const props = defineProps(["progtessRatio","modeInfo","changeMode"])
const emits = defineEmits(["togglePlayState","nextPlay","proevPlay"])
let songplayList = computed(() => store.state.songplayList);
let currentSong = computed(() => store.getters.currentSong);
let isRoutate = computed(() => (playing.value ? "play" : "pause"));
let fullScreen = computed(() => store.state.fullScreen);
let playing = computed(() => store.state.playing);
let playMode = computed(() => store.state.playMode);
let currentIndex = computed(() => store.state.currentIndex);

let playerBar = ref(null)
const showPopup = ref(false)
const progressWidth = computed(()=>{
    if(!playerBar.value) return 0
    return `width:${props.progtessRatio * playerBar.value.offsetWidth}px`
})
function togglePlayState(){
    emits("togglePlayState")
}
function nextPlay(){
    emits("nextPlay")
}
function handlefull(){
  store.commit("setfullScreen", true);
    
}
function removeSong(song){
    store.dispatch("removeSong",song)
}
function  playSong(song){
    let index = songplayList.value.findIndex(item => item.id === song.id)
    store.commit("setcurrentIndex", index);
}
</script>

<style lang="less" scoped>

.player-bar{
    
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    
    z-index: 999;
    background-color: rgb(192, 255, 229);
    box-sizing: border-box;
    .play-progress{
            background-color: rgb(248, 192, 255);

        position: absolute;
        height: 5px;
        top: -2px;
        left: 0;
    }
    .player{
        position: relative;
        display: flex;
        width: 100vw;
        height: 55px;
        align-items:center;
        justify-content: space-between;
        box-sizing: border-box;
        color:black;
        padding: 0 20px 0 0;
        z-index: 999;
        .record-box{
            position: relative;
            overflow: hidden;
            width: 55px;
            height: 55px;
            margin: -20px 0 0 15px;
            border-radius: 50%;
            animation: rotate 20s linear infinite;
            &.play{
                animation-play-state: running;
            }
            &.pause{
                animation-play-state: paused;

            }
            
            img{
                // position: relative;
                // top: 50%;
                // left: 50%;
                width: 100%;
                height: 100%;
                // transform: translate(-50%,-50%);
                // border-radius: 50%;
                box-sizing: border-box;

            }
            img.cd{
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50%;
                height: 50%;
                transform: translate(-50%,-50%);
            }
        }
        .info{
            overflow: hidden;
            flex: 1;
            max-width: 68%;
            height: 100%;
            margin-left: 15px;
            padding-right: 8px;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 55px;
            font-size: 15px;
        }
        .control{
            display: flex;
            height: 100%;
            align-items:center;
            .icon{
                margin-left: 15px;
            }
            
        }
    }
    .popup{
        position: flex;
        bottom: 0;
        left: 0;
        z-index: 999;
        .mos{
            vertical-align: middle;
        }
        /deep/ .van-popup{
            padding: 10px;
            box-sizing:border-box;
            background-color: rgb(245, 251, 180);
            transition: .6s;
        }
        .title{
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            color: aliceblue;
        }
        .list{
            li{
                width: 100%;
                height: 30px;
                color: @recommon-author;
                font-size: 16px;
                .inner-box{
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
                .play{
                    position: absolute;
                    left: 0;
                    top: 5px;
                }
                .name{
                    overflow: hidden;
                    margin-left: 30px;
                    margin-right: 10px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .icon{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
    &.player-bar-enter-active,
    &.player-bar-leave-active{
        transition: all 0.6s cubic-bezier(0.45,0,0.55,1);
    }
    &.player-bar-enter-from,
    &.player-bar-leave-to{
        opacity: 0;
        transform: translate3d(0,100%,0);
    }

    .list-enter,
    .list-leave-to{
        opacity: 0;
        transform: translate3d(0,100%,0);
    }
    .list-leave-active
    .list-enter-active{
        transition: all .6s ease;
    }
    .list-move{
        transition: all .6s ease;
    }
    .list-leave-active{
        position: absolute;
    }
}

@keyframes rotate{
    0% {
        transform:rotate(0);
    }
    100% {
        transform:rotate(360deg) ;
    }
}
</style>