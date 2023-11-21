<script setup lang="ts">
import {computed, reactive, toRef, toRefs} from "vue"
import type {ICardCell} from "./gridCardTypes"

const cardProps = defineProps<{
  cellSets: ICardCell[]
}>()

function cellStyle (cellSet: ICardCell) {
  return {
    gridRow: cellSet.row,
    gridColumn: cellSet.column,
    backgroundImage: cellSet.imgName ? `url(${cellSet.pathToImgResource}${cellSet.imgName})` : '',
    border: cellSet.imgName ? 'none' : ''
  }
}

</script>


<template>
  <div class="weather-card-wrapper">
    <div v-for="(cellSet, ind) of cardProps.cellSets"
         :key="'set' + ind"
         :style="[cellStyle(cellSet), cellSet.cellStyles]"
         class="cell_item"
    >
      <div>{{ cellSet.leftVal }}</div>
      <div>{{ cellSet.rightVal }}</div>
    </div>
  </div>
</template>


<style scoped lang="scss">
//grid application
.weather-card-wrapper {
  width: 100%;
  border-left: var(--vt-c-grey_dark) 1px solid;
  border-bottom: var(--vt-c-grey_dark) 1px solid;
  box-sizing: border-box;
  padding: var(--vt-c-common-padding);
  
  display: grid;
  grid-auto-rows: 30px;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--vt-c-common-padding);
  grid-auto-flow: row dense;
  
  .cell_item {
    box-sizing: border-box;
    padding: var(--vt-c-common-padding) calc(var(--vt-c-common-padding) / 2);
    border-left: var(--vt-c-grey_dark) 1px solid;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    background: no-repeat;
    background-size: contain;
    background-position: right top;
  }
}
</style>