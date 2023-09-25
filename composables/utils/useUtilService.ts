export function useUtilService() {
  /**
   * Generates a function comment for the given function body.
   *
   * @return An object containing the resetObjectProperties function.
   */
  function resetObjectProperties<T extends Record<string, any>>(obj: T) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object')
          resetObjectProperties(obj[key])

        else
          obj[key] = '' as any // You can use type assertion here
      }
    }
  }

  return {
    resetObjectProperties,
  }
}
