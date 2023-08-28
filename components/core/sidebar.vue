<template>
  <div class="card flex justify-content-center">
      <Sidebar v-model:visible="visible">
          <h2>Sidebar</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <template #header>
              <div class="flex">
                  <button class="p-sidebar-icon p-link mr-2">
                      <span class="pi pi-print" />
                  </button>
                  <button class="p-sidebar-icon p-link mr-2">
                      <span class="pi pi-search" />
                  </button>
              </div>
          </template>
      </Sidebar>
      <Button icon="pi pi-plus" @click="visible = true" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
