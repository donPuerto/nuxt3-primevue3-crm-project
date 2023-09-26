<script lang="ts" setup>

</script>

<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
    <div class="font-bold text-3xl">
      <span class="text-blue-600">OneDP CRM App</span>
    </div>
    <div class="text-700 mb-8 text-sm">
      My Goal is embarking on an ambitious project to enhance and modernize our existing Customer Relationship
      Management (CRM) system. The CRM system plays a pivotal role in our business operations by managing customer
      interactions, sales processes, and customer data. The primary goal of this project is to improve our CRM system's
      functionality, scalability, and user experience, ensuring it continues to meet the evolving needs of our
      organization and customers.
    </div>

    <div class="flex justify-content-center gap-2 px-5">
      <Button label="Signup" aria-label="Signup" />
      <Button label="Signin" aria-label="Signin" />
      <Button label="Signout" aria-label="Signout" />
    </div>
    <div class="grid mt-5">
      <div class="col-12 md:col-4 mb-4 px-5">
        <span class="p-3 shadow-2 mb-2 inline-block surface-card border-round-lg">
          <IconsNuxt width="50px" height="40px" />
        </span>

        <div class="text-900 text-xl mb-3 font-medium">
          Nuxt
        </div>
        <span class="text-700 line-height-3">Build your next Vue.js application with confidence using Nuxt. An open source
          framework under MIT license that makes web development simple and powerful.</span>
      </div>
      <div class="col-12 md:col-4 mb-4 px-5">
        <span class="p-3 shadow-2 mb-2 inline-block surface-card border-round-lg">
          <IconsSupabase width="50px" height="40px" />
        </span>
        <div class="text-900 text-xl mb-3 font-medium">
          Supabase
        </div>
        <span class="text-700 line-height-3">Supabase is an open source Firebase alternative.
          Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime
          subscriptions, Storage, and Vector embeddings.</span>
      </div>
      <div class="col-12 md:col-4 mb-4 px-5">
        <span class="p-4 shadow-2 mb-2 mx-2 inline-block surface-card border-round-lg">
          <i class="pi pi-prime text-5xl text-blue-500" />
        </span>
        <div class="text-900 text-xl mb-3 font-medium">
          Primevue
        </div>
        <span class="text-700 line-height-3">Over 90 Vue UI Components with top-notch quality to help you implement all
          your UI requirements in style.</span>
      </div>
    </div>
  </div>
</template>

<style>
</style>
