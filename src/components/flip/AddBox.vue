<template>
  <button @click="add">+</button>
  <button @click="shuffle">打乱</button>
  <div class="AddBox flex-row">
    <div
      class="box"
      :class="item.status"
      v-for="(item, index) in layout"
      :key="item.id"
      @click="remove(item)"
    >
      {{ item.id }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
gsap.registerPlugin(Flip)
let count = 0
const wrapColor = gsap.utils.wrap(['blue', 'red', 'purple', 'orange'])
function createItem() {
  return { id: ++count, color: wrapColor(count), status: 'entered' }
}
let layout = ref([createItem(), createItem(), createItem(), createItem()])
function setLayout(v) {
  layout.value = v
}
let ctx
onMounted(() => {
  ctx = gsap.context(() => {})
})

const q = gsap.utils.selector(document)

async function add() {
  let state = Flip.getState('.box')
  setLayout([createItem(), ...layout.value])
  await nextTick()
  ctx.add(() => {
    Flip.from(state, {
      absolute: true,
      ease: 'power1.inOut',
      targets: q('.box'),
      scale: true,
      simple: true,
      onEnter: (elements) => {
        console.log(elements, 'enter')
        return gsap.fromTo(
          elements,
          {
            opacity: 0,
            scale: 0,
            rotate: 360,
            yPercent:-50
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            delay: 0.2,
            duration: 0.3
          }
        )
      }
      //   onLeave: (elements) => {
      //   console.log(elements, 'leave')
      //   return gsap.to(elements, {
      //     opacity: 0,
      //     rotate: 360,
      //     scale: 0
      //   })
      // }
    })
  })
}
async function shuffle() {
  let state = Flip.getState('.box')
  setLayout([...gsap.utils.shuffle(layout.value)])
  await nextTick()
  ctx.add(() => {
    Flip.from(state, {
      absolute: true,
      ease: 'power1.inOut',
      scale: true,
      simple: true
    })
  })
}

async function remove(item) {
  item.status = 'exiting'
  await nextTick()
  ctx.add(() => {
    gsap.to(q('.exiting'), {
      opacity:0,
      rotate: 360,
      scale: 0,
      duration: 2,
      onComplete: async() => {
        let state = Flip.getState('.box')
        setLayout(layout.value.filter((item) => item.status !== 'exiting'))
        await nextTick()
        Flip.from(state, {
          absolute: true,
          ease: 'power1.inOut',
          scale: true,
          simple: true,
          onLeave: (elements) => {
            console.log(elements, 'leave')
          }
        })
      }
    })
  })
}
onUnmounted(() => {
  ctx.revert()
})
</script>
<style lang="scss" scoped>
.AddBox {
  .box {
    color: aliceblue;
    margin: 5px;
    width: 100px;
    height: 100px;
    background-color: rebeccapurple;
  }
}
</style>
