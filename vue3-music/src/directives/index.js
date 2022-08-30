import loading  from "./loading"
import loadingimg  from "./loadingimg"

export default{
    install(app){
        // 注册全局自定义指令
        app.directive("loading",loading)
        app.directive("loadingimg",loadingimg)

        // v-loading
    }
}