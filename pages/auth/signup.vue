<script setup lang="ts">
// Imports
import { useVuelidate } from '@vuelidate/core'
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,

} from '@vuelidate/validators'

// Meta
definePageMeta({
  layout: 'empty',
})

// Declaration
const user = useSupabaseUser()
const toastService = useToastService()
const { resetObjectProperties } = useUtilService()
const submitted = ref<boolean>(false)
const { signUp } = useAuth()
const { layoutConfig } = useLayout()

// Form Validation
const signUpData: SignUp = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: {
    password: '',
    confirmPassword: '',
  },

})

// Computed
const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('First Name is required.', required),
      minLength: helpers.withMessage(
        ({
          $params,
        }) => `First name must have at least ${$params.min} minimum. `,
        minLength(3),
      ),
    },
    username: {
      required: helpers.withMessage('Username is required.', required),
      minLength: helpers.withMessage(
        ({
          $params,
        }) => `Username must have at least ${$params.min} minimum. `,
        minLength(6),
      ),
      containAtleastOneSpecialCharacter: helpers.withMessage(
        () => 'Username must have at least one special character.',
        (value: string) => {
          return /[#?!@$%^&*-]/.test(value)
        },
      ), // containAtleastOneSpecialCharacter
    },
    email: {
      required: helpers.withMessage('Email is required.', required),
      email: helpers.withMessage('Please enter a valid email address.', email),
    },
    password: {
      password: {
        required: helpers.withMessage('Password is required.', required),
        minLength: helpers.withMessage(
          ({
            $params,
          }) => `Password must be at least ${$params.min} characters long. `,
          minLength(8),
        ), // minLength
        containAtleastOneUppercase: helpers.withMessage(
          () => 'Password must contain at least one uppercase letter.',
          (value: string) => {
            return /[A-Z]/.test(value)
          },
        ), // containAtleastOneUppercase
        containAtleastOneLowercase: helpers.withMessage(
          () => 'Password must contain at least one lowercase letter.',
          (value: string) => {
            return /[a-z]/.test(value)
          },
        ), // containAtleastOneLowercase
        containAtleastOneNumber: helpers.withMessage(
          () => 'Password must contain at least one numerical digit.',
          (value: string) => {
            return /[0-9]/.test(value)
          },
        ), // containAtleastOneLowercase
        containAtleastOneSpecialCharacter: helpers.withMessage(
          () => 'Password must have at least one special character.',
          (value: string) => {
            return /[#?!@$%^&*-]/.test(value)
          },
        ), // containAtleastOneSpecialCharacter
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(signUpData.password.password),
      },
    },

  }
})

// Vuelidate
const v$ = useVuelidate(rules, signUpData)

// Router
const router = useRouter()

// Data

// Methods
async function handleSignup(isFormValid: boolean) {
  submitted.value = true

  if (!isFormValid) {
    toastService.show({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Form Validation Errors Found',
      life: 3000,
    })
    // return
  }

  const response = await signUp(signUpData)
  if (response.success) {
    console.log('response.success', response.success)
    toastService.show({
      severity: 'success',
      summary: 'Success Message',
      detail: 'You\'ve Successfully Logged In! Kindly Verify Your Email for Confirmation.',
      life: 8000,
    })
    resetFormField()
  }
  else {
    toastService.show({
      severity: 'error',
      summary: 'Error Message',
      detail: response.error,
      life: 3000,
    })
  }
}

function resetFormField() {
  resetObjectProperties(signUpData)
  submitted.value = false
  v$.value.$reset()
}

// Computed
const darkMode = computed(() => {
  return layoutConfig.colorScheme.value !== 'light'
})

// Mounted
onMounted(() => {
  resetFormField()
})

// Watch if the user object is not null
// watchEffect(async () => {
//   console.log('useSupabaseUser', user.value)
//   if (user.value)
//     await router.push('/auth/signup')
// })
</script>

