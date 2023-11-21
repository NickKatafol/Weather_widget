export const coordValidator = (limit: number) => (val: string): boolean => {
  let RE: any = /^-?(0|[1-9]\d*)(\.[0-9]{1,24})?$/
  RE.lastIndex = 0

  return RE.test(val) && (Math.abs(+val) <= limit)
}


//testing
if (import.meta.vitest) {
  const {describe, it, expect} = import.meta.vitest

  describe('Exported function Testing, Inside JS file', () => {
    const certainLimitValidator = coordValidator(180)

    const testSets = [
      { arg: '180', result: true },
      { arg: '180.57364', result: false },
      { arg: '179.73647364', result: true },
      { arg: '-180', result: true },
      { arg: '-180.57364', result: false },
      { arg: '-179.73647364', result: true },
      { arg: '0', result: true },
    ]

    it.each(testSets)('Test function with set of arguments', ({arg, result}: {arg: string, result: boolean}) => {
      expect(certainLimitValidator(arg)).toBe(result)
    })
  })
}