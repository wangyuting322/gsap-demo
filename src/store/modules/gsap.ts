import { defineStore } from 'pinia'

export const gsapUseStore = defineStore('gsapStore', {
  state: () => ({
    // 是否页面加载动画结束 - 路由页面可以开始加载动画的标志
    isLoaded: false
  }),
  getters: {
    // finishedTodos(state) {
    //   // 自动完成! ✨
    //   return state.todos.filter((todo) => todo.isFinished)
    // },
    // unfinishedTodos(state) {
    //   return state.todos.filter((todo) => !todo.isFinished)
    // },
    // /**
    //  * @returns {{ text: string, id: number, isFinished: boolean }[]}
    //  */
    // filteredTodos(state) {
    //   if (this.filter === 'finished') {
    //     // 自动调用其他 getter ✨
    //     return this.finishedTodos
    //   } else if (this.filter === 'unfinished') {
    //     return this.unfinishedTodos
    //   }
    //   return this.todos
    // },
  },
  actions: {
    changeIsLoad(isLoaded:boolean) {
      this.isLoaded = isLoaded
    }
  }
})
