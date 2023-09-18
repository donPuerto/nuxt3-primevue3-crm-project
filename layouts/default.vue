<script lang="ts" setup>
const { layoutConfig, layoutState, isSidebarActive } = useLayout();
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
		'layout-sidebar-anchored': layoutState.anchored.value
	};
});


onMounted(() => {
	console.log('Default Layout')
})

</script>

<template>
	<div :class="['layout-container', { ...containerClass }]">
		<Sidebar ref="sidebarRef" />
		<div class="layout-content-wrapper">
			<Topbar ref="topbarRef" />
			<div class="layout-content">
				<slot />
			</div>
		</div>
	</div>
</template>

