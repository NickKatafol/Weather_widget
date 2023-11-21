import type {ICardCell} from "./gridCardTypes";

export class UsingTheGridCard {
  constructor(
    protected cellsSchema: ICardCell[],
    protected cardCellGenerator: any = CardCellGenerator
  ) {
  }

  getCardCells(): ICardCell[] {
    let cardCells: ICardCell[] = []
    for (let cellSchema of this.cellsSchema) {
      cardCells.push(new this.cardCellGenerator(this, cellSchema))
    }
    return cardCells
  }
}

class CardCellGenerator implements ICardCell {
  row = ''
  column = ''
  leftVal = ''
  rightVal = ''
  pathToImgResource = ''
  imgName = ''
  cellStyles = {}

  constructor(
    self: {[s: string]: any},
    cellSchema: ICardCell
  ) {
    for(let schemaKey of Object.keys(cellSchema)) {   //ToDo, It would be easier to use Object.entries() but "Property 'entries' does not exist on type 'ObjectConstructor'". ))
      // @ts-ignore
      if(typeof cellSchema[schemaKey] === 'string' && cellSchema[schemaKey].includes('_')) {
        // @ts-ignore
        this[schemaKey] = self[cellSchema[schemaKey].replaceAll('_', '')]
      }
      else {
        // @ts-ignore
        this[schemaKey] = cellSchema[schemaKey]
      }
    }
  }
}
