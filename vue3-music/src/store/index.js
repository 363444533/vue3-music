import { createStore } from 'vuex'

export default createStore({
  state: {
    // 播放列表
    songplayList:[],
    // 播放下标
    currentIndex:-1,
    // 播放状态
    playing:false,
    // 播放模式
    // 0 顺序 1 单曲 2 随机 3 列表
    playMode:0,
    // 是否全屏
    fullScreen:false,
    randomList :[],
  },
  getters: {
    currentSong(state){
      return state.songplayList[state.currentIndex] ||  {}
    }
  },
  mutations: {
    // 设置当前播放歌曲列表
    setMusicPlayList(state, list){
      state.songplayList = list
      if(state.songplayList.length == 0){
        state.playing = false
        state.currentIndex = -1
      }
    },
    setPlaying(state, isPlayState){
      state.playing = isPlayState
    },
    setplayMode(state, mode){
      state.playMode = mode
    },
    setcurrentIndex(state, index){
      if(index===-1) index = 0
      state.currentIndex = index
    },
    setfullScreen(state, isfullScreen){
      state.fullScreen = isfullScreen
    },
    setrandomList(state,list){
      state.randomList = list
    }
  },
  actions: {
    addSongPlay({state, commit}, song){
      commit("setfullScreen", true)
      let { songplayList, currentIndex,randomList} = state
      let index = songplayList.findIndex(item => item.id === song.id)
      if(index==-1){
        currentIndex++
        songplayList.splice(currentIndex,0,song)
        randomList.unshift(song)
      }
      else{

        if(index > currentIndex){
          songplayList.splice(index,1)
          currentIndex++
          songplayList.splice(currentIndex,0,song)
        }
        else{
          songplayList.splice(currentIndex+1,0,song)
          songplayList.splice(index,1)
        }
      }

      this.commit("setcurrentIndex",currentIndex)
      this.commit("setMusicPlayList",songplayList)
      this.commit("setrandomList",randomList)
      this.commit("setPlaying",true)

      
    } ,
    // 删除歌曲
    removeSong({state,commit},song){
      let { songplayList, currentIndex,randomList } = state
      let index = songplayList.findIndex(item => item.id === song.id)
      let rindex = randomList.findIndex(item => item.id === song.id)
      
      if(index < 0 || rindex < 0) return
      songplayList.splice(index,1)
      randomList.splice(rindex,1)
      if(index <currentIndex)
      currentIndex--
      if(songplayList.length === currentIndex) 
      currentIndex--
      this.commit("setcurrentIndex",currentIndex)
      this.commit("setrandomList",randomList)

      this.commit("setMusicPlayList",songplayList)
    },

    changeMode({state,getters,commit},mode){
      let randomList = state.randomList.slice()
      const currentSong = getters.currentSong
      if(mode == 2){
        commit("setMusicPlayList",randomList.sort((a,b)=>Math.random()-0.5)) 
      }
      const index = state.songplayList.findIndex(item => item.id === currentSong.id)
      commit("setcurrentIndex",index)
      commit("setplayMode",mode)
      console.log(randomList)
    }
  },
  modules: {
  }
})
