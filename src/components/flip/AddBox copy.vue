<template>
  <button @click="add">+</button>
  <button @click="reduce">-</button>
  <div class="AddBox flex-row">
    <div class="box" v-for="(item, index) in arr" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
gsap.registerPlugin(Flip)
let arr = reactive([])
// async function add() {
//   let timestamp = Date.now()
//   arr.unshift({id:timestamp,name:timestamp})
//   await nextTick()
//   const box = gsap.utils.toArray('.box')
//   gsap.from(box[0],{
//     opacity:0,
//     scale:0.5,
//   })
// }
let ctx
onMounted(() => {
  ctx = gsap.context((self) => {
    console.log(self)
  }, '.AddBox')
})
async function add() {
  let timestamp = Date.now()
  const AddBox = gsap.utils.toArray('.AddBox')
  // await nextTick()
  const state = Flip.getState(AddBox)
  arr.unshift({ id: timestamp, name: timestamp })
  await nextTick()
  let box = gsap.utils.selector(document)('.box')
  ctx.add(() => {
    // gsap.from(box[0], {
    //   opacity: 0,
    //   scale: 0.5,
    // })
    Flip.from(state, {
      ease: 'power1.inOut',
      absolute: true,
      targets: box,
      scale: true,
      simple: true,
      onEnter: (elements) => {
        console.log(elements)
        // return gsap.from(elements, {
        //   opacity: 0,
        //   scale: 0.5
        // })
        return gsap.fromTo(elements, { 
            opacity: 0,
            scale: 0
          }, { 
            opacity: 1,
            scale: 1,
            delay: 0.2,
            duration: 0.3
          });
      },
      onLeave: elements => {
        console.log(elements);
        
          return gsap.to(elements, { 
            opacity: 0, 
            scale: 0 
          });
        }
    })
  })

  // const AddBox = gsap.utils.toArray('.AddBox')
  // await nextTick()
  // const state = Flip.getState(AddBox)
  // let timestamp = Date.now()
  // arr.unshift({ id: timestamp, name: timestamp })
  // await nextTick()
  // // box[0]
  // // gsap.from(box[arr.length-1],{
  // // gsap.from(box[0],{
  // //   opacity:0,
  // //   scale:0.5,
  // //   absolute:true
  // // })
  // gsap.from('.box:first-child', {
  //   opacity: 0,
  //   scale: 0.5
  // })

  // Flip.from(state, {
  //   duration: 0.5,
  //   targets:'.box',
  //   ease: 'power1.inOut'
  //   // scale: true,
  //   // simple: true,
  // })
}
async function reduce() {
  const box = gsap.utils.toArray('.box')
  const state = Flip.getState(box)
  arr.pop()
  await nextTick()
  Flip.from(state, {
    duration: 0.5,
    ease: 'power1.inOut',
    yPercent: 20,
    opacity: 0
  })
}
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
