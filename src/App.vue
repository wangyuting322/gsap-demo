<script setup lang="ts">
import gsap from 'gsap'
import {gsapUseStore} from '@/store/modules/gsap'
let gsapStore=gsapUseStore()
function enter(el, done) {
  gsap.set(el, { autoAlpha: 0, scale: 0.8, xPercent: -100 })
  gsap
    .timeline({
      paused: true,
      onComplete() {
        gsapStore.changeIsLoad(true)
        done()
      }
    })
    .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.5 })
    .to(el, { scale: 1, duration: 0.5 })
    .play()
  }
  function leave(el, done) {
  gsapStore.changeIsLoad(false)
  gsap
    .timeline({ paused: true, onComplete: done })
    .to(el, { scale: 0.8, duration: 0.2 })
    .to(el, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
    .play()
}
</script>

<template>
  <div class="height100 flex-col">
    <router-link to="/gsap">gsap</router-link>
    <router-link to="/flip">flip</router-link>
    <router-link to="/scrollTrigger">scrollTrigger</router-link>
    <router-link to="/observer">observer</router-link>
    <router-link to="/splitText">splitText</router-link>
    <!-- 使用动态过渡名称 -->
    <router-view v-slot="{ Component }" class="flex-col-all">
      <transition @enter="enter" @leave="leave" name="routes" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
nav {
  div {
    font-size: 18px;
    margin: 5px;
    transition: all 500ms;
  }
  .activeNav {
    color: red;
  }
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-leave-to {
  transform: translateX(-100%);
  position: absolute;
}
.slide-right-enter-active,
.slide-right-leave-active {
  position: absolute;
  transition: all 3.5s;
}
.slide-left-enter-from {
  position: absolute;
  transform: translateX(-100%);
}
.slide-left-leave-to {
  position: absolute;
  transform: translateX(100%);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 3.5s;
}
// .slide-right-enter-from,.slide-right-leave-to{
//   transform: translateX(100%);
//   position: absolute;
// }
// .slide-right-enter-active,.slide-right-leave-active{
//   transition: all .5s;
// }
// .slide-left-enter-from,.slide-left-leave-to{
//   position: absolute;
//   transform: translateX(-100%);
// }
// .slide-left-enter-active,.slide-left-leave-active{
//   transition: all .5s;
// }
</style>
