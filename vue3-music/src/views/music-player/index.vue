<template>
  <div class="player" v-if="songplayList.length > 0">
    <transition name="player">
      <div class="player-transition" v-show="fullScreen">
        <div class="bg-cover">
          <img :src="currentSong.picUrl" :alt="currentSong.name" />

        </div>
        <div class="player-header">
          <svg-icon
            class="back"
            iconFileName="downward"
            width="25"
            height="25"
            @click="cancelFullScreen"
          />
          <div class="hgroup">
            <p class="title">{{ currentSong.name }}</p>
            <p class="zuozhe">
              <span v-for="item in currentSong.ar" :key="item.name"
                >{{ item.name }}&nbsp;</span
              >
            </p>
          </div>
        </div>
        <div class="song-wrap">
          <div class="song-wrap-left " :class="{showBlock:showcdBlock}" @click="toggminright">
            <div class="recode-disc">
              <div class="rotate" :class="isRoutate">
                <img class="cd" src="@/assets/cd.jpg" :alt="currentSong.name" />

                <img :src="currentSong.picUrl" :alt="currentSong.name" />

              </div>
            </div>
            <p class="l-lyric">{{playLyric}}</p>
          </div>
          <Scroll class="song-wrap-right" :class="{showBlock:!showcdBlock}" ref="lyricScrollRef">
            <div class="lyric-block" ref="lyricBlockRef">
              <p v-for="(item,index) in currentLyric" :key="index" :class="{active: index === currentLineNum}"
              @click.stop="handleyd(item.time)"
              >{{item.lyric}}</p>
            </div>
          </Scroll>
          
        </div>
        <div class="cut">
            <span :class="showcdBlock?'ma':'mi'" @click="toggminleft"></span>
            <span :class="showcdBlock?'mi':'ma'" @click="toggminright"></span>
          </div>
        <div class="player-footer">
          <div class="player-progress">
            <span class="time playtime">{{formatTime(currentTime)}}</span>
            <Progress :progress="progtessRatio" @progressMove="progressMove" @progressEnd="progresEnd"/>
            <span class="time endtime">{{formatTime(duration)}}</span>
          </div>
          <div class="player-controller">
            <SvgIcon :iconFileName=modeIcon width="30" height="30" @click="changeMode"/>
            <SvgIcon iconFileName="prev" width="30" height="30" @click="proevPlay"/>
            <SvgIcon :iconFileName="playing ? 'end' : 'bofang'" width="30" height="30" @click="togglePlayState"/>
            <SvgIcon iconFileName="next" width="30" height="30" @click="nextPlay"/>
            <SvgIcon iconFileName="like" width="30" height="30" />
          </div>
        </div>
      </div>
    </transition>
    <playerBar 
    :progtessRatio="progtessRatio"  
    @togglePlayState="togglePlayState" 
    @nextPlay="nextPlay" 
    @proevPlay="proevPlay"
    :changeMode="changeMode"
    :modeInfo = "{modeIcon, modeText}"
    />
  </div>
  <audio ref="audioRef" @canplay="audioReady" @timeupdate="timeUpdate" @ended="playEnd"></audio>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { getSongUrl,getLyric } from "@/api/song";
import Progress from "./components/Progress.vue";
import initplayCintroller from "./js/playCintroller";
import playerBar from "./components/playerBar.vue"
import Scroll from "@/components/Scroll.vue"
import initplayLyric from "./js/play-lyric"
let showcdBlock = ref(true);
let audioRef = ref(null);
let store = useStore();
let songplayList = computed(() => store.state.songplayList);
let currentSong = computed(() => store.getters.currentSong);
let isRoutate = computed(()=>playing.value?"play":"pause");
let fullScreen = computed(() => store.state.fullScreen);
let playing = computed(() => store.state.playing);
let playMode = computed(() => store.state.playMode);
let duration = ref(0); //mp3时长
let currentTime = ref(0)
// 时间进度比
let progtessRatio = computed(()=>{
  if (!audioRef.value)return 0
  return currentTime.value / duration.value
})
let { togglePlayState, nextPlay, proevPlay, changeMode,modeIcon,modeText } = initplayCintroller(audioRef);
//滚动歌词
let { currentLyric,playLyric,currentLineNum,lyricScrollRef,lyricBlockRef,stopOperationLyric,startOperationLyric,settime } = initplayLyric(currentTime)
watch(playing,(newState)=>{
  if(newState){
    stopOperationLyric()

    startOperationLyric()
  }else{
    stopOperationLyric()
  }
})
// 监听当前要播放的歌曲对象
watch(currentSong, (newSong) => {
  if (!newSong.id) return;
  getSongUrl(newSong.id)
    .then((res) => {
      const musicUrl = res.data.data[0].url;
      audioRef.value.src = musicUrl;
      audioRef.value.play();
      store.commit("setPlaying", true);
    })
    .catch((err) => {
      console.log("获取歌曲mp3失败");
    });
});
function handleyd(time){
  audioRef.value.currentTime = currentTime.value = time
  // currentTime.value = time
  stopOperationLyric()
     startOperationLyric()
}
// 取消全屏状态
function cancelFullScreen() {
  store.commit("setfullScreen", false);
}
function playEnd(){
  audioRef.value.currentTime = 0
  if(playMode.value === 0){
     audioRef.value.play();
     store.commit("setPlaying", true);
     settime(0)
     stopOperationLyric()
     startOperationLyric()
  }
  else{
    nextPlay()
    
  }
  // stopOperationLyric()
  //    startOperationLyric()
}
// 获取时长
function audioReady() {
  duration.value = audioRef.value.duration;
}
function timeUpdate(){
  currentTime.value = audioRef.value.currentTime
}
//时间转换
function formatTime(time) {
  time = time | 0;
  let m = String((time / 60) | 0).padStart(2, 0);
  let s = String(time % 60).padStart(2, 0);
  return `${m}:${s}`;
}

