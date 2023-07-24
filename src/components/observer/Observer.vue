<template>
  <div class="Observer">
    <!-- 顶部固定 -->
    <header>
      <div>Animated Sections</div>
      <div>
        <a href="https://codepen.io/BrianCross/pen/PoWapLP"
          >Original By Brian</a
        >
      </div>
    </header>
    <section
      :class="`${item.className} ${
        activeIndex === index ? 'active-section' : ''
      }`"
      v-for="(item, index) in dataLists"
      :key="index"
    >
      <h2 class="section-heading">{{ item.content }}</h2>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { gsap } from 'gsap'
import Observer from 'gsap/Observer'

gsap.registerPlugin(Observer)
let dataLists = [
  {
    className: 'first',
    content: 'scroll down first'
  },
  {
    className: 'second',
    content: 'Animated with GSAP second'
  },
  {
    className: 'third',
    content: 'Animated with GSAP third'
  },
  {
    className: 'fourth',
    content: 'Animated with GSAP fourth'
  },
  {
    className: 'fifth',
    content: 'Animated with GSAP fifth'
  }
]
let lastIndex = ref(-1)
let activeIndex = ref(0)
let isAni = false
// 向上滚动
function aniPre() {
  isAni = true
  let lastClassName = dataLists[lastIndex.value].className
  let className = dataLists[activeIndex.value].className
  gsap.set(`.${className}`, {
    visibility: 'visible',
    zIndex: 2
  })
  let tl = gsap.timeline({
    duration: 1.5,
    onComplete: () => {
      isAni = false
      gsap.set(`.${lastClassName}`, {
        yPercent: 0,
        zIndex: 0
      })
      gsap.set(`.${className}`, { zIndex: 1 })
    }
  })
  tl.fromTo(
    `.${className}`,
    {
      yPercent: -100
    },
    {
      yPercent: 0,
      duration: 1.5,
    }
  ).fromTo(
    `.${lastClassName}`,
    {
      yPercent: 0
    },
    {
      yPercent: 10,
      duration: 1.5,
    },
    '<0'
  )
}
// 向下滚动
function aniNext() {
  isAni = true
  let lastClassName = dataLists[lastIndex.value].className
  let className = dataLists[activeIndex.value].className
  gsap.set(`.${className}`, { visibility: 'visible', zIndex: 2 })
  let tl = gsap.timeline({
    onComplete: () => {
      isAni = false
      gsap.set(`.${lastClassName}`, {
        zIndex: 0
      })
      gsap.set(`.${className}`, { zIndex: 1 })
    }
  })
  tl.fromTo(
    `.${className}`,
    {
      yPercent: 100
    },
    {
      yPercent: 0,
      duration: 1.5,
    }
  ).fromTo(
    `.${lastClassName}`,
    {
      yPercent: 0
    },
    {
      yPercent: -10,
      duration: 1.5,
    },
    '<0'
  )
}
function previous() {
  lastIndex.value = activeIndex.value
  activeIndex.value--
  if (activeIndex.value < 0) {
    activeIndex.value = dataLists.length - 1
  }
  aniPre()
}
function next() {
  lastIndex.value = activeIndex.value
  activeIndex.value++
  if (activeIndex.value >= dataLists.length) {
    activeIndex.value = 0
  }
  aniNext()
}
onMounted(() => {
 
  let wrapper =  gsap.utils.wrap(["red", "green", "yellow"], 5);

//now we just feed an index number into the function we got back from the line above and we'll get the corresponding value from the wrapped Array
  console.log(wrapper);
  
  Observer.create({
    target: '.Observer', // can be any element (selector text is fine)
    type: 'wheel,touch', // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
    onUp: () => !isAni && previous(),
    onDown: () => !isAni && next()
  })
  let className = dataLists[activeIndex.value].className
  gsap.set(`.${className}`, { visibility: 'visible' })
})
</script>
<style lang="scss" scoped>
.Observer {
  position: relative;
  height: 80vh;
  overflow: hidden;
  $bg-gradient: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );

  * {
    box-sizing: border-box;
    user-select: none;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  header {
    background-color: orange;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    width: 100%;
    z-index: 3;
    height: 10vh;
    font-size: clamp(0.66rem, 2vw, 1rem);
    letter-spacing: 0.5em;
  }
  section {
    height: 70vh;
    width: 100%;
    top: 10vh;
    position: absolute;
    color: #fff;
    visibility: hidden;
    overflow: hidden;
    z-index: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-size: cover;
    background-position: center;

    h2 {
      z-index: 2;
    }
  }

  .first {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920);
  }

  .second {
    background-image: $bg-gradient,
      url('https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920');
  }

  .third {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920);
  }

  .fourth {
    background-image: $bg-gradient,
      url(https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920);
  }

  .fifth {
    background-image: $bg-gradient,
      url('https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75w=1920');
    background-position: 50% 45%;
  }

  h2 * {
    will-change: transform;
  }
}
</style>
