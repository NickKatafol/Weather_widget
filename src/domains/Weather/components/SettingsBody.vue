<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue"
import useVuelidate from "@vuelidate/core"
import {coordValidator} from "@/domains/Weather/utils/coordValidator"
import DraggableCard from './draggableCard.vue'
import {useWeatherStore} from "@/domains/Weather/store/weatherStore"
import {drugStart, drugEnd, dragOver} from "@/features/dragAndDrop/drugEndDrop"
import {saveRefreshedLineToLS} from '@/domains/Weather/utils/saveRefreshedLineToLS'
import {TLongLat} from "@/domains/Weather/store/storeTypes";

const weatherStore = useWeatherStore()
const emit = defineEmits(['reloadHimSelf'])

onMounted(() => {
  const tasksListElement: any = document.querySelector(`.body-list`)
  
  tasksListElement.addEventListener(`dragstart`, (ev: any) => drugStart(ev))
  
  tasksListElement.addEventListener(`dragend`, (ev: any) => {
    let refreshedItemLine_id = drugEnd(ev, document, `.body-list__item`)
    
    saveRefreshedLineToLS(refreshedItemLine_id, weatherStore.GET_WEATHER_SETS)
    weatherStore.REFRESH_WEATHER_LINE(refreshedItemLine_id)
    
    emit('reloadHimSelf')
  })
  
  tasksListElement.addEventListener(`dragover`, (ev: any) => {
    dragOver(ev, tasksListElement, 'body-list__item')
  })
})

const settingsState = reactive({
  searchFields: {
    cityName: {
      name: 'City',
      val: '',
      placeholder: 'enter city name or coordinates'
    },
    longitude: {
      name: 'longitude',
      val: '',
      placeholder: 'within (-180) end 180'
    },
    latitude: {
      name: 'latitude',
      val: '',
      placeholder: 'within (-90) end 90'
    }
  }
})

const validators = {
  searchFields: {
    cityName: {
      val: {cityValidator: () => true}
    },
    longitude: {
      val: {coordValidator: coordValidator(180)}
    },
    latitude: {
      val: {coordValidator: coordValidator(90)}
    },
  }
}
const v$ = useVuelidate(validators, settingsState, {$autoDirty: true})


const isCityNameValid = computed(() => {
  return !!settingsState.searchFields.cityName.val
})

const isLongLatValid = computed(() => {
  return !v$.value.searchFields['longitude'].val.$invalid && !!v$.value.searchFields['longitude'].val.$model &&
    !v$.value.searchFields['latitude'].val.$invalid && !!v$.value.searchFields['latitude'].val.$model
})


function isFieldAllowToShow(fieldName: string): boolean {
  if (fieldName === 'City')
    return !(settingsState.searchFields.longitude.val ||
      settingsState.searchFields.latitude.val)
  if (['longitude', 'latitude'].includes(fieldName))
    return !settingsState.searchFields.cityName.val
  return false
}

async function onAddWeather() {
  let target:Array<TLongLat> | string
  
  if(isCityNameValid.value)
    target = settingsState.searchFields.cityName.val
  else if (isLongLatValid.value)
    target = [[settingsState.searchFields.longitude.val, settingsState.searchFields.latitude.val]]
  else
    return
  
  await weatherStore.FETCH_WEATHER(target)
    .then(() => {
      for(let fieldName of Object.keys(settingsState.searchFields)) {
        // @ts-ignore
        settingsState.searchFields[fieldName].val = ''
      }
      v$.value.$reset()
    })
}


</script>


<template>
  <div class="settings-body-wrapper">
    <div class="body-list">
      <DraggableCard v-for="(weatherSet, ind) of weatherStore.GET_WEATHER_SETS"
                     :key="'sdc' + ind"
                     :weatherSet="weatherSet"
                     :id="weatherSet.id"
                     class="body-list__item"
                     draggable="true"
      />
    </div>
    
    <div class="body-search">
      <div class="body-search__title">
        Add Location
      </div>
      <div v-for="(field, key, ind) in settingsState.searchFields"
           :key="'coord' + ind"
           class="body-search__search-field"
      >
        <div v-show="isFieldAllowToShow(field.name)">
          <div class="field__title">{{ field.name }}</div>
          <input v-model="field.val"
                 @keydown.enter="onAddWeather"
                 :placeholder="field.placeholder"
                 type="text"
                 :class="{'input-error': v$.searchFields[key].val.$error && field.val,
                        'input-valid': !v$.searchFields[key].val.$invalid && v$.searchFields[key].val.$model
                       }"
                 class="field__form"
          >
        </div>
      </div>
    </div>
    
    <div class="body-controllers">
      <div @click="onAddWeather"
           class="controllers__btn"
           :class="{'non-active': !(isCityNameValid || isLongLatValid)}"
      >
        apply
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/CSS/utils.scss";

.body-list {
}

.body-list__item:not(:first-child) {
  margin-top: var(--vt-c-common-padding);
}

.body-list:not(:first-child) {
  margin-top: rem(6);
}

.selected {
  color: var(--vt-c-green);
  opacity: 0.6;
}

.body-search {
  display: flex;
  flex-direction: column;
  margin-top: calc(var(--vt-c-common-padding) * 3);
  
  &__title {
    text-transform: uppercase;
  }
  
  //use the grid
  &__search-field {
    & * {
      width: 100%;
      display: grid;
      grid-auto-rows: min-content;
      grid-template-columns: 1fr 2fr;
      margin-top: var(--vt-c-common-padding);
    }
  
    .field__title {
      color: var(--vt-c-green);
    }
    
    .field__form {
      //max-width: rem(100);
      padding-left: rem(4);
      border: none;
      border-left: var(--vt-c-grey_dark) 1px solid;
      border-bottom: var(--vt-c-grey_dark) 1px solid;
      
      &:focus-visible {
        outline: none !important;
      }
    }
  }
}

.body-controllers {
  margin-top: calc(var(--vt-c-common-padding)*2);
  
  .controllers__btn {
    width: 100%;
    text-align: right;
    cursor: pointer;
    font-weight: 900;
    color: var(--vt-c-green);
    
    &:hover {
      opacity: 0.7;
    }
  }
  
}

.non-active {
  color: var(--vt-c-blue_dark) !important;
  opacity: 0.8 !important;
}

.input-error {
  border: var(--vt-c-red) 1px solid !important;
}

.input-valid {
  border: var(--vt-c-valid) 1px solid !important;
}
</style>