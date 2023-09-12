<script setup lang="ts">
const props = defineProps<{
  routerPath: string
  message: string
  actionText: string
}>()
const router = useRouter()

function navigateToPage() {
  router.push(props.routerPath)
}
</script>

<template>
  <div class="flex justify-content-center align-items-center">
    <p class="centered-message">
      {{ message }}
      <span
        class="link"
        @click="navigateToPage"
      >{{ actionText }}</span>
    </p>
  </div>
</template>

<style scoped>
.centered-message {
  text-align: center;
  text-justify: distribute; /* Center-align the text within the <p> element */
}
.link {
  text-decoration: underline;
  color: #007BFF; /* Change to your desired link color */
  cursor: pointer;
}
</style>
