<script setup lang="ts">
// Define props as objects
const props = defineProps({
  fontSize: {
    type: Object,
    default: () => ({ class: 'text-base' }), // Default value for fontSize prop
  },
  fontWeight: {
    type: Object,
    default: () => ({ class: 'font-normal' }), // Default value for fontWeight prop
  },
  textColor: {
    type: Object,
    default: () => ({ class: 'text-400' }), // Default value for textColor prop
  },
  message: {
    type: String,
    default: 'ALL RIGHTS RESERVED', // Default value for message prop
  },
})

const year = new Date().getFullYear().toString()
</script>

<template>
  <div :class="[fontSize.class, fontWeight.class, textColor.class]">
    <span>© </span>{{ year }} {{ message }}
  </div>
</template>

<style>

</style>
