<script setup>
import { reactive, ref } from 'vue'

// Define an array of dynamic input fields with label, input classes, and the button
const dynamicFields = ref([
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    labelClass: 'block text-900 font-medium mb-2',
    inputClass: 'w-full mb-3',
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    labelClass: 'block text-900 font-medium mb-2',
    inputClass: 'w-full mb-3',
  },
  {
    id: 'email1',
    label: 'Email',
    type: 'text',
    labelClass: 'block text-900 font-medium mb-2',
    inputClass: 'w-full mb-3',
  },
  {
    id: 'password1',
    label: 'Password',
    type: 'password',
    labelClass: 'block text-900 font-medium mb-2',
    inputClass: 'w-full mb-3',
  },
  {
    id: 'signInButton',
    label: 'Sign In',
    icon: 'pi pi-user',
    buttonClass: 'w-full',
    clickAction: signIn,
  },
  // Add more fields as needed
])

// Define the dynamic button
const dynamicButton = reactive({
  label: 'Sign In',
  icon: 'pi pi-user',
  buttonClass: 'w-full',
  clickAction: signIn,
})

// Define the dynamic "Remember me" checkbox and "Forgot password?" link
const dynamicCheckbox = reactive({
  checkboxId: 'rememberme1',
  checkboxLabel: 'Remember me',
  containerClass: 'flex align-items-center justify-content-between mb-6',
  checkboxWrapperClass: 'flex align-items-center',
  checkboxClass: 'mr-2',
  checkboxLabelClass: 'font-medium no-underline ml-2 text-blue-500 cursor-pointer',
  forgotPasswordClass: 'font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer',
})

// Create a reactive object to hold dynamic v-model bindings
const fieldModel = reactive({})

// Initialize v-model bindings for each field
for (const field of dynamicFields.value)
  fieldModel[field.id] = ''

// Function to handle sign-in
function signIn() {
  // Access the values of dynamic input fields using fieldModel
  for (const field of dynamicFields.value)
    console.log(`${field.label}: ${fieldModel[field.id]}`)

  // Reset the values of dynamic input fields after sign-in
  for (const field of dynamicFields.value)
    fieldModel[field.id] = ''
}

// Function for the "Forgot password?" link
function forgotPassword() {
  // Handle the "Forgot password?" link action here
  console.log('Forgot password clicked')
}
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <!-- ... (your existing HTML) -->
    </div>

    <div>
      <div v-for="(field, index) in dynamicFields" :key="index">
        <label :for="field.id" :class="field.labelClass">{{ field.label }}</label>
        <InputText :id="field.id" v-model="fieldModel[field.id]" :type="field.type" :class="field.inputClass"
          class="w-full mb-3" />
      </div>

      <!-- Dynamic "Remember me" checkbox and "Forgot password?" link -->
      <div :class="dynamicCheckbox.containerClass">
        <div :class="dynamicCheckbox.checkboxWrapperClass">
          <Checkbox :id="dynamicCheckbox.checkboxId" v-model="checked" :binary="true"
            :class="dynamicCheckbox.checkboxClass" />
          <label :for="dynamicCheckbox.checkboxId" :class="dynamicCheckbox.checkboxLabelClass">{{
            dynamicCheckbox.checkboxLabel }}</label>
        </div>
        <a :class="dynamicCheckbox.forgotPasswordClass" @click="forgotPassword">Forgot password?</a>
      </div>

      <!-- Dynamic button -->
      <Button :label="dynamicButton.label" :icon="dynamicButton.icon" :class="dynamicButton.buttonClass"
        @click="dynamicButton.clickAction" />
    </div>
</div></template>
