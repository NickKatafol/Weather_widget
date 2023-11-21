<script setup lang="ts">
import {computed, toRefs} from "vue"
import {useWeatherStore} from './store/weatherStore'
import Settings from './components/Settings.vue'
import GridCard from '../../components/gridCard/GridCard.vue'
import {fetchInitialWeatherData} from "@/domains/Weather/utils/pageHeldlers";

const weatherStore = useWeatherStore()

if(!weatherStore.GET_WEATHER_SETS.length)
  fetchInitialWeatherData()

</script>


<template>
  <div class="weather-wrapper">
    <h1 @click="$router.push('/about')" title="about this Demo">Weather</h1>

    <Settings class="weather__settings"/>

    <GridCard v-for="(weatherSet, ind) of weatherStore.GET_WEATHER_SETS"
                 :key="'weather' + ind"
                 :cellSets="weatherSet.getCardCells()"
                 class="weather__card"
    />
    <div v-if="!weatherStore.GET_WEATHER_SETS.length" class="weather__loading">
       {{
        weatherStore.isWeatherFetched ?
          `no chosen places \n point a certain please via gear-button` :
          `loading... \n wait please`
        }}
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/CSS/utils.scss";

.weather-wrapper {
  position: relative;
  margin: var(--vt-c-common-padding) auto;
  max-width: 30rem;
  width: 100%;
  min-height: 40rem;
  height: min-content;
  box-sizing: border-box;
  padding: var(--vt-c-common-padding);

  border: var(--vt-c-blue_dark) 1px solid;

  h1 {
    width: min-content;
    color: var(--vt-c-green);
    cursor: pointer;
  }

  .weather__settings {
    position: absolute;
    top: 0;
    right: 0;
  }

  .weather__card:not(:first-child) {
    margin-top: rem(20);
  }

  .weather__loading {
    white-space: pre-line;
  }
}
</style>

