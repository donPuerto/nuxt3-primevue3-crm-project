<script setup>
// Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth',
  meta: {
    breadcrumb: ['Dashboard', 'Profile'],
  },
})

const { layoutConfig } = useLayout()
</script>

<template>
  <div>Profile</div>
  <LayoutsDefaultAppTest />
</template>

<style>

</style>
