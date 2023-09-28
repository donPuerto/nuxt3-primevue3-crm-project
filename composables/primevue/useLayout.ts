import { computed, reactive, toRefs } from 'vue'

const layoutConfig = reactive({
  ripple: false,
  inputStyle: 'outlined',
  menuMode: 'static',
  menuTheme: 'colorScheme',
  colorScheme: 'light',
  theme: 'indigo',
  scale: 14,
  darkTheme: false,
})

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  sidebarActive: false,
  anchored: false,
  overlaySubmenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
})

export function useLayout() {
  const setScale = (scale: number) => {
    layoutConfig.scale = scale
  }

  const setActiveMenuItem = (item: { value?: any } | null) => {
    layoutState.activeMenuItem = item !== null && item.value !== undefined ? item.value : item
  }

  const onMenuToggle = () => {
    // By default, menuMode is static
    // If overlay is true, overlayMenuActive is set to true
    if (layoutConfig.menuMode === 'overlay')
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive

    // Is Desktop or Mobile?
    // It return true or false
    if (window.innerWidth > 991)
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive

    else
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
  }

  const onProfileSidebarToggle = () => {
    layoutState.profileSidebarVisible = !layoutState.profileSidebarVisible
  }

  const onConfigSidebarToggle = () => {
    layoutState.configSidebarVisible = !layoutState.configSidebarVisible
  }

  const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.overlaySubmenuActive)

  const isDarkTheme = computed(() => layoutConfig.darkTheme)

  const isDesktop = computed(() => window.innerWidth > 991)

  const isSlim = computed(() => layoutConfig.menuMode === 'slim')
  const isSlimPlus = computed(() => layoutConfig.menuMode === 'slim-plus')

  const isHorizontal = computed(() => layoutConfig.menuMode === 'horizontal')

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    setScale,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    setActiveMenuItem,
    onProfileSidebarToggle,
    onConfigSidebarToggle,
    isSlim,
    isSlimPlus,
    isHorizontal,
    isDesktop,
  }
}
