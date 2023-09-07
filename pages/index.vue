<script setup>
// Composables
const { signOut } = useAuth()

function show() {
  console.log('Show Toast')
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 })
}
// const { updateProfile } = useUseProfilesAPI()
</script>

<template>
  <Toast />
  <br>
  <NuxtLink to="/auth/signin">
    Signin
  </NuxtLink><br>
  <br>
  <NuxtLink to="/auth/signup">
    Signup
  </NuxtLink><br>

  <!-- <button @click="updateProfile">
    Updateb profile
  </button> -->

  <br>
  <button @click="showToast()">
    Show Toast
  </button>

  <br>

  <button @click="signOut">
    Logout
  </button>
</template>

<style></style>
