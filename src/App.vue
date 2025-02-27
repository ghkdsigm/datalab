<template>
	<Layout></Layout>
	<Chatbot />
</template>

<script>
import { ref, onBeforeMount, onMounted, onUnmounted, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import { useUtilities } from '@/utils/common'
export default {
	name: 'App',
	components: {
		Layout,
	},
	setup() {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)

		onMounted(() => {
			document.documentElement.setAttribute('translate', 'no')
		})

		return {
			currentPath,
		}
	},
}
</script>

<style lang="scss">
@import './assets/styles/main';
.screenArea {
	height: calc(100% - 10vh);
}
</style>
