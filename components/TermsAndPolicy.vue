<script lang="ts" setup>
function openTermsOfService() {
  window.open('https://www.supabase.io/terms', '_blank')
}

function openPrivacyPolicy() {
  window.open('https://www.supabase.io/privacy', '_blank')
}
</script>

<template>
  <div>
    By proceeding, you consent to OneDP app
    <a target="_blank" class="link" @click="openTermsOfService">Terms of Service</a> and
    <a target="_blank" class="link" @click="openPrivacyPolicy">Privacy Policy</a>, as well as to receive occasional emails containing updates.
  </div>
</template>

<style scoped>
.link {
  text-decoration: underline;
  color: #007BFF; /* Change to your desired link color */
  cursor: pointer;
}
</style>
