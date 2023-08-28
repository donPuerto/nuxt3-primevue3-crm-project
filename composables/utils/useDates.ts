// composables/useDates.ts

export function useDates() { // The named container
  // A container method
  const getCurrentYear = () => new Date().getFullYear()

  return { getCurrentYear } // Expose as public interface
}
