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
  layout: 'auth',
})

// Declaration
const user = useSupabaseUser()
const toastService = useToastService()
const { resetObjectProperties } = useUtilService()
const submitted = ref<boolean>(false)
const { signUp } = useAuth()

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
    return
  }

  const response = await signUp(signUpData)
  if (response.success) {
    navigateToLogin()
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
}

function navigateToLogin() {
  router.push('/auth/signin')
}

// Mounted
onMounted(() => {
  console.log('Signup Page')
})

// Watch if the user object is not null
watchEffect(async () => {
  console.log('useSupabaseUser', user.value)
  if (user.value)
    await router.push('/auth/signup')
})
</script>

<template>
  <div>
    <div
      class="
        card
        flex
        justify-content-center
        align-items-center
        mt-5
      "
    >
      <Card class="md:w-30rem  md:px-3 border-round-md shadow-3">
        <template #title>
          <div class="flex justify-content-center align-items-center my-2">
            <div>
              <IconsMyLogo
                width="80"
                height="80"
              />
            </div>
          </div>
          Get Started
        </template>
        <template #subtitle>
          Create a new account
        </template>

        <template #content>
          <Toast />

          <form class="p-fluid mt-3" @submit.prevent="handleSignup(!v$.$invalid)">
            <!-- First and Last Name -->
            <div
              class="grid"
            >
              <div class="col-12 md:col-6">
                <div>
                  <span class="p-float-label ">

                    <InputText
                      id="firstName"
                      v-model="v$.firstName.$model"
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
              </div>

              <div class="col-12 md:col-6">
                <span class="p-float-label ">
                  <InputText
                    id="lastName"
                    v-model="signUpData.lastName"
                  />
                  <label for="lastName">
                    <span>Last Name</span>
                  </label>
                </span>
              </div>
            </div>

            <!-- Username -->
            <div
              class="field mt-3"
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
              <div class="grid">
                <!-- Password -->
                <div class="col-12 md:col-6">
                  <span class="p-float-label ">

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
                <div class="col-12 md:col-6">
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
              class="mt-4"
            />
            <AuthRedirectMessage
              class="mb-2"
              router-path="/auth/signin"
              message="Already have an account?"
              action-text="Sign in now..."
            />
          </form>
        </template>

        <template #footer>
          <TermsAndPolicy class="" />
        </template>
      </Card>
    </div>

    <div class="flex justify-content-center align-items-center mt-3">
      <DynamicYear
        :font-size="{ class: 'text-xs' }"
        :font-weight="{ class: 'font-base' }"
        :text-color="{ class: 'text-400' }"
        message="ALL RIGHTS RESERVED"
      />
    </div>
  </div>
</template>

<style>
.my-gutter [class*=col] { padding-right: .7rem; padding-left: .7rem; }
</style>
