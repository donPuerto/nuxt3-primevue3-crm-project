<script lang="ts" setup>
const message = ref('Hello from Child')

function changeMessage() {
  message.value = 'New Message from Child'
}

provide('message', message)
</script>

<template>
  <div>Test Component</div>
  <Button @click="changeMessage">
    Change Message
  </Button>
</template>

<style>

</style>
