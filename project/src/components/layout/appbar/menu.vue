<template>
	<!-- 메뉴버튼 -->
	<button
		type="button"
		class="inline-flex flex-row items-center px-5 hover:text-primary font-md"
		v-for="(item, idx) in menuItems"
		:class="{
			'text-primary font-bold !important': selectedIndex === idx,
		}"
		:key="idx"
		@click="moveToPage(item.to, idx)"
	>
		<!-- 메뉴명 -->
		<span class="">{{ item.title }}</span>
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

<style lang="scss" scoped></style>
