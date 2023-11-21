import type {EapiWay} from './apiSettings'

export interface IapiNameSet {
  EapiWay: EapiWay
  apiMethod: string
  apiPath: string       //'user/^/common/^'
  commonQuery?: {[s: string]: string}
}

export interface IapiWaySet {
  config: {[t: string]: any},
  // interceptorSet: IInterceptors       // wrong way to add Interceptors
}


export type PathChunks = Array<string>

export interface IAPIConfig {
  headers?: {[index: string]: string}
  method?: string
  body?: {[index: string]: string}
  params?: {[index: string]: string}
}

export interface IInterceptors {
  onRequest?({request, options}: any) :void,
  onRequestError?({request, options, error}: any) :void,
  onResponse?({request, options, response}: any) :void,
  onResponseError({request, options, response}: any) :void
}





