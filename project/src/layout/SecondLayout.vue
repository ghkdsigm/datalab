<template>
	<div>
		<!-- Header -->
		<header class="fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-4 bg-white w-full shadow-md">
			<div class="logo cursor-pointer">
				<img :src="imageSrc('common', 'logo')" alt="푸터 로고" @click="goToHome" />
			</div>
			<div class="w-[1200px]">
				<nav class="flex">
					<HeaderMenu :menuItems="menuItems" />
				</nav>
			</div>
			<div class="flex items-center space-x-4">
				<div>아이콘 1</div>
				<div>아이콘 2</div>
				<div>아이콘 3</div>
			</div>
		</header>

		<!--Main Section-->
		<div class="relative mt-[50px]">
			<div class="mx-auto h-full">
				<div class="flex flex-col min-h-screen">
					<!-- Top Content -->
					<div class="bg-[#F8F8F8] py-[30px]">
						<div class="container mx-auto max-w-[1280px] text-left">
							<h1 class="text-[#262626] text-[24px] font-bold">
								{{ currentMenu?.title }}
							</h1>
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
import { Menu } from '@/data/common.js'
import HeaderMenu from '@/components/layout/appbar/menu.vue'
import Footer from '@/components/layout/appbar/footer.vue'
import { useUtilities } from '@/utils/common'

export default {
	components: {
		HeaderMenu,
		Footer,
	},
	setup() {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes)
		const routes = ref([])
		const routers = useRouter()
		const menuItems = ref(Menu)
		const menuIdx = ref(null)
		const currentMenu = computed(() => menuItems.value[menuIdx.value])

		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		const goToHome = () => {
			routers.push('/')
		}

		onBeforeMount(() => {
			//routes.value = router.options.routes
			routes.value = router.options.routes.filter(route => route.meta.isMenu == true)
		})

		onMounted(() => {})

		const handleSelectMenu = idx => {
			menuIdx.value = idx
		}

		return {
			routes,
			router,
			currentPath,
			goToHome,
			handleSelectMenu,
			menuIdx,
			menuItems,
			currentMenu,
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
