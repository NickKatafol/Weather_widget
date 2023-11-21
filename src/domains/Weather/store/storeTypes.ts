import type {TCardCellsSchema} from "@/components/gridCard/gridCardTypes";
import {UsingTheGridCard} from "@/components/gridCard/gridCardClasses";

export interface IapiWeatherSet {
  "coord":{"lon":number,"lat":number},
  "weather":{"id":number,"main":string,"description":string,"icon":string}[],
  "base":string,
  "main":{"temp":number,"feels_like":number,"temp_min":number,"temp_max":number,"pressure":number,"humidity":number,"sea_level":number,"grnd_level":number},
  "visibility":number,
  "wind":{"speed":number,"deg":37,"gust":number},
  "rain"?: any,
  "snow"?: any,
  "clouds":{"all":number},
  "dt":number,
  "sys":{"type":number,"id":number,"country":string,"sunrise":number,"sunset":number},
  "timezone":number,
  "id":number,
  "name":string,
  "cod":number
}

export type TLongLat = [string, string]    // ['lon', 'lat']

export class WeatherSet extends UsingTheGridCard {
  id: string
  cityName: string
  country: string
  lon: string
  lat: string
  temp: string
  pressure: string
  weatherImg: string

  constructor(
    apiWeatherSet: IapiWeatherSet,
    protected cellsSchema: TCardCellsSchema,
  ) {
    super(cellsSchema)
    this.id = (Math.floor(Math.random() * 100000)).toString()
    this.cityName = apiWeatherSet.name || 'nameless place'
    this.country = apiWeatherSet.sys.country || ''
    this.lon = apiWeatherSet.coord.lon.toString()
    this.lat = apiWeatherSet.coord.lat.toString()
    this.temp = ((apiWeatherSet.main.temp - 273.15) * 9 / 5 + 32).toFixed(0) + '°F'   //Kelvin => Fahrenheit
    this.pressure = apiWeatherSet.main.pressure + ' hPa'

    let cloudsProcent = apiWeatherSet.clouds?.all || 0
    let isRain = !!apiWeatherSet.rain
    let isSnow = !!apiWeatherSet.snow

    if (cloudsProcent < 50)
      this.weatherImg = 'sun.png'
    else if (cloudsProcent < 90)
      this.weatherImg = 'sunCloud.png'
    else {
      if (isRain)
        this.weatherImg = 'rain.png'
      else if (isSnow)
        this.weatherImg = 'snow.png'
      else
        this.weatherImg = 'clouds.png'
    }
  }
}












