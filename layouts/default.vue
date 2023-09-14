<script setup>
const { layoutConfig, layoutState, isSidebarActive } = useLayout()

const outsideClickListener = ref(null)
const sidebarRef = ref(null)
const topbarRef = ref(null)

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
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false
        layoutState.overlaySubmenuActive.value = false
        layoutState.staticMenuMobileActive.value = false
        layoutState.menuHoverActive.value = false
      }
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
  const sidebarEl = sidebarRef?.value.$el
  const topbarEl = topbarRef?.value.$el.querySelector('.topbar-menubutton')

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}
</script>

<template>
  <div class="layout-preloader-container">
    <div>
      <div class="layout-preloader">
        <div class="layout-container" :class="[{ ...containerClass }]">
          <div class="layout-content-wrapper">
            <div class="layout-content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '~/assets/App.scss';
</style>
