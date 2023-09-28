<script lang="ts" setup>
import { useLayout } from '@/composables/primevue/useLayout'

const { layoutConfig, layoutState, isSidebarActive } = useLayout()

const outsideClickListener = ref<EventListener | null>(null)
const sidebarRef = ref<HTMLElement | null>(null)
const topbarRef = ref<HTMLElement | null>(null)

watch(isSidebarActive, (newVal) => {
  if (newVal)
    bindOutsideClickListener()
  else
    unbindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

const containerClass = computed(() => {
  return {
    'layout-light': layoutConfig.colorScheme.value === 'light',
    'layout-dim': layoutConfig.colorScheme.value === 'dim',
    'layout-dark': layoutConfig.colorScheme.value === 'dark',
    'layout-colorscheme-menu': layoutConfig.menuTheme.value === 'colorScheme',
    'layout-primarycolor-menu': layoutConfig.menuTheme.value === 'primaryColor',
    'layout-transparent-menu': layoutConfig.menuTheme.value === 'transparent',
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-slim': layoutConfig.menuMode.value === 'slim',
    'layout-slim-plus': layoutConfig.menuMode.value === 'slim-plus',
    'layout-horizontal': layoutConfig.menuMode.value === 'horizontal',
    'layout-reveal': layoutConfig.menuMode.value === 'reveal',
    'layout-drawer': layoutConfig.menuMode.value === 'drawer',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-input-filled': layoutConfig.inputStyle.value === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple.value,
    'layout-sidebar-active': layoutState.sidebarActive.value,
    'layout-sidebar-anchored': layoutState.anchored.value,
  }
})

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = ((event: Event) => {
      const mouseEvent = event as MouseEvent
      if (isOutsideClicked(mouseEvent)) {
        layoutState.overlayMenuActive.value = false
        layoutState.overlaySubmenuActive.value = false
        layoutState.staticMenuMobileActive.value = false
        layoutState.menuHoverActive.value = false
      }
    }) as EventListener
    document.addEventListener('click', outsideClickListener.value)
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value)
    outsideClickListener.value = null
  }
}

function isOutsideClicked(event: MouseEvent) {
  const sidebarEl = sidebarRef.value
  const topbarEl = topbarRef.value?.querySelector('.topbar-menubutton')

  if (!sidebarEl || !topbarEl)
    return false

  return !(
    sidebarEl.isSameNode(event.target as Node)
    || sidebarEl.contains(event.target as Node)
    || topbarEl.isSameNode(event.target as Node)
    || topbarEl.contains(event.target as Node)
  )
}
</script>

<template>
  <div class="layout-container" :class="[{ ...containerClass }]">
    <div class="layout-content-wrapper">
      <slot />
    </div>
    <Toast position="top-right" />
    <div class="layout-mask" />
  </div>
</template>

<style>
</style>
