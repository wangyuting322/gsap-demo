<template>
  <div class="ImageShrink">
    <img
      class="thumbnail"
      data-flip-id="img"
      src="https://placehold.co/200x200"
    />

    <div class="container">
      <img
        class="full-size"
        data-flip-id="img"
        src="https://placehold.co/600x600"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
gsap.registerPlugin(Flip)

onMounted(() => {
  const fullSize = document.querySelector('.full-size'),
    thumbnail = document.querySelector('.thumbnail')
  document.addEventListener('click', () => {
    const state = Flip.getState('.thumbnail, .full-size')

    fullSize.classList.toggle('active')
    thumbnail.classList.toggle('active')

    Flip.from(state, {
      duration: 0.6,
      fade: true,
      absolute: true,
      toggleClass: 'flipping',
      ease: 'power1.inOut'
    })
  })
})
</script>
<style lang="scss" scoped>
.ImageShrink {
  .container {
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: fixed;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    pointer-events: none;
  }

  .full-size {
    flex-shrink: 0;
    flex-grow: 0;
    height: 100%;
    display: none;
  }
  .full-size.active {
    display: block;
  }
  .thumbnail.active {
    visibility: hidden;
  }
  .thumbnail,
  .thumbnail.flipping {
    visibility: visible;
  }
}
</style>
