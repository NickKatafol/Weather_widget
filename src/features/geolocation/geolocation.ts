import type {TLongLat} from "@/domains/Weather/store/storeTypes";

function getCoordinates(): Promise<any> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export async function getGeolocation(): Promise<TLongLat | []> {
  if (navigator.geolocation)
    return await getCoordinates()
      .then((position: any) => ([position.coords.longitude, position.coords.latitude]))
  return Promise.resolve([])
}


