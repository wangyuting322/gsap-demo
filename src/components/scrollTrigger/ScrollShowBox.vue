<template>
  <div class="scrollShowBox">
    <div class="scrollWrapper">
      <div class="scrollContent">
        <div v-for="(item, index) in 20" :key="index" class="box"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ScrollShowBox">
import { ref, reactive } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
gsap.registerEffect({
  name: 'wang',
  defaults: { index:0 }, // 默认值
  effect: (targets, config) => {
    let index = config.index
    return gsap.from(targets, {
      scale: 0.5,
      rotate: 360,
      xPercent: index % 2 ? -100 : 100,
      opacity:0
    })
  }
})
onMounted(() => {
  let boxArr = gsap.utils.toArray('.box')
  boxArr.forEach((item, index) => {
    // gsap.from(item,{
    //   scale:0.5,
    //   rotate:360,
    //   xPercent:index%2?-100:100,
    //   scrollTrigger:{
    //     trigger:item,
    //     scroller: ".scrollWrapper",
    //     start:'-200% 0%',
    //     end:'top 0%',
    //     markers:true,
    //     scrub:1
    //   }
    // })
    ScrollTrigger.create({
      trigger: item,
      scroller: '.scrollWrapper',
      start: '-300% 0%',
      end: 'top 0%',
      markers: false,
      scrub: 1,
      animation:gsap.effects.wang(item,{index}),
    })
  })
})
</script>
<style lang="scss" scoped>
.scrollShowBox {
  .scrollWrapper {
    height: 80vh;
    overflow: auto;
  }
  .scrollContent {
    background-color: yellowgreen;
    &::before,
    &::after {
      content: '';
      display: table;
      clear: both;
    }
    .box {
      width: 100px;
      height: 100px;
      background-color: orangered;
      margin: 20px;
      float: left;
      clear: both;
      &:nth-child(2n) {
        float: right;
      }
    }
  }
}
</style>
