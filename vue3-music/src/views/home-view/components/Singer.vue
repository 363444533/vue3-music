<template>
    <div class="singer">
        <!-- 歌手列表 -->
        <Scroll class="scroll-plane" ref="scrollRef" :probeType="3" @scroll="handleScrollView">
            <ul class="singer-list" ref="gropRef">
                <li  class="singer-list-group" v-for="item in singerList" :key="item.tag">
                    <p class="group">{{item.tag}}</p>
                    <ul>

                        <li class="group-item" v-for="sItem in item.singerInfo" :key="sItem.id"  @click="headleClick(sItem.id)">
                            <div class="avatar">
                                    <img v-loadingimg="sItem.picUrl" alt="头像">
                                    <!-- <img src="@/assets/defaultimg.jpg" alt=""> -->
                            </div>
                            <span>{{sItem.name}}</span>
                        </li>
                    </ul>

                </li>
            </ul>
        </Scroll>
        <!-- 固定索引栏 -->
        <div class="index-bar" >
            <ul>
                <li @touchstart.prevent.stop="handleTouchStart($event,index)" 
                :class="{current:currentIndex===index}" 
                v-for="(item, index) in singerList" :key="item.tag"
                @touchmove.prevent.stop="handleTouchMove($event,index)" 
                @touchend.prevent.stop="handelTouch(index)"
               
                >{{item.tag}}</li>
            </ul>
        </div>
    </div>  
</template>

<script setup>
import Scroll from "@/components/Scroll.vue"
import { reactive } from "@vue/reactivity"
import { getHotSinger, getSingerList } from "@/api/song"
import { nextTick,onMounted, ref, watch  } from "@vue/runtime-core"
import { useRouter } from "vue-router"

// butterscroll实例对象
let scrollRef = ref(null)
// 锚点
let gropRef = ref(null)
//触摸点
let touchPosition = {}
// 激活的索引下标
let currentIndex = ref(0)
let moveIndex = 0
let temArr = reactive([])
let allGroupAllHeight = ref([])
let router = useRouter()
function headleClick(id){
    router.push(`/m/SingerDetail/${id}`)
    // console.log(id)
}

// 监听当前索引栏字母位置，触摸，触摸滚动,
function handleTouchMove(e,i){
    touchPosition.y2 = e.touches[0].pageY
    moveIndex = i + (Math.floor((touchPosition.y2 - touchPosition.y1) / 20))
    scrollTo(moveIndex)
}
function handleTouchStart(e, i){
    touchPosition.y1 = e.touches[0].pageY
    moveIndex = i
}

function handelTouch(i){    
    if(moveIndex == i){
        scrollTo(i)
    }

}

// 移动函数
function scrollTo(i){ 
    i = Math.max(0,Math.min(i,26))
    currentIndex.value = i
    let targetElement = gropRef.value.children[i]
    let scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetElement,300)
}

watch(()=> temArr.length, async ()=>{
    await nextTick()
    let allGroupLi = gropRef.value.children
    // 初始高度
    let initHeight = 0
    let temp = [initHeight]
    for(let i=0;i<allGroupLi.length;i++){
        temp.push(initHeight += allGroupLi[i].offsetHeight)
    }
    allGroupAllHeight.value = temp
})
// 页面滚动，固定栏同步
function handleScrollView(y){
    y = -y;
    allGroupAllHeight.value.forEach((itemY, i)=>{
        let nextItemY = allGroupAllHeight.value[i+1]
        if( y>=itemY && y <nextItemY){
                currentIndex.value = i
        }
    })
}

let singerList = handleAnchor()
function handleAnchor(){
    let arr = reactive([{tag: "热"}])
    for (let i=65;i<91;i++){
    arr.push({tag: String.fromCharCode(i)})
    }
    return arr;

}
onMounted(()=>{
    singerList.forEach(item=>{
        if(item.tag == "热"){
            getHotSinger().then(res=>{
                item.singerInfo = res.data.artists
                temArr.push(item.singerInfo)
            })
            .catch(err=>{console.log("请求热门歌手失败！")})
        }
        else{
            getSingerList(item.tag).then(res=>{
                item.singerInfo = res.data.artists
                temArr.push(item.singerInfo)

            })
            .catch(err=>{console.log("请求"+item.tag+"歌手失败！")})
        
        }
    }
    )
})

</script>

<style lang="less" scoped>
.singer{
    .scroll-plane{
        overflow: hidden;
        width: 100%;
        height: calc(100vh - 128px);
    }
    .singer-list{
        .singer-list-group{
            .group{
                color: @danred;
                background-color: @danhui;
                padding-left: 5%;
            }
            .group-item{
                .avatar{
                    padding-left: 20px;
                    width: 50px;
                    height: 50px;
                    display: inline-block;
                    img{
                        vertical-align: middle;
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                    margin: 10px;
                }
                span{
                    color: @recommon-author;
                    font-size: @font-size-small;
                }
            }
        }
    }
    .index-bar{
        .current{
            color: @main-top;
        }
        position: fixed;
        right: 15px;
        font-size: @font-size-small;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px 1px;
        text-align: center;
        background-color: rgb(215,215,215);
        color:white;
        border-radius: 5px;
        width: 20px;
    }
}
</style>