<template>
  <div>
    <div class="ScrollTrigger">
      <div class="trigger">
        <div class="box"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      scroller:'.ScrollTrigger',
      trigger: '.trigger',
      start: 'top top',
      // start: 70,
      // end: '+=500',
      end: '+=100',
      // end: '+=1000',
      // end:70,
      // ScrollTriggers可以在进入/离开定义的区域时对动画执行操作（播放，暂停，恢复，重新启动，反转，完成，重置），或将其直接链接到滚动条，使其像洗涤器一样起作用（）
      scrub: 1, // true | false | Number
      // pin: true,
      markers: false
    }
  })
  tl.to('.box', { yPercent: 50, duration: 1 })
  tl.to('.box', { rotation: 360, duration: 3 })
  tl.to('.box', { xPercent: 50, duration: 1 })
})
</script>
<style lang="scss" scoped>
.ScrollTrigger {
  height: 50vh;
  overflow: auto;
  position: relative;
  .trigger {
    position: absolute;
    top: 5vh;
    left: 0;
    width: 100vw;
    height: 60vh;
    background-color: lightgray;
    padding: 20px;
    box-sizing: border-box;
  }
  .box {
    background-color: black;
    width: 10vw;
    height: 10vw;
  }
}
</style>
