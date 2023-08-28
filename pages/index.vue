<script setup>
// Composables
const { signOut } = useAuth()
</script>

<template>
  <NuxtLink to="/auth/signin">
    Auth
  </NuxtLink><br>

  <button @click="signOut">
    Logout
  </button>
</template>

<style></style>
