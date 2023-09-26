export function useCustomContainerClass() {
  const getCustomClass = (customClass) => {
    const classes = {}
    for (const [, value] of Object.entries(customClass))
      classes[`${value}`] = true

    return classes
  }

  return {
    getCustomClass,
  }
}
