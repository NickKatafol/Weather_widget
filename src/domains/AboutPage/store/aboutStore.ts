import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//It's all is for project structure example.   <<

export const useAboutStore = defineStore('counter', () => {
  // const count = ref(0)                                   //state
  // const doubleCount = computed(() => count.value * 2)    //getter
  // function increment() {                                 //action
  //   count.value++
  // }
  //
  // return { count, doubleCount, increment }
})

