<template>
	<div>
		<!-- Header -->
		<Header />

		<!--Main Section-->
		<div class="relative mt-[64px]">
			<div class="mx-auto h-full">
				<div class="flex flex-col min-h-screen">
					<!-- Top Content -->
					<div class="bg-[#262626] py-[40px]">
						<div class="container mx-auto max-w-[1280px]">
							<div class="flex justify-between gap-6 mb-12">
								<BoardSearch />
							</div>
							<div class="flex justify-between gap-6">
								<Board />
							</div>
						</div>
					</div>
					<!-- Main Content -->
					<main class="flex-grow bg-white py-8">
						<div class="container mx-auto max-w-[1280px] flex gap-6">
							<router-view v-slot="{ Component }">
								<component :is="Component"></component>
							</router-view>
						</div>
					</main>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<Footer />
	</div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { useUtilities } from '@/utils/common'
import Footer from '@/components/layout/appbar/footer.vue'
import BoardSearch from '@/components/mdf/board/boardsearch.vue'
import Board from '@/components/mdf/board/board.vue'

import { useServiceStore } from '@/store/service'

export default {
	name: 'DefaultLayout',
	components: {
		Footer,
		BoardSearch,
		Board,
	},
	setup() {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)
		const routes = ref([])
		const routers = useRouter()
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const serviceStore = useServiceStore()
		const basemonth = ref([])

		const settingBasemonth = async () => {
			const params = 'bm_retail'
			await serviceStore.actGetBasemonth(params) // 비동기 작업 기다리기

			basemonth.value = serviceStore.getBasemonth
		}

		onMounted(async () => {
			await settingBasemonth()
		})

		const goToHome = () => {
			routers.push('/')
		}

		onBeforeMount(() => {
			//routes.value = router.options.routes
			routes.value = router.options.routes.filter(route => route.meta.isMenu == true)
		})

		return {
			routes,
			router,
			currentPath,
			goToHome,
			imageSrc,
		}
	},
}
</script>

<style scoped>
.screenArea {
	height: calc(100% - 10vh);
}
</style>
