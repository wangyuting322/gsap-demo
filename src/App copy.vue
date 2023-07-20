<script setup lang="ts">
import NumberAni from './components/gsap/NumberAni.vue'
import BoxAni from './components/gsap/BoxAni.vue'
import RegisterGlobal from './components/gsap/RegisterGlobal.vue'
import Flip1 from './components/flip/Flip1.vue'
import Flip2 from './components/flip/Flip2.vue'
import Flip3 from './components/flip/Flip3.vue'
import Flip4 from './components/flip/Flip4.vue'
import ScrollTrigger from './components/scrollTrigger/ScrollTrigger.vue'
import { ref, reactive, shallowRef } from 'vue'

// let list = reactive([{ name: '数字变化', cmp: shallowRef(NumberAni) }])
let list = [
  { name: '数字变化', cmp: NumberAni },
  { name: 'gsap.to()', cmp: BoxAni },
  { name: 'effect()', cmp: RegisterGlobal },
  { name: 'Flip1 - 元素交换位置', cmp: Flip1 },
  { name: 'Flip2 - flex布局动画', cmp: Flip2 },
  { name: 'Flip3 - 图片详情', cmp: Flip3 },
  { name: 'Flip3 - 图片放大', cmp: Flip4 },
  { name: 'ScrollTrigger - 滚动', cmp: ScrollTrigger }
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
function change() {
  let wangArr = document.querySelector('.wangArr')
  // let realArr = wangArr?.children
  let realArr = wangArr?.childNodes
  wangArr?.appendChild(realArr[0])
  // 王1，王2，王0
  let wang3 = document.createElement('div')
  let node3 = document.createTextNode('王3')
  wang3.appendChild(node3)
  wangArr?.appendChild(wang3)
  // 王1，王2，王0，王3
}
</script>

<template>
  <div class="height100 flex-col">
    <!-- <button @click="change">改变</button>
    <div class="wangArr">
      <div class="wang">你好，我是王0</div>
      <div class="wang1">你好，我是王1</div>
      <div class="wang1">你好，我是王2</div>
    </div> -->
    <nav class="flex-row pointer">
      <div
        v-for="(item, index) in list"
        :class="{ activeNav: index === activeIndex }"
        :key="index"
        :href="item.cmp.name"
        @click="changeAcctive(index)"
      >
        {{ item.name }} |
      </div>
    </nav>
    <section class="flex-col-all flex-col">
      <component :is="list[activeIndex].cmp"></component>
      <!-- <div v-for="(item, index) in list" :key="index" :id="item.cmp.name">
        <hr/>
        <div>{{ item.name }}</div>
        <component :is="item.cmp"></component>
      </div> -->
    </section>
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
</style>
