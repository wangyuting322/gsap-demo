<template>
  <div class="Flip">
    <div class="container flex-row flex-jc-between" @click="doFlip">
      <div class="square" id="sq1">1</div>
      <div class="square" id="sq2">2</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import Flip from 'gsap/Flip'
gsap.registerPlugin(Flip)

function doFlip() {
  // 要交换位置的元素的数组
  const squares = gsap.utils.toArray('.square')

  // 获取初始化状态
  const state = Flip.getState(squares)

  // 元素位置改变
  swap(squares)

  // 从初始化状态到最终状态的动画
  Flip.from(state, { duration: 2, ease: 'power1.inOut' })
}

/**
 * 交换元素的位置
 */
function swap([a, b]) {
  // appendChild实现节点交换位置的效果
  a.parentNode.children[0] === a
    ? a.parentNode.appendChild(a)
    : a.parentNode.appendChild(b)
}
</script>
<style lang="scss" scoped>
.Flip {
  .square {
    width: 100px;
    height: 100px;
    font-size: 3em;
    color: black;
    background-color: #88ce02;
    cursor: pointer;
  }
}
</style>
