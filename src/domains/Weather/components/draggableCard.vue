<script setup lang="ts">
import type {WeatherSet} from "../store/storeTypes"
import {useWeatherStore} from "@/domains/Weather/store/weatherStore"

const props = defineProps<{
  weatherSet: WeatherSet
}>()

const weatherStore = useWeatherStore()

function delItem(id: string): void {
  weatherStore.DEL_WEATHER(id)
}

</script>

<template>
  <div class="dragableCard-wrapper">
    <div class="body">
      <div v-if="weatherSet.cityName && weatherSet.cityName !== 'nameless place'">
        {{ weatherSet.cityName }}
      </div>
      <div v-else>
        <div>lon &nbsp;{{ weatherSet.lon }}</div>
        <div>lat &nbsp;{{ weatherSet.lat }}</div>
      </div>
    </div>
    
    <div class="controls">
      <div @click="delItem(weatherSet.id)"
           class="controls__control"
      >
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
//use the flexbox
.dragableCard-wrapper {
  display: flex;
  box-sizing: border-box;
  padding: calc(var(--vt-c-common-padding) / 2);
  background-color: var(--vt-c-grey_light);
  color: var(--vt-c-grey2);
  cursor: move;
  
  
  .body {
    border-bottom: 1px solid var(--vt-c-green);
    margin: 0 var(--vt-c-common-padding);
    flex: 1;
    
    & * {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    
    & * :first-child {
  width: 48%;
    }
    & * :last-child {
      width: 48%;
    }
  }
  
  .controls {
    &__control {
      width: 30px;
      height: 30px;
      opacity: 0.87;
      cursor: pointer;
      background: url("../assets/imgs/adminImgs/trash.jpg");
      background-size: 30px 30px;
    }
  
    &__control:hover {
      opacity: 0.4;
    }
  }
}

</style>