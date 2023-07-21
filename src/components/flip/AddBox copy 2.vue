<template>
  <button @click="add">+</button>
  <button @click="shuffle">打乱</button>
  <div class="AddBox flex-row">
    <div
      class="box"
      v-for="(item, index) in layout.items"
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
let layout = ref({
  items: [createItem(), createItem(), createItem(), createItem()]
})
function setLayout(v) {
  layout.value = v
}
let ctx
onMounted(() => {
  ctx = gsap.context(() => {})
})

const q = gsap.utils.selector(document)

async function add() {
  await nextTick()
  setLayout({
    state: Flip.getState(q('.box')),
    items: [createItem(), ...layout.value.items]
  })
}
async function shuffle() {
  await nextTick()
  setLayout({
    state: Flip.getState(q('.box')),
    items: [...gsap.utils.shuffle(layout.value.items)]
  })
}

async function remove(item) {
  // set the item as exiting which will add a CSS class for display: none;
  item.status = 'exiting'
  setLayout({
    items: layout.value.items.filter((item) => item.status!=='exiting'),
    state: Flip.getState(q('.box'))
  })
}
function removeItems(exitingItems) {
  if (!exitingItems.length) return
  setLayout({
    state: Flip.getState(q('.box')),
    items: layout.value.items.filter((item) => item.status!=='exiting')
  })
}
watch(
  layout,
  (newV) => {
    if (!layout.value.state) return
    // get the items that are exiting in this batch
    const exiting = layout.value.items.filter(
      (item) => item.status === 'exiting'
    )
    ctx.add(async () => {
      await nextTick()
      // Flip.from returns a timeline
      const timeline = Flip.from(layout.value.state, {
        absolute: true,
        ease: 'power1.inOut',
        targets: q('.box'),
        scale: true,
        simple: true,
        onEnter: (elements) => {
          console.log(elements,'enter');
          
          return gsap.fromTo(
            elements,
            {
              opacity: 0,
              scale: 0
            },
            {
              opacity: 1,
              scale: 1,
              delay: 0.2,
              duration: 0.3
            }
          )
        },
        onLeave: (elements) => {
          return gsap.to(elements, {
            opacity: 0,
            rotate:360,
            scale: 0
          })
        }
      })

      // remove the exiting items from the DOM after the animation is done
      timeline.add(() => removeItems(exiting))
    })
  },
  { deep: true }
)
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
