import {$fetch} from "ohmyfetch";
import type {FetchOptions} from 'ohmyfetch'
import type {$Fetch} from "ohmyfetch";
import type {IAPIConfig, IInterceptors, PathChunks} from './apiTypes'
import type {apiNames} from './apiSettings'
import type {IapiNameSet} from './apiTypes'
import {apiNamePride} from './apiSettings'
import {useCommonStore} from '@/store/commonStore'

// How to use it:
// let response_200 = this.$api('GET_TOURIST__id', pathChunks)
//   .send('body', {myQuery: 'go', })


export const CommonInterceptors: IInterceptors = {
  async onRequest({}: any) {
    // console.log('onRequest =====')
  },
  async onResponseError({request, options, response}: any) {
    let commonStore = useCommonStore()
    if(response.status !== 200)
      commonStore.SET_API_ERROR(response._data)
  }
}

export class apiService {
  apiNameSet: IapiNameSet
  fullPath: string = ''
  currentFetchInstance: $Fetch | null = null

  static commonFetchInstance: $Fetch = $fetch.create(<FetchOptions>{
    ...{baseURL: import.meta.env.VITE_WEATHER_URL},
    ...CommonInterceptors               // right way to add Interceptors
  })

  static authFetchInstance: $Fetch | null = null

  constructor(apiName: apiNames, pathChunks: PathChunks) {
    //choose the settings
    this.apiNameSet = apiNamePride[apiName]

    //make fullPath - if url include the :id
    if (!this.apiNameSet.apiPath.includes('^'))
      this.fullPath = this.apiNameSet.apiPath
    else
      this.fullPath = apiService.replaceStigmentsInThePath(this.apiNameSet.apiPath, pathChunks)

    //make Fetch_instance
    if (this.apiNameSet.EapiWay === 'regular')
      this.currentFetchInstance = apiService.commonFetchInstance

  }

  async send(body: any, querySet: any) {
    if (this.currentFetchInstance)
      return await this.currentFetchInstance(this.fullPath, {
        method: this.apiNameSet.apiMethod,
        body,
        params: {...querySet, ...this.apiNameSet.commonQuery}
      })
  }

  static replaceStigmentsInThePath(path: string, pathChunks: PathChunks) {
    let pathSigments = path.split('^')

    if (pathSigments.length - 1 > pathChunks.length)
      console.error('== wrong_with_replaceStigmentsInThePath ==')

    let fullPath = ''
    pathSigments.forEach((item, ind) => {
      fullPath = fullPath + item + (pathChunks[ind] || '')
    })

    return fullPath
  }

  static loseAuth() {
    this.authFetchInstance = null
  }

  static observeTheAuth() {

  }

}









