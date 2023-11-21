import {ref, computed, reactive, inject} from 'vue'
import {defineStore} from 'pinia'

import {LS_service} from "@/features/localStorageService/LS_service"
import type {TLongLat, IapiWeatherSet} from "./storeTypes"
import {WeatherSet} from "./storeTypes"
import {retrieveCoordinatesFromWeatherSets} from "@/domains/Weather/utils/retrieveCoordinatesFromWeatherSets"
import {WeatherCardCellsSchema} from "@/domains/Weather/store/schemas";
import type {apiService} from "@/features/APIService/apiService";


export const useWeatherStore = defineStore('weatherStore', () => {
  const APIService: apiService | undefined = inject('$api')

  let weatherSets: Array<WeatherSet> = reactive([])
  let isWeatherFetched: {value: boolean} = ref(false)

  const GET_WEATHER_SETS = computed(() => weatherSets)

  async function FETCH_WEATHER(target: Array<TLongLat> | string, $api: any = APIService): Promise<{status: string, value: IapiWeatherSet}[]> {
    let fetchedDataList: {status: string, value: IapiWeatherSet}[] = []

    if (Array.isArray(target)) {
      if(!target.length)
        return []

      // @ts-ignore
      fetchedDataList = await Promise.allSettled(
        target.map((longLat: TLongLat) => {
          return $api('FETCH_WEATHER')
            .send(null, {lon: longLat[0], lat: longLat[1]})
        })
      )
    }

    if (typeof target === "string") {  //cityName
      let cityWeather = await $api('FETCH_WEATHER')
        .send(null, {q: target})
      fetchedDataList.push({status: "fulfilled", value: cityWeather})
    }

    //сохраняем в store
    // @ts-ignore
    let weatherSets_: Array<WeatherSet> | [] = fetchedDataList.reduce((total: Array<WeatherSet>, apiPromiseSet: {status: string, value: IapiWeatherSet}) => {
      if (apiPromiseSet.status === 'fulfilled') {
        return total.concat(new WeatherSet(apiPromiseSet.value, WeatherCardCellsSchema))
      }
    }, [])
    weatherSets.unshift(...weatherSets_)

    //сохраняем в LS
    const weatherCoordinates: Array<TLongLat> = retrieveCoordinatesFromWeatherSets(weatherSets)
    LS_service.setLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME, weatherCoordinates)

    isWeatherFetched.value = true

    return fetchedDataList
  }


  function DEL_WEATHER(id: string): void {
    let ind = weatherSets.findIndex(item => item.id === id)
    weatherSets.splice(ind, 1)

    //сохраняем в LS
    const weatherCoordinates: Array<TLongLat> = retrieveCoordinatesFromWeatherSets(weatherSets)
    LS_service.setLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME, weatherCoordinates)
  }

  function REFRESH_WEATHER_LINE(refreshedItemLine_id: string[]): void {
    for (let id of refreshedItemLine_id) {
      let item = weatherSets.find((item, ind) => item.id === id)
      if (item)
        weatherSets.push(item)
    }

    weatherSets.splice(0, refreshedItemLine_id.length)
  }

  return {
    isWeatherFetched,
    GET_WEATHER_SETS,
    FETCH_WEATHER,
    DEL_WEATHER,
    REFRESH_WEATHER_LINE,
  }
})
