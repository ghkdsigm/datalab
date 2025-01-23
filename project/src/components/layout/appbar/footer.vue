<template>
	<!-- Footer -->
	<footer class="flex items-center justify-between px-6 py-4 bg-[#F8F8F8] text-white w-full">
		<div class="logo">
			<img :src="imageSrc('common', 'logo')" alt="푸터 로고" />
		</div>
		<div class="text-sm text-[#9E9E9E]">Copyright ⓒ Dongwha, All rights reserved</div>
	</footer>
</template>

<script>
import { ref, defineComponent, computed, onMounted, toRefs, watch, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUtilities } from '@/utils/common'

export default defineComponent({
	name: 'CommonLayoutAppbarFooter',

	setup(props) {
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		return {
			imageSrc,
		}
	},
})
</script>

<style lang="scss" scoped></style>
