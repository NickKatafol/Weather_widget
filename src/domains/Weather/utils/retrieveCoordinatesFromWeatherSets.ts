import type {TLongLat, WeatherSet} from "../store/storeTypes";

export function retrieveCoordinatesFromWeatherSets(weatherSets: Array<WeatherSet>): Array<TLongLat> {
  const weatherCoordinates: Array<TLongLat> = []
  for(let set of weatherSets) {
    weatherCoordinates.push([set.lon, set.lat])
  }
  return weatherCoordinates
}