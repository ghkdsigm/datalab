<template>
	<button
		type="button"
		class="inline-flex flex-row items-center mr-12 hover:text-primary font-md relative"
		v-for="(item, idx) in menuItems"
		:class="{ 'text-primary font-bold': selectedIndex === idx }"
		:key="idx"
		@click="moveToPage(item.to, idx)"
	>
		<!-- 메뉴명 -->
		<span>{{ item.title }}</span>

		<!-- 애니메이션 효과 바 -->
		<!-- <span
		v-if="selectedIndex === idx"
		class="absolute top-6
		 bottom-0 left-0 w-full h-1 bg-primary"
		></span> -->
		<span
			class="absolute top-7 bottom-0 left-0 w-full h-1 bg-primary transition-transform duration-300 ease-out origin-left"
			:class="{ 'scale-x-100 opacity-100': selectedIndex === idx, 'scale-x-0 opacity-0': selectedIndex !== idx }"
		></span>
	</button>
</template>

<script>
import { ref, defineComponent, computed, onMounted, toRefs, watch, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUtilities } from '@/utils/common'

export default defineComponent({
	name: 'HeaderMenu',
	props: {
		menuItems: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['selectedIndex'],
	setup(props, { emit }) {
		const router = useRouter()
		const route = useRoute()
		const selectedIndex = ref(null)
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)

		const { getImageSrc } = useUtilities()
		const imageSrc = icon => getImageSrc('bottom', icon)

		const moveToPage = (url, index) => {
			console.log('idx', index)
			if (index !== undefined && index !== null) {
				selectedIndex.value = index
			}
			router.push({ path: url })
		}

		watch(
			() => currentPath.value,
			async newval => {
				if (newval) {
					props.menuItems.forEach((v, i) => {
						if (currentPath.value.includes(v.to)) {
							selectedIndex.value = i
							emit('selectedIndex', selectedIndex.value)
						}
					})
				}
			},
		)

		onMounted(() => {
			props.menuItems.forEach((v, i) => {
				if (currentPath.value.includes(v.to)) {
					selectedIndex.value = i
					emit('selectedIndex', selectedIndex.value)
				}
			})
		})

		return {
			moveToPage,
			selectedIndex,
			currentRoutes,
			currentPath,
			imageSrc,
		}
	},
})
</script>

<style lang="scss" scoped>
/* 초기 상태 */
.scale-x-0 {
	transform: scaleX(0);
}

/* 선택됐을 때 (애니메이션 적용) */
.scale-x-100 {
	transform: scaleX(1);
	transition: transform 0.3s ease-out;
}
</style>
