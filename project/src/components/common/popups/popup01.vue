<template>
	<div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
		<div class="bg-gray-700 bg-opacity-50 absolute inset-0" @click="closePopup"></div>
		<div class="bg-white rounded-lg relative overflow-hidden" :style="`width:${width}px`">
			<div class="flex justify-between items-center bg-[#F8F8F8] border-b border-gray-300">
				<h3 class="text-xl p-2 pl-4 font-bold">{{ title }}</h3>
				<button @click="closePopup" class="p-2 pr-4 text-gray-500 hover:text-gray-700">
					<img :src="imageSrc('common', 'ico_close_pop')" alt="" />
				</button>
			</div>
			<div class="p-4">
				<slot></slot>
				<!-- 내용 삽입 위치 -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { useUtilities } from '@/utils/common'
import { ref } from 'vue'

defineProps({
	title: {
		type: String,
		required: true,
	},
	isVisible: {
		type: Boolean,
		required: true,
	},
	width: {
		type: String,
		default: '500',
	},
})

const { setImageSrc } = useUtilities()
const imageSrc = (folder, img) => setImageSrc(folder, img)

const emit = defineEmits(['update:isVisible'])

const closePopup = () => {
	emit('update:isVisible', false) // 부모 컴포넌트로 팝업 숨기기 이벤트 전송
}
</script>

<style scoped>
/* 스타일은 Tailwind CSS를 사용하므로 별도의 CSS 작성 없이 위 코드에서 스타일링 가능합니다 */
</style>
