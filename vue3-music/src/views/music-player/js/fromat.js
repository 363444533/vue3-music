export function fromatTime(time){
    time = time | 0
    let m = String((time / 60) | 0).padStart(2,0)
    let s = String(time % 60).padStart(2,0)
    return `${m}:${s}`
}

export function formatLyric(str){
    return str.split(/\n/).filter(item => item !== "").map((item)=>{
        let [,time,lyric] = item.split(/\[|\]/g)
        time = time.split(":")[0]*60+time.split(":")[1]*1
        return {time,lyric}
    });
}