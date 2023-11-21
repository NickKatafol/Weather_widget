import type {IapiNameSet, IapiWaySet} from "@/features/APIService/apiTypes"
import {CommonInterceptors} from './apiService'
import {weatherApiSettingsShipper} from "@/domains/Weather/features/APIService/weatherAPISettings";

export enum EapiWay {   // ~ FetchInstance, Новый тип надо дополнительно прописывать в коде apiService
  regular = 'regular',
  Authorization = 'Authorization',
  exclusive ='exclusive'
}

export const weatherQuery = {appid: import.meta.env.VITE_WEATHER_KEY}
// export const commonQuery = {appid: '1d299b7969f7973a569cfa11e2330b5d'}

export const apiNamePride: Record<string, IapiNameSet> = {
  ...weatherApiSettingsShipper(EapiWay),
}


export type apiNames = keyof typeof apiNamePride


export const apiWayPride: Record<string, IapiWaySet> = {
  regular: {
    config: {},
  },
  auth: {
    config: {headers: {auth: 'beer 5'}},
  }
}



