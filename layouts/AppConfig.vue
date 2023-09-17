<script setup>
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'
import Sidebar from 'primevue/sidebar'
import PrimeVue from 'primevue/config'


defineProps({
  simple: {
    type: Boolean,
    default: false,
  },
})

const componentThemes = ref([
  { name: 'indigo', color: '#6366F1' },
  { name: 'blue', color: '#3B82F6' },
  { name: 'purple', color: '#8B5CF6' },
  { name: 'teal', color: '#14B8A6' },
  { name: 'cyan', color: '#06b6d4' },
  { name: 'green', color: '#10b981' },
  { name: 'orange', color: '#f59e0b' },
  { name: 'pink', color: '#d946ef' },
])

const scales = ref([12, 13, 14, 15, 16])

const { setScale, layoutConfig, layoutState, onConfigSidebarToggle } = useLayout()

watch(layoutConfig.menuMode, (newVal) => {
  if (newVal === 'static')
    layoutState.staticMenuDesktopInactive.value = false
})

function onConfigButtonClick() {
  onConfigSidebarToggle()
}

const colorScheme = ref(layoutConfig.colorScheme.value)

function changeColorScheme(colorScheme) {
  const themeLink = document.getElementById('theme-link')
  const themeLinkHref = themeLink.getAttribute('href')
  const currentColorScheme = `theme-${layoutConfig.colorScheme.value.toString()}`
  const newColorScheme = `theme-${colorScheme}`
  const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme)

  replaceLink(themeLink, newHref, () => {
    layoutConfig.colorScheme.value = colorScheme
  })
}

function changeTheme(theme) {
  const themeLink = document.getElementById('theme-link')
  const themeHref = themeLink.getAttribute('href')
  const newHref = themeHref.replace(layoutConfig.theme.value, theme)

  replaceLink(themeLink, newHref, () => {
    layoutConfig.theme.value = theme
  })
}

function replaceLink(linkElement, href, onComplete) {
  if (!linkElement || !href)
    return

  const id = linkElement.getAttribute('id')
  const cloneLinkElement = linkElement.cloneNode(true)

  cloneLinkElement.setAttribute('href', href)
  cloneLinkElement.setAttribute('id', `${id}-clone`)

  linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling)

  cloneLinkElement.addEventListener('load', () => {
    linkElement.remove()

    const element = document.getElementById(id) // re-check
    element && element.remove()

    cloneLinkElement.setAttribute('id', id)
    onComplete && onComplete()
  })
}
function decrementScale() {
  setScale(layoutConfig.scale.value - 1)
  applyScale()
}
function incrementScale() {
  setScale(layoutConfig.scale.value + 1)
  applyScale()
}
function applyScale() {
  document.documentElement.style.fontSize = `${layoutConfig.scale.value}px`
}

function onChangeRipple() {
  PrimeVue.ripple = !PrimeVue.ripple
}
</script>

