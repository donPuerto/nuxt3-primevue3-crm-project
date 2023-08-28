export function useFoo() {
  function getGreeting() {
    return 'Hello foo'
  }
  function getFarewell() {
    return 'Goodbye foo'
  }
  function getStringLength(str) {
    return str.length
  }

  return {
    getGreeting,
    getFarewell,
    getStringLength,
  }
}
