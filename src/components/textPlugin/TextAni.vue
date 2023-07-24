<template>
  <div class="TextAni">
    <span class="class1">
      This is the old text
    </span>
    <button @click="ani">动画</button>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
let mark = true

gsap.registerPlugin(TextPlugin)

function ani() {
  mark = !mark
  //replaces yourElement's text with "This is the new text" over the course of 2 seconds
  gsap.to('.class1', {
  // gsap.to(mark?'.class2':'.class1', {
    duration: 1,
    text:{
      value: !mark
      ? 'This is the new text'
      : `This is the old text`,
      // 应该用于拆分文本的字符。默认值为 ，因此每个字符都是隔离的，但如果您希望逐字制作动画，则可以使用空格字符，例如""
      // delimiter: " ",
      delimiter: "",
      // newClass: "class2",
      // oldClass: "class1"
      type: "diff"
    },
    ease: 'none'
  })
}
</script>
<style lang="scss" scoped>
.TextAni {
  #quote {
    font-size: 44px;
    line-height: 50px;
    color: #dedede;
  }
}
</style>
