<script lang="ts" setup>
const router = useRouter()
function openTermsOfService() {
  window.open('/auth/terms', '_blank')
}

function openPrivacyPolicy() {
  window.open('/auth/privacy', '_blank')
}
</script>

<template>
  <div>
    By proceeding, you consent to OneDP app
    <a class="link" @click="openTermsOfService">Terms of Service</a> and
    <a class="link" @click="openPrivacyPolicy">Privacy Policy</a>, as well as to receive occasional emails containing updates.
  </div>
</template>

<style scoped>
.link {
  text-decoration: underline;
  color: #007BFF; /* Change to your desired link color */
  cursor: pointer;
}
</style>
