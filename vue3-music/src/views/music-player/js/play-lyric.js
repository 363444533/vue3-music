import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { getLyric } from "@/api/song";
import { formatLyric } from "./fromat"
export default function (currentTime) {
    const store = useStore();
    const currentSong = computed(() => store.getters.currentSong)
    const currentLyric = ref([])
    const currentLineNum = ref(0)
    const playLyric = ref("")
    const lyricScrollRef = ref(null)
    const lyricBlockRef = ref(null)
    let timer = null //定时器
    watch(currentSong, (newSong) => {
        if (!newSong.id) return
        getLyric(newSong.id).then(res => {

            currentLyric.value = formatLyric(res.data.lrc.lyric)
            currentTime.value = 0
            stopOperationLyric()
            //定时更新高亮
            startOperationLyric()
        }).catch(err => { console.log("请求歌词失败") })
    })
    // 监听滚动
    watch(()=>currentLineNum.value,(newNum)=>{
        scrollRunning(newNum)
    })

    // 高亮方法
    function startOperationLyric() {
        if (currentLyric.value.length > 0) {
            getInitCurrentLyric()
            timeUpdateLyric()
        }
    }

    // 初始高亮歌词
    function getInitCurrentLyric() {
        let cLyricValue = currentLyric.value,
            cTimeVal = currentTime.value,
            index = 0
            console.log(cTimeVal)
        cLyricValue.forEach((item, i, arr) => {
            if (cTimeVal >= item.time && (i === arr.length - 1|| cTimeVal < arr[i + 1].time)) {
                index = i
            }
        })
        playLyric.value = cLyricValue[index].lyric
        currentLineNum.value = index
    }
    function settime(time){
        currentTime.value = time
    }
    // 定时更新
    function timeUpdateLyric() {
        let cLyricValue = currentLyric.value,
            index = currentLineNum.value,
            cTimeVal = currentTime.value,
            len = cLyricValue.length
            if (index >= len - 1) return currentLineNum.value = len - 1
            if ((cLyricValue[index + 1].time - cLyricValue[index].time) < Math.abs(cTimeVal - cLyricValue[index].time)) {
                cLyricValue.forEach((item, i, arr) => {
                    if (cTimeVal >= item.time && (i === arr.length - 1  || cTimeVal < arr[i + 1].time)) {
    
                        index = i
                        if (index >= len - 1) return currentLineNum.value = len - 1
    
                        currentLineNum.value = index
                        playLyric.value = cLyricValue[currentLineNum.value].lyric
                        timeUpdateLyric()
                        return
    
                    }
                })
            }
        if (index >= len - 1) return currentLineNum.value = len - 1

        let delay = cLyricValue[index + 1].time - currentTime.value

        timer = setTimeout(() => {
            index = Math.min(index + 1, len - 1)
            currentLineNum.value = index
            playLyric.value = cLyricValue[currentLineNum.value].lyric
            timeUpdateLyric()
        }, delay * 1000);
    }
    // 关闭定时器
    function stopOperationLyric(){
        clearTimeout(timer)
    }
    // 滚动动画
    function scrollRunning(num){
        if(num>10){
        const targetEle = lyricBlockRef.value.children[num-10]
        lyricScrollRef.value.scroll.scrollToElement(targetEle,1000)
        }else{
        lyricScrollRef.value.scroll.scrollToElement(0,0,1000)

        }
    }
    return {
        currentLyric,
        playLyric,
        currentLineNum,
        lyricScrollRef,
        lyricBlockRef,
        stopOperationLyric,
        startOperationLyric,
        settime
    }
}