export function useCustomContainerClass() {
  const getCustomClass = (customClass) => {
    console.log(customClass)
    const classes = {}
    for (const [key, value] of Object.entries(customClass))
      classes[`${value}`] = true

    return classes
  }

  return {
    getCustomClass,
  }
}
