<template>
	<div class="w-full h-full absolute overflow-hidden">
		<!--Main Section-->
		<div class="relative">
			<div class="mx-auto h-full">
				<router-view v-slot="{ Component }">
					<component :is="Component"></component>
				</router-view>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

export default {
	setup() {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)
		const routes = ref([])

		onBeforeMount(() => {
			routes.value = router.options.routes
			//routes.value = router.options.routes.filter(route => route.meta.isMenu == true)
		})

		onMounted(() => {})
		// onBeforeUpdate(() => {
		// })
		// onUpdated(() => {
		// })
		// onBeforeUnmount(() => {
		// })
		// onUnmounted(() => {
		// })

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
