// import {
//   email,
//   helpers,
//   required,
// } from '@vuelidate/validators'

// export function useValidationHelpers() {
//   interface CustomValidationRule<T> {
//     $params: { min: T }
//     $invalid: boolean
//   }

//   function customMinLengthRule<T>(
//     value: T,
//     minLength: number,
//   ): CustomValidationRule<T> {
//     return {
//       $params: { min: minLength },
//       $invalid: value === null || value.length < minLength,
//     }
//   }

//   // Helper function to create a required rule with a custom error message
//   function requiredRule(errorMessage: string) {
//     return helpers.withMessage(errorMessage, required)
//   }

//   // Helper function to create a minLength rule with a custom error message
//   function customMinLengthRule<T>(
//     value: T,
//     minLength: number,
//   ): CustomValidationRule<T> {
//     return {
//       $params: { min: minLength },
//       $invalid: value === null || value.length < minLength,
//     }
//   }
//   // Helper function to create a rule for containing at least one special character
//   function containAtLeastOneSpecialCharacterRule(errorMessage: string) {
//     return helpers.withMessage(errorMessage, (value: string) =>
//       /[#?!@$%^&*-]/.test(value),
//     )
//   }

//   // Helper function to create a rule for a valid email
//   function validEmailRule(errorMessage: string) {
//     return helpers.withMessage(errorMessage, email)
//   }

//   // Helper function to create a rule for containing at least one uppercase letter
//   function containAtLeastOneUppercaseRule(errorMessage: string) {
//     return helpers.withMessage(errorMessage, (value: string) => /[A-Z]/.test(value))
//   }

//   // Helper function to create a rule for containing at least one lowercase letter
//   function containAtLeastOneLowercaseRule(errorMessage: string) {
//     return helpers.withMessage(errorMessage, (value: string) => /[a-z]/.test(value))
//   }

//   // Helper function to create a rule for containing at least one numerical digit
//   function containAtLeastOneNumberRule(errorMessage: string) {
//     return helpers.withMessage(errorMessage, (value: string) => /[0-9]/.test(value))
//   }

//   return {
//     requiredRule,
//     minLengthRule,
//     containAtLeastOneSpecialCharacterRule,
//     validEmailRule,
//     containAtLeastOneUppercaseRule,
//     containAtLeastOneLowercaseRule,
//     containAtLeastOneNumberRule,
//   }
// }
