<template>
	<div
		class="relative h-[56px] top-0 left-0 z-50 flex items-center justify-between px-6 py-4 bg-white w-full shadow-md"
	>
		<div class="logo cursor-pointer flex absolute 3xl:hidden block">
			<img :src="imageSrc('common', 'logo')" alt="푸터 로고" @click="goToHome" class="pr-4" />
			<span class="subName">S&OP 수량 예측</span>
		</div>
		<div class="mx-auto w-[1280px] flex">
			<nav class="flex">
				<HeaderMenu :menuItems="menuItems" @selectedIndex="handleSelectMenu" />
			</nav>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Menu } from '@/data/common.js'
import { useUtilities } from '@/utils/common'
import HeaderMenu from '@/components/layout/appbar/menu.vue'

export default {
	name: 'Header',
	components: {
		HeaderMenu,
	},
	setup(props, { emit }) {
		const menuItems = ref(Menu)
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const menuIdx = ref(null)

		onMounted(() => {})

		const handleSelectMenu = idx => {
			menuIdx.value = idx
			emit('menuIdx', menuIdx.value)
		}

		return {
			menuItems,
			imageSrc,
			handleSelectMenu,
		}
	},
}
</script>

<style lang="scss" scoped>
.subName {
	border: 1px solid #e6e6e6;
	border-radius: 99px;
	padding: 6px 10px;
}
</style>
