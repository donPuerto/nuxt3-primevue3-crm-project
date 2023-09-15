<script setup>
import AppBreadcrumb from './AppBreadcrumb.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useLayout } from '@/layout/composables/layout'

const { onMenuToggle, onProfileSidebarToggle, onConfigSidebarToggle } = useLayout()

const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)

onMounted(() => {
  bindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event))
        topbarMenuActive.value = false
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}
function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}
function isOutsideClicked(event) {
  if (!topbarMenuActive.value)
    return

  const sidebarEl = document.querySelector('.layout-topbar-menu')
  const topbarEl = document.querySelector('.layout-topbar-menu-button')

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}

function showProfileSidebar() {
  onProfileSidebarToggle()
}
function onConfigButtonClick() {
  onConfigSidebarToggle()
}
</script>

<template>
  <div class="layout-topbar">
    <div class="topbar-start">
      <Button type="button" class="topbar-menubutton p-link p-trigger" @click="onMenuToggle">
        <i class="pi pi-bars" />
      </Button>

      <AppBreadcrumb class="topbar-breadcrumb" />
    </div>

    <div class="topbar-end">
      <ul class="topbar-menu">
        <li class="topbar-search">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText type="text" placeholder="Search" class="w-12rem sm:w-full" />
          </span>
        </li>
        <li class="ml-3">
          <Button icon="pi pi-cog" text rounded severity="secondary" @click="onConfigButtonClick" />
        </li>
        <li class="topbar-profile">
          <Button type="button" class="p-link" @click="showProfileSidebar">
            <img src="/demo/images/avatar/avatar.png" alt="Profile">
          </Button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
