<template>
  <div class="TextAni">
    <div id="quote">
      SplitText makes it easy to break apart the text in an HTML element so that
      each character, word, and/or line is wrapped in its own div tag.
    </div>
    <button @click="ani">动画</button>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import gsap from 'gsap'
// import { SplitText } from 'gsap/all'
// gsap.registerPlugin(SplitText)
let tl = gsap.timeline()
let mySplitText, chars

gsap.set('#quote', { perspective: 400 })

// onMounted(() => {
//   ;(mySplitText = new SplitText('#quote', { type: 'words,chars' })),
//     (chars = mySplitText.chars) //an array of all the divs that wrap each character
//   console.log(chars)
//   tl.from(chars, {
//     duration: 0.8,
//     opacity: 0,
//     scale: 0,
//     y: 80,
//     rotationX: 180,
//     transformOrigin: '0% 50% -50',
//     ease: 'back',
//     stagger: 0.01
//   })
// })
function ani() {
  tl.restart()
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
