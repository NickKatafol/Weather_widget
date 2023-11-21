<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'
import SimpleMessenger from '@/features/simpleMesseger/SimpleMessenger.vue'

let isFirstVisit = true

if(isFirstVisit) {
  useRouter().push('/about')
  isFirstVisit = false
}

</script>


<template>
  <suspense>
    <RouterView/>
  </suspense>
  
  <SimpleMessenger/>
</template>

<style scoped lang="scss">
header {
  border-bottom: var(--vt-c-grey) 1px solid;
}

</style>
