<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const formFields = ref([
  {
    id: 'email1',
    label: 'Email',
    type: InputText,
    value: '',
    size: 'medium',
    placeholder: 'Email',
    icon: 'pi-envelope',
    ariaDescribedBy: 'email-help',
    small: 'Enter your email address for account recovery.',
  },
  {
    id: 'password1',
    label: 'Password',
    type: Password,
    value: '',
    size: 'medium',
    placeholder: 'Password',
    icon: 'pi-lock',
    ariaDescribedBy: 'password-help',
    small: 'Enter your password to access your account.',
  },
])

function handleSubmit() {
  const formData = {}

  for (const field of formFields.value)
    formData[field.id] = field.value

  // Now you have all the form data in the formData object
  console.log(formData)

  // You can perform your form submission or other logic here
}

function getSizeClass(size) {
  const sizeClassMap = {
    small: 'p-inputtext-sm',
    medium: '', // Default size, no additional class needed
    large: 'p-inputtext-lg',
  }

  return sizeClassMap[size] || ''
}
</script>

<template>
  <div class="p-8">
    <form @submit.prevent="handleSubmit">
      <div v-for="field in formFields" :key="field.id">
        <div class="flex flex-column pb-2">
          <label :for="field.id">{{ field.label }}</label>
          <div class="p-inputgroup">
            <span v-if="field.icon" class="p-inputgroup-addon p-input-icon-left">
              <i class="pi" :class="[field.icon]" />
            </span>
            <InputText :id="field.id" v-model="field.value" :class="getSizeClass(field.size)"
              :placeholder="field.placeholder" :aria-describedby="field.ariaDescribedBy" />
          </div>
          <small v-if="field.small" :id="field.ariaDescribedBy">{{ field.small }}</small>
        </div>
      </div>
      <Button label="Submit" type="submit" :class="getSizeClass('medium')" />
    </form>
  </div>
</template>
