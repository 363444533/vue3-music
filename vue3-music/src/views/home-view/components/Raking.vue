<template>
    <div class="raking">
        <div class="ranking-list">
            <ul>
                <li class="ranking-item" v-for="item in rankingList" :key="item.id"
                @click="handleClick(item.id)">
                    <div class="cover">
                        <img width="100" height="100"  v-loadingimg="item.coverImgUrl" alt="">
                    </div>
                    <div class="info">
                        <p class="name">{{item.name}}</p>
                        <p class="desc">{{item.description}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import { getRankingList } from "@/api/ranking"
import { useRouter } from "vue-router"
let rankingList = ref([])
let route = useRouter()
let handleClick = (id)=>{
    route.push(`/m/playList/${id}`)
}
onMounted(()=>{
    getRankingList()
        .then(res=>{
            rankingList.value = res.data.list
        })
        .catch(err=>console.log("排行榜信息获取失败"))
})
</script>

<style lang="less" scoped>
.raking{
    width: 100%;
    .ranking-list{
        margin: 0 20px;
        .ranking-item{
            display: flex;
            height: 100px;
            margin-top: 20px;
            background-color: rgb(225,225,225);
            &:last-child{
                padding-bottom: 20px;
            }
            .cover{
                width: 100px;
                height: 100px;
            }
            .info{
                flex:1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-left: 20px;
                height: 100px;
                overflow: hidden; 
                .name{
                    font-size:@font-size-medium;
                }
                .desc{
                    color: #888;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: @font-size-small;
                }
            }
        }
    }
    
}
</style>