//移动进度条触发事件
function progressMove(newRatio){
  audioRef.value.currentTime = currentTime.value = newRatio * duration.value
  if(playing.value) store.commit("setPlaying",false)

}

function progresEnd(newRatio){
  audioRef.value.currentTime = currentTime.value = newRatio * duration.value
  if(!playing.value) store.commit("setPlaying",true)
  stopOperationLyric()
  startOperationLyric()
}
// 切换歌词区块

function toggminleft(){
showcdBlock.value = true
}

function toggminright(){
showcdBlock.value = false

}
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .player-transition {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgb(204, 198, 198);
    
    .bg-cover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      
    }
    .player-header {
      position: relative;
      padding-top: 10px;
      text-align: center;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 22px;
        padding: 9px;
      }
      & > * {
        margin: 0 auto;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 2em;
      }
      .title {
        font-size: 20px;
        padding: 0 60px 0;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .zuozhe {
        font-size: 15px;
        color: #272424d2;
      }
    }
    .song-wrap {
      position: relative;
      overflow: hidden;
      width: 100%;
      top: 20px;
      height: calc(100vh - 300px);
      .song-wrap-left {
        padding-top: 20px;
        position: absolute;
        left: -200%;
        top: 0;
        width: 100%;
        height: 100%;
        .recode-disc {
          overflow: hidden;
          .rotate {
            position: relative;
            overflow: hidden;
            margin: 0 auto;
            width: 70vw;
            height: 70vw;
            border-radius: 50%;
            border: 10px solid rgba(255, 255, 255, 0.1);
            animation: rotate 20s linear infinite;
            &.play {
              animation-play-state: running;
            }
            &.pause {
              animation-play-state: paused;
            }
            img {
              position: absolute;
              top: 50%;
                left: 50%;
              width: 75%;
              height: 75%;
              box-sizing: border-box;
                transform: translate(-50%,-50%);
              border-radius: 50%;
            }
            img.cd{
              position: absolute;
                top: 50%;
                left: 50%;
                width: 210%;
                height: 160%;
                transform: translate(-50%,-50%);
            }
          }
        }
        .l-lyric {
          overflow: hidden;
          width: 80%;
          margin: 50px auto 0 auto;
          text-align: center;
          line-height: 2em;
          font-size: 18px;
          color: #fff;
        }
      }
      .song-wrap-right {
        position: absolute;
        left: -200%;
        top: 0;
        width: 100%;
        height: 100%;
        .lyric-block {
          text-align: center;
          line-height: 2em;
          overflow: hidden;
          width: 80%;
          margin: 30px auto 0 auto;
          font-size: 17px;
          color: hsla(0,0%,100%,.6);

          
        }
        
      }

      .active{
          color: #fff;
          font-size: 18px;

        }
      .showBlock{
      left: 0;
    }
    }
    .cut{
      position: relative;
      justify-content: center;
      display: flex;
      top: 60px;
        width: 100%;
          text-align: center;
padding-left: -5px;
        span{
        align-items: center;
        background: #fff;
        margin: 2px;
        }
        .mi{
          width: 15px;
          height: 10px;
          border-radius: 4px;
        }
        .ma{
          width: 23px;
          height: 10px;
          border-radius: 4px;
        }
      }
    .player-footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 30px;
      width: 80%;
      height: 100px;
      margin: 0 auto;
      .player-progress {
        display: flex;
        align-items: center;
        padding: 10px 0;
        color: #fff;
        .playtime {
          margin-right: 4px;
        }
        .endtime {
          margin-left: 15px;
        }
      }
      .player-controller {
        display: flex;
        height: 60px;
        align-items: center;
        & > * {
          flex: 1;
        }
      }
    }

    &.player-enter-active,
    &.player-leave-active{
        transition: all 0.4s cubic-bezier(0.45,0,0.55,1);
    }
    &.player-enter-from,
    &.player-leave-to{
        opacity: 0;
        transform: scale(.4);
    }
    
    
  }
}
    
@keyframes rotate {
  0% {
    transfrom: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>