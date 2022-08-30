<template>
    <div class="search">
        <div class="search-inner">
            <SvgIcon width="20" height="20" iconFileName="search"/>
            <input type="text" class="search-input" v-model="query" :placeholder="placeholder">
        </div>
        <div class="hot-topics" v-if="searchResult.length <=0">
            <p class="title">热门搜索</p>
            <ul class="hotlist">
                <li class="item" 
                v-for="(item, index) in HotKey" :key="index" 
                @click="changeQueryKeyword(item.first)">
                {{item.first}}
                </li>
            </ul>
        </div>
        <div class="search-result" v-else>
            <Scroll class="scroll-wrap">
            <ul>
                <li v-for="item in searchResult" :key="item.id" @click="addOneSong(item)">
                    <span>{{item.name}}</span>
                    -
                    <span v-for="(aItem,index) in item.artists" :key="index">{{aItem.name}}&nbsp;</span>
                </li>
            </ul>
            </Scroll>
        </div>
        
    </div>
</template>

<script setup>
import { onMounted,ref, watch } from  "@vue/runtime-core";
import { getSearch,getHoteKeyword,getDefaultKeyword } from "@/api/search"

import { getSongDtail } from "@/api/song"

import Scroll from "@/components/Scroll.vue"
let query = ref("")
let searchResult = ref([])
let HotKey = ref([])
let placeholder = ref([])
watch(()=>query.value, (newVal)=>{
    newVal = newVal.trim()
    if(!newVal) {
        searchResult.value=[]
    }
    getSearch(newVal)
    .then(res=>{
            searchResult.value = res.data.result.songs
            })
    .catch(err=>{console.log("search信息失败")})

})

onMounted(()=>{
    getHoteKeyword()
    .then(res=>{
        HotKey.value = res.data.result.hots
        console.log(HotKey.value)
    })
    .catch(err=>{console.log("search热搜请求失败")})

    getDefaultKeyword()
    .then(res=>{
        placeholder.value = res.data.data.showKeyword
    })
    .catch(err=>{console.log("search热搜请求失败")})

})

function changeQueryKeyword(q){
    query.value = q
}

import { useStore } from "vuex"
let store = useStore()
function addOneSong({id,name,al,ar}){
    // {id,name,picUrl,artists:song.artists}
    getSongDtail(id).then(res=>{
        let {id,name,al,ar} = res.data.songs[0]
    store.dispatch("addSongPlay",{id,name,picUrl:al.picUrl,ar})

    })
    .catch(err=>{
        console.log("歌曲请求失败")
    })
}
</script>

<style lang="less" scoped>
.search{
    position: relative;
    padding: 10px 20px;
    .search-inner{
        display: flex;
        align-items:center;
        box-sizing: border-box;
        background: #ebecec;
        width: 100%;
        padding: 0 8px;
        height: 40px;
        border-radius: 20px;
        .search-input{
            background: #ebecec;
            flex: 1;
            margin: 0 6px;
            line-height: 18px;
            color: black;
            font-size: 18px;
            outline: 0;
            &::-webkit-input-placeholder{
                color: #c9c9c9;
            }
        }
    }
    .hot-topics{
        margin-top: 20px;
        .title{
            margin-bottom: 20px;
            font-size: 14px;
            color:#666;
        }
        .item{
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border: 2px @main-glide solid;
            border-radius: 20px;

        }
    }
    .search-result{
        width: 100%;
        overflow:hidden;
        .scroll-wrap{
            width: 100%;
            height: calc(100vh - 188px);
            overflow: hidden;
        }
        li{
            overflow: hidden;
            padding: 5px 30px;
            height: 25px;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

}
</style>