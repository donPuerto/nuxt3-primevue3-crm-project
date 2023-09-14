<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

// Meta
definePageMeta({
  layout: 'empty',
})

// Declaration
const toastService = useToastService()
const { resetObjectProperties } = useUtilService()
const submitted = ref<boolean>(false)
const rememberMe = ref<boolean>(false)
const { signInWithPassword } = useAuth()

// Form Validation
const signInData: Signin = reactive({
  email: '',
  password: '',
})

// Computed
const rules = {
  email: { required, email },
  password: { required },
}

// Vuelidate
const v$ = useVuelidate(rules, signInData)

// Router
const router = useRouter()

// Initials
const socialIconsData = [
  {
    name: 'google',
  },
  {
    name: 'github',
  },
  // Add more objects for other icons as needed
]

// Methods
async function handleSignin(isFormValid: boolean) {
  // Submitterd to turn true, because I submitted the form
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

  const response = await signInWithPassword(signInData.email, signInData.password)
  console.log('response', response)
  if (response.success) {
    navigateToProfile()
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

function navigateToProfile() {
  router.push('/dashboard/profile')
}

function resetFormField() {
  resetObjectProperties(signInData)
  submitted.value = false
  v$.value.$reset()
}

onMounted(() => {
  resetFormField()
})
</script>

<template>
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
          Welcome Back!
        </div>

        <span>
          Signin to your account
        </span>
      </div>

      <!-- Auth Social Icons -->
      <OAuthSocialIcons
        :social-icons-data="socialIconsData"
      />

      <Divider
        align="center"
        class="mt-3"
      >
        <span class="text-400 text-sm font-medium">OR</span>
      </Divider>

      <div class="flex flex-column">
        <form class="p-fluid" @submit.prevent="handleSignin(!v$.$invalid)">
          <!-- Email -->
          <div class="field mt-2">
            <span class="p-float-label ">
              <InputText
                id="email"
                v-model.trim="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
              <label for="email" :class="{ 'p-error': v$.email.$invalid && submitted }" class="p-error">Email*</label>
            </span>
            <span v-if="v$.email.$error">
              <span v-for="(error, index) of v$.email.$errors" id="email-error" :key="index">
                <small class="p-error ">{{ error.$message }}</small>
              </span>
            </span>
            <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending" class="p-error">{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
          </div>

          <!-- Password -->
          <div class="field">
            <span class="p-float-label mt-4">
              <Password
                id="password"
                v-model.trim="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                :feedback="false"
                toggle-mask
              />
              <label for="password" :class="{ 'p-error': v$.password.$invalid && submitted }">Password*</label>
            </span>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending" class="p-error">{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
          </div>

          <!-- Remember Me -->
          <div
            class="field-checkbox flex flex-wrap sm:align-content-start  align-content-evenly justify-content-between gap-1"
          >
            <div class="flex align-items-center ">
              <Checkbox
                id="rememberMe"
                v-model="rememberMe"
                name="rememberMe"
                :binary="true"
              />
              <label for="binary"><span class="font-medium ml-2 text-gray-600">Remember me</span>
              </label>
            </div>
            <a
              class="font-medium no-underline text-blue-500 text-right cursor-pointer "
            >Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            label="Sign In"
            class="mt-2"
          />
          <AuthRedirectMessage
            class="mt-2"
            router-path="/auth/signup"
            message="Don't have an account yet?"
            action-text="Sign up now..."
          />
        </form>
      </div>
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
