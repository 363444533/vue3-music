// 音乐控制器逻辑
import { computed, nextTick, ref, watch } from "vue";
import { useStore } from "vuex";
import { Toast } from 'vant';
export default function(audioRef){
    let store = useStore()
    let playing = computed(() => store.state.playing)
    let songplayList = computed(() => store.state.songplayList);
    let currentIndex = computed(() => store.state.currentIndex);
    const modeTextArr = ["单曲循环","随机播放","顺序播放"]
    const modeIconArr = ["round","random","plain"]

    const playMode = computed(()=>store.state.playMode);
    const modeText = computed(()=>modeTextArr[playMode.value])
    const modeIcon = computed(()=>modeIconArr[playMode.value])
    watch(playing, (newState)=>{
        if(newState){
            audioRef.value.play()
        }else{
            audioRef.value.pause()
        }
    })
    // 暂停 播放
    function togglePlayState(){
        store.commit("setPlaying", !playing.value)
    }
    // 下一首
    function nextPlay(){
        let length = songplayList.value.length
        let nextIndex = currentIndex.value + 1
        if(length === 1) store.commit("setPlaying", true);
        if(nextIndex === length) nextIndex = 0
        store.commit("setcurrentIndex", nextIndex)
    }
    // 上一首
    function proevPlay(){
        let length = songplayList.value.length
        let nextIndex = currentIndex.value -1
        if(length === 0)return
        if(length === 1) togglePlayState();
        if(nextIndex === -1) nextIndex = length-1
        store.commit("setcurrentIndex", nextIndex)
    }
    // 播放模式
    async function changeMode(){
        const modeVal = (playMode.value +1) % 3
        store.dispatch("changeMode",modeVal)
        await nextTick()
        Toast({
            message: modeText,
            className:"name"
           
        });
    }

    return{
        togglePlayState,
        nextPlay,
        proevPlay,
        changeMode,
        modeIcon,
        modeText

    }
}