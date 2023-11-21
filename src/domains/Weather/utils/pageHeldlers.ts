import {useWeatherStore} from '../store/weatherStore'
import type {TLongLat} from "@/domains/Weather/store/storeTypes";
import {LS_service} from "@/features/localStorageService/LS_service";
import {getGeolocation} from "@/features/geolocation/geolocation";

export async function fetchInitialWeatherData(): Promise<void> {
  const weatherStore = useWeatherStore()

  let weatherLocations: Array<TLongLat> = LS_service.getLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME) || []

  //request local weather if there is no prevision choices
  if (!weatherLocations.length) {
    let localLongLat: TLongLat | [] = await getGeolocation()
    weatherLocations = localLongLat.length ? [localLongLat] : []
  }

  await weatherStore.FETCH_WEATHER(weatherLocations)
}