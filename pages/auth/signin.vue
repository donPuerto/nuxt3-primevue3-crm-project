<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const formFields = ref([
  {
    id: 'email1',
    label: 'Email',
    type: 'InputText',
    labelClass: 'block text-900 font-medium mb-2',
    inputClass: 'w-full mb-3',
    value: '',
  },
  {
    id: 'password1',
    label: 'Password',
    type: 'Password',
    labelClass: 'block text-900 font-medium mb-2',
    inputClass: 'w-full mb-3',
    value: '',
  },
])

function handleSubmit() {
  const formData = {}

  for (const field of formFields)
    formData[field.id] = field.value

  // Now you have all the form data in the formData object
  console.log(formData)

  // You can perform your form submission or other logic here
}
</script>

<template>
  <div>
    <div v-for="field in formFields" :key="field.id">
      <component :is="field.type" v-model="field.value" :class="field.inputClass" />
    </div>
    <Button label="Submit" @click="handleSubmit" />
  </div>
</template>
