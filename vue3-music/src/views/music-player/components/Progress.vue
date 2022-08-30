<template>
  <div class="p-progress-inner" ref="proBarWrapRef" @click.stop="hanleclickprogress">
      <!-- 当前已经播放进度条 -->
    <div class="p-progress-play" ref="proPlayRef" :style="proPlayStyle"> 
      <div class="slider"
      @touchstart.prevent="touchStartProgress"
      @touchmove.prevent="touchMoveProgress"
      @touchend.prevent="touchEndProgress"
      :style="sliderStyle"
      >
          <i class="slider-btn"
          ref="sliderBtnRef"
          ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, onMounted, watch} from "vue"
const props = defineProps(["progress"])
const emits = defineEmits(["progressMove","progresEnd"])
const touch = {}
const offsetW = ref(0)

const proBarWrapRef = ref(null)
const proBarWrapWidth = ref(0)
// 进度条
const proPlayRef = ref(null)
const proPlayStyle = computed(()=>`width:${offsetW.value}px;`)
//  滑块
const sliderBtnRef = ref(null)
const sliderStyle = computed(()=>`transform:translateX(${offsetW.value}px);`)
onMounted(()=>{
  proBarWrapWidth.value = proBarWrapRef.value.offsetWidth
})

watch(()=>props.progress,(newRatio)=>{
 
  offsetW.value = props.progress * proBarWrapWidth.value
})
function touchStartProgress(e){
  touch.x1 = e.touches[0].pageX
  touch.initW = proPlayRef.value.offsetWidth
}

function touchMoveProgress(e){
  let xDiff = e.touches[0].pageX-touch.x1
  xDiff = xDiff
  offsetW.value = xDiff  + touch.initW
  if(offsetW.value<0)
  offsetW.value = 0
  if(offsetW.value>proBarWrapWidth.value)
  offsetW.value = proBarWrapWidth.value
  let progtessRatio = offsetW.value / proBarWrapWidth.value
  emits("progressMove",progtessRatio)
}

function touchEndProgress(e){
  let progtessRatio = offsetW.value / proBarWrapWidth.value
  emits("progressEnd",progtessRatio)

}
function hanleclickprogress(e){
  let offsetWidth = Math.min(e.offsetX,proBarWrapWidth.value)
  let progtessRatio = offsetWidth / proBarWrapWidth.value
  emits("progressEnd",progtessRatio)
}

</script>

<style lang="less" scoped>
.p-progress-inner {
  position: relative;
  flex: 1;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.3); 
//   .p-progress-load {
//     position: absolute;
//     height: 100%;
//   }
  .p-progress-play {
    position: absolute;
    height: 100%;
    background: #f0d0e0;
  }
  .slider {
    position: absolute;
    left: -7px;
    top: -13px;
    height: 30px;
    width: 30px;
    .slider-btn{
        position: absolute;
        top: 7px;
        left: 7px;
        width: 16px;
        height: 16px;
        box-sizing:border-box;
        border: 3px solid #fff;
        border-radius: 8px;
        background-color: @danhui;
    }
  }
}
</style>