<template>
  <div class="RegisterGlobal" @mouseover="hanldeEnter">
    <h2>GSAP 3 Effects Simple Demo</h2>
    <div class="box green"></div>
    <div class="box grey"></div>
    <div class="box orange"></div>
    <div class="box green"></div>
    <div class="box grey"></div>
    <div class="box orange"></div>
    <div class="box green"></div>
    <div class="box grey"></div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
gsap.registerEffect({
  name: 'fade',
  defaults: { duration: 2 }, // 默认值
  effect: (targets, config) => {
    // return gsap.to(targets, {duration: config.duration, opacity: 0});
    return gsap.fromTo(
      targets,
      { opacity: 0 },
      // fromTo中只有to的duration生效
      { duration: config.duration, opacity: 1 }
    )
  }
})
function hanldeEnter(e) {
  if (e.target.className.includes('box')) {
    let tween = gsap.effects.fade(e.target, {
      duration: 5
    })
    // 动画时长
    console.log(tween.endTime() - tween.startTime())
  }
}
</script>
<style lang="scss" scoped>
.RegisterGlobal {
  .box {
    width: 50px;
    height: 50px;
    position: relative;
    border-radius: 6px;
    margin-top: 4px;
    display: inline-block;
  }

  .green {
    background-color: #6fb936;
  }

  .orange {
    background-color: #f38630;
  }
  .grey {
    background-color: #989898;
  }
}
</style>
