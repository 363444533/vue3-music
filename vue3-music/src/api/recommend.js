import request from "@/untils/axios"

export function getRecommendSwiperImg(parmas){
    return request({
        url:'/banner',
        method:'get',
        parmas
    })
}

export function getRecommendPlaylist(){
    return request({
        url: '/personalized',
        method: 'get',
        params: {
            limit: 9
        }
    })
}

export function getRecommendNewSong(){
    return request({
        url: '/personalized/newsong',
        method: 'get',
        params: {
            limit: 15
        }
    })
}

export function getPlaylist(id){
    return request({
        url: '/playlist/detail',
        method: 'get',
        params: {
            id
        }
    })
}