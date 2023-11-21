import {LS_service} from '../LS_service'

describe('Testing static methods of class ====', () => {
  const LSName = 'test'
  const LSData = 'itIsTest'

  it('LocalStorageService setter and getter work properly', () => {
    LS_service.setLS(LSName, LSData)
    const LSResult = LS_service.getLS('test')

    expect(LSResult).toBe(LSData)
  })

  it('LocalStorageService setter, deleter and getter work properly', () => {
    LS_service.setLS(LSName, LSData)
    LS_service.delLS(LSName)
    const LSResult = LS_service.getLS(LSName)

    expect(LSResult).toBe('')
  })
})
