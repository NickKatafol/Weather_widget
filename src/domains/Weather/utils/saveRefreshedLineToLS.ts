import {LS_service} from "@/features/localStorageService/LS_service";
import type {WeatherSet, TLongLat} from "@/domains/Weather/store/storeTypes";

export function saveRefreshedLineToLS(refreshedItemLine_id: string[], weatherSets: WeatherSet[]): void {
  let refreshedWeatherCoordinates: TLongLat[] = []

  for (let id of refreshedItemLine_id) {
    let targetItem: WeatherSet | undefined = weatherSets.find((item: WeatherSet) => item.id === id)
    if (targetItem)
      refreshedWeatherCoordinates.push([targetItem.lon, targetItem.lat])
  }

  LS_service.setLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME, refreshedWeatherCoordinates)
}