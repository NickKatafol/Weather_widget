import type {EapiWay} from "@/features/APIService/apiSettings";
import type {IapiNameSet} from "@/features/APIService/apiTypes";
import {weatherQuery} from "@/features/APIService/apiSettings";

export function weatherApiSettingsShipper(EapiWay: any): Record<string, IapiNameSet> {
  return {
    FETCH_WEATHER: {
      apiMethod: 'get',
      EapiWay: EapiWay.regular,
      apiPath: '/weather',
      commonQuery: weatherQuery
    },
  }
}