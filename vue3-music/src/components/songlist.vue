<template>
  <section class="all-song">
    <p class="songs-subtit">
      <svg-icon
        class="icon"
        width="30"
        height="30"
        iconFileName="playmusic1"
      ></svg-icon>
      <span @click="addallsong">播放全部({{ songsData.length }})</span>
    </p>
    <ul class="song-list" v-loading="loading">
      <li class="songs-item" v-for="(item, index) in songsData" :key="index" @click="addOneSong(item)">
        <p class="order">{{ index + 1 }}</p>
        <div class="content">
          <p class="name">{{ item.name }}</p>
          <p class="desc">
            <span v-for="aItem in item.ar" :key="aItem.id">
              {{ aItem.name }}&nbsp;
            </span>
          </p>
          <SvgIcon
            iconFileName="playmusic"
            width="25"
            height="25"
            class="song-svg"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue"
let { songsData } =defineProps(["songsData"])
import { useStore } from "vuex"
let store = useStore()

let loading = computed(()=>songsData.length <= 0)
let index = computed(()=>store.state.currentIndex)
function addOneSong({id,name,al,ar}){
    // {id,name,picUrl,artists:song.artists}
    store.dispatch("addSongPlay",{id,name,picUrl:al.picUrl,ar})
}

// 播放全部
function addallsong(){
  songsData.forEach(element => {
    addOneSong(element)
  });
  store.commit("setcurrentIndex", store.state.currentIndex-29);
}
</script>

<style lang="less" scoped>
.all-song {
  font-size: @font-size-medium;
  .songs-subtit {
    background-color: @danhui;
    color: #666;
    .icon {
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .song-list {
    padding-top: 5px;
    background-color: @main-background;
    .songs-item {
      display: flex;
      align-content: center;
      box-sizing: border-box;
      height: 55px;
      .order {
        width: 30px;
        height: 30px;
        margin: 15px 10px;
        font-size: @font-size-large;
        color: @recommon-author;
      }
      .content {
        position: relative;
        width: 100%;
        border-bottom: 1px @main-glide solid;
        .name {
          width: 85%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 1;
          font-size: @font-size-medium;
        }
        .desc {
          width: 88%;
          margin: 5px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 1;
          font-size: @font-size-small;
          color: @recommon-author;
        }
        .song-svg {
          position: absolute;
          top: 13px;
          right: 10px;
        }
      }
    }
  }
}
</style>