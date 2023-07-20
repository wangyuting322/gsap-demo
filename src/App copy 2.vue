<script setup lang="ts">
import { ref, nextTick } from 'vue'

let show = ref(false)
function changeShow() {
  show.value = !show.value
}
let showRouter = ref(true)
async function changRoute() {
  showRouter.value = false
  await nextTick()
  showRouter.value = true
}
</script>

<template>
  <div class="height100 flex-col">
    <button @click="changeShow">55</button>
    <transition name="slide-left">
      <div v-show="show">hello</div>
    </transition>
    <router-link to="/gsap" @change="changRoute">gsap</router-link>
    <router-link to="/flip">flip</router-link>
    <!-- 使用动态过渡名称 -->
    <router-view v-slot="{ Component, route }" class="flex-col-all">
      <transition :name="route.meta.transition">
        <component :is="Component" v-show="showRouter" />
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