<template>
  <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick()">
    <i class="pi pi-cog" />
  </button>

  <Sidebar v-model:visible="layoutState.configSidebarVisible.value" position="right" class="layout-config-sidebar w-20rem">
    <h5>Themes</h5>
    <div class="flex flex-wrap row-gap-3">
      <div v-for="(theme, i) in componentThemes" :key="i" class="w-3">
        <Button
          :auto-focus="layoutConfig.theme === theme.name"
          class="cursor-pointer p-link w-2rem h-2rem border-circle flex-shrink-0 flex align-items-center justify-content-center"
          :style="{ 'background-color': theme.color }"
          @click="() => changeTheme(theme.name)"
        >
          <i v-if="theme.name === layoutConfig.theme.value" class="pi pi-check text-white" />
        </Button>
      </div>
    </div>

    <h5>Scale</h5>
    <div class="flex align-items-center">
      <Button icon="pi pi-minus" type="button" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]" @click="decrementScale()" />
      <div class="flex gap-2 align-items-center">
        <i v-for="s in scales" :key="s" class="pi pi-circle-fill text-300" :class="{ 'text-primary-500': s === layoutConfig.scale.value }" />
      </div>
      <Button icon="pi pi-plus" type="button" p-button class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]" @click="incrementScale()" />
    </div>

    <template v-if="!simple">
      <h5>Menu Type</h5>
      <div class="flex flex-wrap row-gap-3">
        <div class="flex align-items-center gap-2 w-6">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="static" input-id="mode1" />
          <label for="mode1">Static</label>
        </div>

        <div class="flex align-items-center gap-2 w-6">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="overlay" input-id="mode2" />
          <label for="mode2">Overlay</label>
        </div>
        <div class="flex align-items-center gap-2 w-6">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="slim" input-id="mode3" />
          <label for="mode2">Slim</label>
        </div>
        <div class="flex align-items-center gap-2 w-6">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="slim-plus" input-id="mode4" />
          <label for="mode3">Slim +</label>
        </div>
        <div class="flex align-items-center gap-2 w-6">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="reveal" input-id="mode5" />
          <label for="mode4">Reveal</label>
        </div>
        <div class="flex align-items-center gap-2 w-6">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="drawer" input-id="mode6" />
          <label for="mode5">Drawer</label>
        </div>
        <div class="flex align-items-center gap-2 w-6">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="horizontal" input-id="mode2" />
          <label for="mode2">Horizontal</label>
        </div>
      </div>
      <h5>Menu Theme</h5>
      <div class="field-radiobutton">
        <RadioButton v-model="layoutConfig.menuTheme.value" :checked="layoutConfig.menuTheme === 'colorScheme'" name="menuTheme" value="colorScheme" input-id="mode1" />
        <label for="mode1">Color Scheme</label>
      </div>

      <div class="field-radiobutton">
        <RadioButton v-model="layoutConfig.menuTheme.value" :checked="layoutConfig.menuTheme === 'primaryColor'" name="menuTheme" value="primaryColor" input-id="mode2" />
        <label for="mode2">Primary Color</label>
      </div>
      <div class="field-radiobutton">
        <RadioButton v-model="layoutConfig.menuTheme.value" :checked="layoutConfig.menuTheme === 'transparent'" name="menuTheme" value="transparent" input-id="mode3" />
        <label for="mode2">Transparent</label>
      </div>
    </template>

    <h5>Color Scheme</h5>
    <div class="field-radiobutton flex-1">
      <RadioButton v-model="colorScheme" name="colorScheme" value="light" input-id="outlined_input" @change="() => changeColorScheme('light')" />
      <label for="outlined_input">Light</label>
    </div>
    <div class="field-radiobutton flex-1">
      <RadioButton v-model="colorScheme" name="colorScheme" value="dim" input-id="filled_input" @change="() => changeColorScheme('dim')" />
      <label for="filled_input">Dim</label>
    </div>
    <div class="field-radiobutton flex-1">
      <RadioButton v-model="colorScheme" name="colorScheme" value="dark" input-id="filled_input" @change="() => changeColorScheme('dark')" />
      <label for="filled_input">Dark</label>
    </div>

    <template v-if="!simple">
      <h5>Input Style</h5>
      <div class="flex">
        <div class="field-radiobutton flex-1">
          <RadioButton v-model="layoutConfig.inputStyle.value" name="inputStyle" value="outlined" input-id="outlined_input" />
          <label for="outlined_input">Outlined</label>
        </div>
        <div class="field-radiobutton flex-1">
          <RadioButton v-model="layoutConfig.inputStyle.value" name="inputStyle" value="filled" input-id="filled_input" />
          <label for="filled_input">Filled</label>
        </div>
      </div>

      <h5>Ripple Effect</h5>
      <InputSwitch v-model="layoutConfig.ripple.value" @change="onChangeRipple" />
    </template>
  </Sidebar>
</template>

<style lang="scss" scoped></style>
