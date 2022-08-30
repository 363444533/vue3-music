import request from "@/untils/axios"

export function getSongDtail(ids){
    return request({
        url: '/song/detail',
        method:'get',
        params:{
            ids
        }
    })
}

// 请求歌手数据
export function getHotSinger(){
    return request({
        url: '/top/artists',
        method:'get',
        params:{
            limit: 10
        }
    })
}

export function getSingerList(letter){
    return request({
        url: '/artist/list',
        method:'get',
        params:{
            // 按需请求
            initial: letter,
            type: -1,
            area: 7,

        }
    })
}

// 请求歌手信息
export function getSingerDetail(id){
    return request({
        url: '/artist/detail',
        method:'get',
        params:{
            id
        }
    })
}
export function getSingerAllsongs(id){
    return request({
        url: '/artist/top/song',
        method:'get',
        params:{
            id
        }
    })
}

// 请求mp3
export function getSongUrl(id){
    return request({
        url: '/song/url',
        method:'get',
        params:{
            id
        }
    })
}


export function getLyric(id){
    return request({
        url: '/lyric',
        method:'get',
        params:{
            id
        }
    })
}