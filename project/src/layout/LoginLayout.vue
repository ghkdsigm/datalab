<template>
	<div>
		<!--Login Section-->
		<router-view v-slot="{ Component }">
            <component :is="Component"></component>
        </router-view>	
	</div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

export default {
	name: 'LoginLayout',
	setup() {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes)
		const routes = ref([])
		

		onBeforeMount(() => {
			routes.value = router.options.routes.filter(route => route.meta.isMenu == true)
		})

		onMounted(() => {})

		return {
			routes,
			router,
			currentPath,			
		}
	},
}
</script>

<style scoped>
.screenArea {
	height: calc(100% - 10vh);
}
</style>