<template>
  <!-- Background -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 800" class="fixed left-0 top-0 min-h-screen min-w-screen" preserveAspectRatio="none">
    <rect :fill="darkMode ? 'var(--primary-900)' : 'var(--primary-500)'" width="1600" height="800" />
    <path
      :fill="darkMode ? 'var(--primary-800)' : 'var(--primary-400)'"
      d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2
        478.4 581z"
    />
    <path
      :fill="darkMode ? 'var(--primary-700)' : 'var(--primary-300)'"
      d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"
    />
    <path
      :fill="darkMode ? 'var(--primary-600)' : 'var(--primary-200)'"
      d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"
    />
    <path :fill="darkMode ? 'var(--primary-500)' : 'var(--primary-100)'" d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z" />
  </svg>

  <!-- Flex centering/alinin into center position -->
  <div
    class="px-5 min-h-screen flex justify-content-center align-items-center"
  >
    <!-- Card  -->
    <div
      class="border-1 surface-border surface-card border-round py-6 px-5 md:px-7 z-1"
      style="max-width: 500px;"
    >
      <div class="mb-4">
        <div class="text-1000 text-xl font-bold">
          Get Started
        </div>
        <span class="text-600 font-medium">
          Create a new account
        </span>
      </div>
      <div class="flex flex-column">
        <form class="p-fluid mt-3" @submit.prevent="handleSignup(!v$.$invalid)">
          <!-- First and Last Name -->
          <div
            class="grid formgrid"
          >
            <div class=" col-12 md:col-6 mb-4 ">
              <span class="p-float-label">
                <InputText
                  id="firstName"
                  v-model="v$.firstName.$model"
                  class="w-full "
                  :class="{
                    'p-invalid': v$.firstName.$invalid && v$.firstName.$dirty
                      || v$.firstName.$invalid && submitted,
                  }"
                  aria-describedby="text-error"
                />
                <label for="firstName">
                  First Name*
                </label>

              </span>
              <!-- Error Section -->
              <span v-if="v$.firstName.$error">
                <span v-for="(error, index) of v$.firstName.$errors" id="firstName-error" :key="index">
                  <small class="p-error ">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="v$.firstName.$invalid && submitted"
                class="p-error"
              >
                {{ v$.email.required.$message }}
              </small>
            </div>

            <div class="col-12 md:col-6  mb-4 ">
              <span class="p-float-label">
                <InputText
                  id="lastName"
                  v-model="signUpData.lastName"
                  class="w-full "
                />
                <label for="lastName">
                  <span>Last Name</span>
                </label>
              </span>
            </div>
          </div>

          <!-- Username -->
          <div
            class="field"
          >
            <span class="p-float-label ">
              <InputText
                id="username"
                v-model="v$.username.$model"
                :class="{ 'p-invalid': v$.username.$invalid && submitted }"
                aria-describedby="text-error"
              />
              <label
                for="username"
                :class="{ 'p-error': v$.username.$invalid && submitted }"
                class="p-error"
              >
                Username*
              </label>
            </span>
            <span v-if="v$.username.$error">
              <ul
                v-for="(error, index) of v$.username.$errors"
                id="username-error"
                :key="index"
                style="list-style-type: none;"
                class="p-0 m-0"
              >
                <small class="p-error "><li>{{ error.$message }}</li></small>
              </ul>
            </span>
            <small
              v-else-if="v$.username.$invalid && submitted"
              class="p-error"
            >
              {{ v$.username.required.$message }}
            </small>
          </div>

          <!-- Email -->
          <div class="field mt-4">
            <span class="p-float-label ">
              <InputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="text-error"
              />
              <label
                for="email"
                :class="{ 'p-error': v$.email.$invalid && submitted }"
                class="p-error"
              >
                Email*
              </label>
            </span>
            <span v-if="v$.email.$error">
              <span v-for="(error, index) of v$.email.$errors" id="email-error" :key="index">
                <small class="p-error ">{{ error.$message }}</small>
              </span>
            </span>
            <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending" class="p-error">{{ v$.email.required.$message }}</small>
          </div>

          <!-- Password and Confirm Password -->
          <div class="field mt-4">
            <div class="grid formgrid">
              <!-- Password -->
              <div class="col-12 md:col-6 mb-4">
                <span class="p-float-label">
                  <Password
                    id="password"
                    v-model="v$.password.password.$model"
                    :class="{ 'p-invalid': v$.password.password.$invalid && submitted }"
                    aria-describedby="text-error"
                    toggle-mask
                    prompt-label="Choose a password"
                    weak-label="Too simple"
                    medium-label="Average complexity"
                    strong-label="Complex password"
                  >

                    <template #header>
                      <h6>Pick a password</h6>
                    </template>

                    <template #footer>
                      <div v-show="!(v$.password.password.$errors.length === 0)">
                        <Divider />

                        <p>Suggestion:</p>
                        <ul
                          v-for="(error, index) of v$.password.password.$errors"
                          :key="index"
                          class="p-0 m-0"
                          style="list-style-type: none;line-height: 1.3"
                        >
                          <li class="p-error ">{{ error.$message }}</li>

                        </ul>
                      </div>

                    </template>

                  </Password>

                  <label for="password" :class="{ 'p-error': v$.password.password.$invalid && submitted }">Password*</label>
                </span>
                <small v-if="(v$.password.password.$invalid && submitted) || v$.password.password.$pending" class="p-error">{{ v$.password.password.required.$message.replace('Value', 'Password') }}</small>
              </div>

              <!-- Confirm Password -->
              <div class="col-12 md:col-6 mb-4">
                <span class="p-float-label ">
                  <Password
                    id="confirmPassword"
                    v-model="v$.password.confirmPassword.$model"
                    :class="{ 'p-invalid': v$.password.confirmPassword.$invalid && submitted }"
                    :feedback="false"
                    aria-describedby="text-error"
                    toggle-mask
                  />
                  <label
                    for="confirmPassword"
                    :class="{ 'p-error': v$.password.confirmPassword.$invalid && submitted }"
                  >
                    Confirm Password*
                  </label>
                </span>

                <small v-if="v$.password.confirmPassword.$invalid && submitted " class="p-error">
                  {{ v$.password.confirmPassword.sameAsPassword.$message.replace("value", "confirm password") }}
                </small>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            label="Sign Up"
          />
          <AuthRedirectMessage
            class="mt-2"
            router-path="/auth/signin"
            message="Already have an account?"
            action-text="Sign in now..."
          />
        </form>
      </div>

      <TermsAndPolicy class="mt-5" />
      <div />
      <div class="flex justify-content-center align-items-center mt-5">
        <DynamicYear
          :font-size="{ class: 'text-xs' }"
          :font-weight="{ class: 'font-base' }"
          :text-color="{ class: 'text-400' }"
          message="ALL RIGHTS RESERVED"
        />
      </div>
    </div>
    <!-- Card  -->
  </div>
  <!-- Flex centering/alinin into center position -->
</template>

<style>

</style>
