import type {ICardCell} from "@/components/gridCard/gridCardTypes";

export const WeatherCardCellsSchema: ICardCell[] = [
  {
    row: '1',
    column: '1',
    leftVal: 'cityName_',
    rightVal: 'country_',
    cellStyles: {color: '#b172c1', borderColor: '#b172c1'}
  },
  {
    row: '2',
    column: '1',
    leftVal: 'longitude',
    rightVal: 'lon_' ,
  },
  {
    row: '3',
    column: '1',
    leftVal: 'latitude',
    rightVal: 'lat_' ,
  },
  {
    row: '5',
    column: '1',
    leftVal: 'temperature',
    rightVal: 'temp_' ,
  },
  {
    row: '5',
    column: '2',
    leftVal: 'pressure',
    rightVal: 'pressure_' ,
  },
  {
    row: '1/span 3',
    column: '2',
    imgName: 'weatherImg_',
    pathToImgResource: '/src/domains/Weather/assets/imgs/weatherImgs/'
  },
]