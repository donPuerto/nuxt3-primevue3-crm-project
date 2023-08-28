<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

// Meta
definePageMeta({
  layout: 'auth',
})

// Validation
const state: Login = reactive({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { required },
}

const v$ = useVuelidate(rules, state)
const submitted = ref<boolean>(false)

// Router
const router = useRouter()
// Initials
const rememberMe = ref<boolean>(false)

const socialIconsData = [
  {
    name: 'google',
  },
  {
    name: 'github',
  },
  // Add more objects for other icons as needed
  // You can also include 'IconsTwitter', 'IconsFacebook', etc. in the socialIconsData array
]

// Composables
const { signInWithPassword } = useAuth()

// Methods
function handleLogin(isFormValid: boolean) {
  // Submitterd to turn true, because I submitted the form
  submitted.value = true
  console.log('isFormValid', isFormValid)
  try {
    if (isFormValid)
      signInWithPassword(state.email, state.password, rememberMe.value)
    else
      resetFormField()
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}

function resetFormField() {
  state.email = ''
  state.password = ''
  submitted.value = false
}

function navigateToRegister() {
  router.push('/auth/register')
}
</script>

<template>
  <div>
    <pre />
    <div class="flex justify-content-center align-items-center mb-1">
      <div>
        <IconsMyLogo
          width="80"
          height="80"
        />
      </div>
    </div>

    <Card class="md:w-28rem px-3 md:px-4 py-4 border-round-md shadow-2">
      <!-- <template #header>
        <div class="flex justify-content-center align-items-center mt-3">
          <div>
            <IconsMyLogo width="80" height="80" />
          </div>
        </div>
      </template> -->
      <template #title>
        Welcome Back!
      </template>
      <template #subtitle>
        Login to your account
      </template>

      <template #content>
        <OAuthSocialIcons
          :social-icons-data="socialIconsData"
        />
        <!-- <IconsGoogle /> -->
        <Divider
          align="center"
          class="py-2"
        >
          <span class="text-400 text-sm font-medium">OR</span>
        </Divider>

        <form class="p-fluid mt-4" @submit.prevent="handleLogin(!v$.$invalid)">
          <!-- Email -->
          <div class="field">
            <span class="p-float-label ">

              <InputText
                id="email"
                v-model="v$.email.$model"
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
          <div class="field mt-4">
            <span class="p-float-label ">

              <Password
                id="password"
                v-model="v$.password.$model"
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
            label="Submit"
            class="mt-3"
          />
        </form>
      </template>
    </Card>
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
