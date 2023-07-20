<template>
  <div class="Flip2">
    <button id="changeLayout" class="button" @click="change">change</button>
    <div class="group" ref="group" :class="{ reorder: activeState }">
      <!-- <div class="group"> -->
      <div class="box">
        Common "FLIP" techniques employed by other tools won't work with flex
        elements because of the way browsers handle width/height.
      </div>
      <div class="box">
        Simply set <code>absolute: true</code> to have GSAP's Flip plugin make
        the elements position: absolute during the flip to work around
        challenges with flex and grid layouts.
      </div>
      <div class="box">
        When the flip animation is done, elements get reverted back to their
        normal positioning and everything appears seamless.
      </div>
      <div class="box">Happy flipping!</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
gsap.registerPlugin(Flip)
// 方法一
// function change() {
//   const group = document.querySelector('.group')
//   // 获取元素初始化状态
//   const state = Flip.getState('.group, .box')

//   // 动态添加/消除class中的reorder
//   group.classList.toggle('reorder')

//   // 添加动画
//   Flip.from(state, {
//     absolute: true,
//     duration: 0.5,
//     stagger: 0.1,
//     ease: 'power1.inOut'
//   })
// }
// 方法二
let activeState = ref(false)
async function change() {
  // 获取元素初始化状态
  const state = Flip.getState('.group, .box')
  // 动态添加/消除class中的reorder
  activeState.value = !activeState.value
  await nextTick()
  // 添加动画
  Flip.from(state, {
    // 动画期间是否使用absolute，可以是true/false，或者具体的元素
    absolute: '.box',
    duration: 0.5,
    stagger: 0.1,
    ease: 'power1.inOut'
  })
}
</script>
<style lang="scss" scoped>
.Flip2 {
  .group.reorder {
    flex-direction: row;
  }
  .group {
    width: 740px;
    height: auto;
    padding: 4px;
    background: #111;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: black;
    position: relative;
  }

  .box {
    margin: 4px;
    padding: 8px;
    font-size: 22px;
    line-height: 28px;
  }
  .box:nth-child(1) {
    background: rgba(85, 102, 205, 0.7);
  }
  .box:nth-child(2) {
    background: rgba(125, 70, 200, 0.7);
  }
  .box:nth-child(3) {
    background: rgba(33, 150, 243, 0.7);
  }
  .box:nth-child(4) {
    background: rgba(0, 188, 212, 0.7);
  }
}
</style>
