<script lang="ts" setup>
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

</script>

<template>
    <div :class="['layout-container', { ...containerClass }]">
        <AppSidebar ref="sidebarRef" />

        <div class="layout-content-wrapper">
            <AppTopbar ref="topbarRef" />
            <AppBreadCrumb class="content-breadcrumb"></AppBreadCrumb>
            <div class="layout-content">
                <slot />
            </div>
        </div>

        <AppProfileSidebar />
        <AppConfig />

        <Toast></Toast>
        <div class="layout-mask"></div>
    </div>
</template>
