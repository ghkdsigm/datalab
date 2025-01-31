<template>
	<section class="flex justify-between gap-6 w-full">
		<div class="flex flex-col gap-6 flex-[7] sticky-container">
			<div class="mb-2 p-4 border rounded-lg bg-white shadow-black">
				<div class="flex justify-between items-center">
					<strong class="text-cyan-500 font-bold">
						<img :src="imageSrc('mdf', 'ico_talk')" alt="초기화" class="inline-block mr-1" />
						<span class="font-bold">예측 결과 요약</span>
					</strong>
					<span class="text-sm text-gray-800" @click="showPopup = true">더보기</span>
				</div>
				<p class="max-w-full mt-1 text-sm overflow-hidden text-ellipsis line-clamp-1 text-left text-primaryBlack">
					완만한 상승세를 보일 가능성이 있음. 특히 부동산 및 주택 시장 소비 심리지수가 긍정적인 으로 움직이는 상황에서
					MDF 또한 비슷하게 움직일 가능성이 높음. 하지만 금리 및 정책 변화 등 불확실성이 존재할 수 있음
				</p>
			</div>

			<div class="p-4 border rounded-lg bg-white shadow-black">
				<div class="flex justify-between items-center mb-5">
					<strong class="text-xl text-gray-800 font-bold">보드 예측 결과</strong>
					<span class="text-sm text-gray-800">상세보기</span>
				</div>
				<div class="w-full h-[300px] bg-gray-200"></div>
			</div>
		</div>

		<div class="flex flex-col gap-6 flex-[5]">
			<div class="mb-2 p-4 border rounded-lg bg-gray-50">
				<div class="flex justify-between items-center mb-3">
					<Select01 :options="options" :selected-options="selectedOptions" @select="handleSelectChange" />
					<button @click="handleReset" class="p-2 border rounded bg-white hover:bg-gray-100">
						<img :src="imageSrc('mdf', 'ico_refresh')" alt="초기화" class="inline-block mr-2" />
						초기화
					</button>
				</div>

				<div v-if="selectedOptions.length" class="flex flex-wrap gap-2 mt-3">
					<div
						v-for="option in selectedOptions"
						:key="option"
						class="flex items-center px-3 py-1 border rounded-full bg-white"
					>
						<span class="text-gray-800 mr-2">{{ option }}</span>
						<span
							class="w-4 h-4 flex items-center justify-center bg-gray-700 text-white rounded-full cursor-pointer"
							@click="handleRemove(option)"
						>
							x
						</span>
					</div>
				</div>
			</div>

			<div class="p-4 border rounded-lg bg-gray-50 h-[3200px]">주요 영향인자 분석을 선택해주세요.</div>
		</div>
		<Popup01 :title="'팝업 제목'" :isVisible="showPopup" @update:isVisible="showPopup = $event">
			<p class="text-gray-600">여기에 팝업 내용이 들어갑니다.</p>
		</Popup01>
	</section>
</template>

<script>
import { ref } from 'vue'
import { useUtilities } from '@/utils/common'

export default {
	setup() {
		const options = ['항목 1', '항목 2', '항목 3', '항목 4', '항목 5']
		const selectedOptions = ref([])
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const showPopup = ref(false);

		const handleSelectChange = value => {
			if (value && !selectedOptions.value.includes(value)) {
				selectedOptions.value.push(value)
			}
		}

		const handleReset = () => {
			selectedOptions.value = []
		}

		const handleRemove = option => {
			selectedOptions.value = selectedOptions.value.filter(item => item !== option)
		}

		return {
			options,
			selectedOptions,
			handleSelectChange,
			handleReset,
			handleRemove,
			imageSrc,
			showPopup
		}
	},
}
</script>

<style scoped>
.sticky-container {
	max-height: 80vh;
	position: sticky !important;
	top: 80px;
}
</style>
