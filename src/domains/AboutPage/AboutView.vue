<script setup lang="ts">
import {taskText} from "./assets/taskText"
import {useRouter, useRoute} from "vue-router"
import { RouterLink } from 'vue-router'

const router = useRouter()
const route = useRoute()

</script>


<template>
  <div class="about-wrapper">
    <header>
      <h1># ABOUT</h1>
      <div @click="router.push('/')" class="header__cross-btn"></div>
    </header>
  
    <article v-html="taskText">
    </article>
  
    <footer>
      <div @click="$router.push('/')"
           class="controller_open-space"
      >
        BACK to Home
      </div>
    </footer>
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/CSS/utils.scss";

.about-wrapper {
  box-sizing: border-box;
  padding: 0 calc(var(--vt-c-common-padding)*2);
  max-width: rem(700);
  margin: calc(var(--vt-c-common-padding)*2) auto;
  border-left: var(--vt-c-blue_dark) 1px solid;
  
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .header__cross-btn {
      width: rem(30);
      height: rem(30);
      margin-left: auto;
      cursor: pointer;
      background-image: url("@/domains/AboutPage/assets/imgs/adminImgs/close.svg");
      background-repeat: no-repeat;
      background-size: rem(30) rem(30);
      border-right: var(--vt-c-blue_dark) 1px solid;
      padding-right: var(--vt-c-common-padding);
    }

    .header__cross-btn:hover {
      opacity: 0.2;
    }
  }

  article {
    white-space: pre-wrap;
  }
  
  footer {
    margin-top: calc(var(--vt-c-common-padding)*2);
  }
}

</style>
