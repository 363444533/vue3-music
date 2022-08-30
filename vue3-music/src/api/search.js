import request from "@/untils/axios"

export function getSearch(keywords){
    return request({
        url: '/search',
        method:'get',
        params:{
            keywords
        }
    })
}

export function getHoteKeyword(){
    return request({
        url: '/search/hot',
        method:'get',
    })
}

export function getDefaultKeyword(){
    return request({
        url: '/search/default',
        method:'get',
    })
}