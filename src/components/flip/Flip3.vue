<template>
  <div class="Flip3">
    <div class="gallery">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="item"
        :class="{ activeItem: index === activeItem.index }"
        :data-title="item.title"
        :data-secondary="item.secondary"
        :data-text="item.text"
        @click="showDetails(item, index)"
      >
        <img :src="item.src" alt="" />
      </div>
    </div>
    <div class="detail" v-show="activeItem.show" @click="hideDetails">
      <img v-if="activeItem.src" :src="activeItem.src" alt="" @load="onLoad" />
      <div class="content">
        <div class="title">{{ activeItem.title }}</div>
        <div class="secondary">{{ activeItem.secondary }}</div>
        <div class="description">
          {{ activeItem.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
gsap.registerPlugin(Flip)

let dataList = [
  {
    title: 'Owl',
    secondary: 'Hoo are you?',
    text: 'Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png'
  },
  {
    title: 'Deer',
    secondary: 'Hi deer.',
    text: 'Deer lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-deer.png'
  },
  {
    title: 'Hipster',
    secondary: "What's new?",
    text: 'Deer lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-hipster.png'
  },
  {
    title: 'Ram',
    secondary: 'I just drank a Mountain Dew.',
    text: 'Ram lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-ram.png'
  },
  {
    title: 'Dog',
    secondary: "I'm trying to sleep here.",
    text: 'Dog lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-dog.png'
  },
  {
    title: 'Bored Ram',
    secondary: 'No time for you.',
    text: 'Ram side lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-sideram.png'
  },
  {
    title: 'Super Ram',
    secondary: "I'm trying to sleep here.",
    text: 'Gorrilla lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-multiram.png'
  },
  {
    title: 'Bird',
    secondary: "I'm just here to chill.",
    text: 'Birb lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-bird.png'
  },
  {
    title: 'Gorilla',
    secondary: 'I can fit a whole watermelon in my mouth.',
    text: 'Dog lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.',
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-gorilla.png'
  }
]
let items = null
let details = null
let detailContent = null
let detailImage = null
let activeItem = ref({
  show: false,
  index: -1,
  tl: null,
  title: '',
  secondary: '',
  text: '',
  src: ''
})
let onLoad = async () => {
  let index = activeItem.value.index
  // 第一步先让元素渲染出来
  activeItem.value.show = true
  await nextTick()
  details = document.querySelector('.detail')
  detailContent = document.querySelector('.content')
  detailImage = document.querySelector('.detail img')
  let itemNode = document.querySelector(
    `.gallery .item:nth-child(${index + 1}) img`
  )
  gsap.set(details, {
    visibility: 'hidden',
    overflow: 'hidden'
  })
  // 第一步，先让详情中的图片fit当前高亮的图片
  Flip.fit(details, itemNode, { scale: true, fitChild: detailImage })
  // 第二步，将当前状态认定为初始状态
  const state = Flip.getState(details)
  // 第三步，让详情的说明内容先隐藏 - 这个时候整个详情还没显示， 还是hidden状态
  gsap.set(detailContent, { yPercent: 100 })
  // 第四步，清空其他的状态
  gsap.set(details, { clearProps: true }) // wipe out all inline stuff so it's in the native state (not scaled)
  // 第五步，元素显示
  gsap.set(details, {
    visibility: 'visible',
    overflow: 'hidden'
  })
  await nextTick()
  Flip.from(state, {
    duration: 0.5,
    ease: 'power2.inOut',
    scale: true,
    onComplete: () => gsap.set(details, { overflow: 'auto' }) // to permit scrolling if necessary
  }).to(detailContent, { yPercent: 0 }, 0.5)
}
/**
 * 展示详情
 * @param item
 * @param index
 */
async function showDetails(item, index) {
  if (activeItem.value.index === index) {
    onLoad()
  } else {
    // 修改文本
    activeItem.value = {
      show: false,
      ...item,
      index
    }
  }
  await nextTick()
  // 除了高亮的项之外，其他的都变暗
  let activeItemNode = document.querySelector('.activeItem')
  gsap
    .to(items, {
      opacity: 0.3,
      stagger: { amount: 0.7, from: index, grid: 'auto' }
    })
    .kill(activeItemNode)
}

function hideDetails() {
  details = document.querySelector('.detail')
  detailContent = document.querySelector('.content')
  detailImage = document.querySelector('.detail img')
  gsap.set(details, { overflow: 'hidden' })

  // 记录最初的状态
  const state = Flip.getState(details)
  let activeItemNode = document.querySelector('.activeItem')
  // 让详情的图片fit高亮的图片
  Flip.fit(details, activeItemNode, { scale: true, fitChild: detailImage })
  // 时间线
  const tl = gsap.timeline()
  tl.set(details, { overflow: 'hidden' })
    .to(detailContent, { yPercent: 100 })
    .to(items, {
      opacity: 1,
      stagger: { amount: 0.7, from: activeItem.value.index, grid: 'auto' }
    })

  // animate from the original state to the current one.
  Flip.from(state, {
    scale: true,
    duration: 0.5,
    delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
    onInterrupt: () => tl.kill()
  }).set(details, {
    visibility: 'hidden',
    onComplete: () => {
      // 效果结束之后设置show为false
      activeItem.value.show = false
    }
  })

  activeItemNode = null
}

onMounted(() => {
  items = gsap.utils.toArray('.item')

  // Intro animation
  gsap.from('.item', { autoAlpha: 0, yPercent: 30, stagger: 0.04 })
})
</script>
<style lang="scss" scoped>
.Flip3 {
  height: 60vmin;
  width: 60vmin;
  position: relative;
  overflow: hidden;

  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2% 3.6%;
    padding: 10px;
  }

  .item {
    cursor: pointer;
    img {
      width: 100%;
    }
  }

  .detail {
    position: absolute;
    background-color: #fff;
    top: 0px;
    left: 0px;
    height: 60vmin;
    width: 60vmin;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    overflow: auto;
    align-items: center;
    z-index: 999999;
    img {
      width: 100%;
      height: 100%;
    }
    .content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #232323;
      padding: 2rem 1.5rem;
      font-size: 1rem;
      box-sizing: border-box;
      flex-grow: 1;
    }
    .content > * {
      margin-bottom: 1rem;
      color: lightgray;
    }
    .title {
      font-size: 2rem;
      text-transform: uppercase;
    }

    .secondary {
    }

    .description {
      line-height: 1.5;
    }
  }
}
</style>
