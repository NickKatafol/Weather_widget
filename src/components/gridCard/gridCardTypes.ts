export interface ICardCell {
  row: string
  column: string
  leftVal?: string
  rightVal?: string
  pathToImgResource?: string
  imgName?: string
  cellStyles?: {[s: string]: string}
}

export type TCardCellsSchema = ICardCell[]
//rules for declaration the CardCellsSchema:
// {
//   //1. it is the direct value for this field
//   leftVal: 'longitude',

//   //2. if value have segment '_'
//   // val for 'leftVal' would be taken from WeatherSet-field with same name /but without segment '_' of course/.
//   rightVal: 'lon_',

//   row: '1',
//   column: '1',
// },
