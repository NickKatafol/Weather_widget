import { createPinia, setActivePinia } from 'pinia'

import {useWeatherStore} from "../weatherStore"
import {fakeAPIWeather} from './fakeAPIWeather'

describe('Pinia Testing', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const apiServiceMimicrator = vi.fn(apiSetName => {
    if(apiSetName === 'FETCH_WEATHER')
      return {
        send: vi.fn(() => Promise.resolve(fakeAPIWeather))
      }
    return  {
      send: vi.fn()
    }
  })

  it('Action Test- FETCH_WEATHER handle request properly', async () => {
    //arranges
    const weatherStore = useWeatherStore()

    //act
    const weatherFetcherReflex = await weatherStore.FETCH_WEATHER([[11, 11]], apiServiceMimicrator)

    //asserts
    expect(apiServiceMimicrator).toHaveBeenCalledWith('FETCH_WEATHER')
    expect(weatherFetcherReflex[0].value).toBe(fakeAPIWeather)
  })


  it('Setters & Getters Test - FETCH_WEATHER set weatherSets properly', async () => {
    //arranges
    const weatherStore = useWeatherStore()

    //act
    const weatherFetcherReflex = await weatherStore.FETCH_WEATHER([[11, 11]], apiServiceMimicrator)

    //asserts
    expect(weatherStore.GET_WEATHER_SETS[0].cityName).toBe('Lagdei')
  })
})

