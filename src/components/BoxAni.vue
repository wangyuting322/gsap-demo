<template>
  <div class="BoxAni">
    <div class="box green"></div>
    <div class="box purple"></div>
    <div class="box purple"></div>
    <div class="box blue"></div>
    <div class="box pink">timeLine1</div>
    <div class="box orange">timeLine2</div>
    <hr />
    <ul class="flex-row">
      <li class="box1">1</li>
      <li class="box1">2</li>
      <li class="box1">3</li>
    </ul>
    <div class="random1">random1</div>
    <div class="random2">random2</div>

    <div class="flex-row flex-wrap ul2">
      <div class="box2" v-for="i in 9" :key="i">{{ i }}</div>
    </div>
    <div class="flex-row">
      <button @click="controls('play')">开始</button>
      <button @click="controls('pause')">暂停</button>
      <button @click="controls('resume')">继续</button>
      <button @click="controls('reverse')">反转</button>
      <button @click="controls('restart')">重新开始</button>
      <button @click="controls('progressMediuem')">进度-中间</button>
      <button @click="controls('progressEnd')">进度-结束</button>
    </div>
  </div>
</template>
<script setup lang="ts" name="BoxAni">
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'
let tween = null
onMounted(() => {
  gsapTo()
  gsapFrom()
  gsapFromTo()
  gsapTImieline()
  groupAnis()
  randomAni()
  staggerAni()
})
/**
 * gsap.to()
 */
function gsapTo() {
  tween = gsap.to('.green', {
    // 旋转
    rotation: 360,
    // 动画的持续时间(秒)。默认值:0.5.
    duration: 5,
    // 动画开始前的延迟时间(秒)。
    delay: 2,
    // https://greensock.com/docs/v3/Eases，控制动画期间的变化率，给它一种特殊的感觉。举个例子，"elastic"或者"strong.inOut"。参见轻松可视化工具获取所有选项的列表。ease可以是字符串(最常见)或函数，接受0到1之间的进度值，并返回转换后的类似规范化值。默认值:"power1.out".
    ease: 'elastic',
    // 如果true，动画将在创建后立即暂停。默认：false
    paused: true
  })
}
/**
 * gsap.from()
 */
function gsapFrom() {
  let tween = gsap.from('.purple', { rotation: -360, x: -100, duration: 1 })
  // console.log(tween.startTime())
  // console.log(tween.endTime())
  // 用时一秒
}
/**
 * gsap.fromTo()
 */
function gsapFromTo() {
  let tween = gsap.fromTo(
    '.blue',
    { x: -100, y: -100 },//from处设置duration无效
    { rotation: 360, x: 100, y: 100, duration:5 }
  )
  console.log(tween.endTime()-tween.startTime())
  // 用时5秒
}
/**
 * gsap.timeline
 */
function gsapTImieline() {
  let tl = gsap.timeline()
  tl.to('.pink', { x: 100 })
    .to('.pink', { y: 100 })
    .to('.orange', { rotate: 360 })
    // console.log(tl.endTime()-tl.startTime())
    // 用时1.5s，每一段默认0.5s
}
/**
 * 一系列元素
 */
function groupAnis() {
  // gsap.to('.box1', {
  let tween = gsap.to('li', {
    x: -10,
    y: function (index, target, targets) {
      return index * 50
    },
    delay: function (index) {
      return index * 1
    },
    duration: 1
  })
  // 杀死动画进程 - 可指定，可以是数组
  tween.kill('li:nth-child(2n)')
  // console.log(tween.endTime()-tween.startTime())
  // 每个元素用时1s，，两个元素，加上延时，一共3秒
}
/**
 * random函数
 */
function randomAni() {
  gsap.to('.random1', {
    // 0-100之间的数，且四舍五入到5的倍数
    x: 'random(-100, 100, 5)'
  })
  gsap.to('.random2', {
    // 从数组中随机选择一个项
    x: 'random([0, 100, 200, 500])'
  })
}
/**
 * staggerAni
 */
function staggerAni() {
  gsap.from('.box2', {
    // 如果定义了多个目标，则可以通过设置类似（每个开始时间之间的 0.1 秒）的值轻松错开每个目标的开始时间。或者，您可以使用交错对象获得更高级的交错。有关详细信息，请参阅交错文档。stagger: 0.1
    stagger:0.1,
    yPercent:30,
    opacity:0.5
  })
}
/**
 * 实例控制
 */
function controls(type) {
  switch (type) {
    case 'play':
      tween?.play()
      break
    case 'pause':
      tween?.pause()
      break
    case 'resume':
      tween?.resume()
      break
    case 'reverse':
      tween?.reverse()
      break
    case 'restart':
      tween?.restart()
      break
    case 'progressMediuem':
      tween?.progress(0.5)
      break
    case 'progressEnd':
      tween?.progress(1)
      break
    default:
      break
  }
}
</script>
<style lang="scss" scoped>
.BoxAni {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  flex-direction: column;
  .box {
    height: 100px;
    width: 100px;
    border-radius: 5px;
  }
  .box1,
  .random1,
  .random2 {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    border: 2px solid black;
  }
  .ul2{
    width: 200px;
  }
  .box2{
    height: 50px;
    width: 50px;
    border-radius: 5px;
    border: 2px solid black;
    background-color: olive;
    margin: 5px;
  }
  .green {
    background-color: green;
  }
  .purple {
    background-color: purple;
  }
  .blue {
    background-color: blue;
  }
  .pink {
    background-color: pink;
  }
  .orange {
    background-color: orange;
  }
}
</style>
