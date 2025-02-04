<template>
	<section class="flex justify-between gap-6 w-full">
		<div class="flex flex-col gap-6 flex-[7] sticky-container">
			<div class="mb-2 p-4 border rounded-lg bg-white shadow-black">
				<div class="flex justify-between items-center">
					<strong class="text-cyan-500 font-bold">
						<img :src="imageSrc('mdf', 'ico_talk')" alt="초기화" class="inline-block mr-1" />
						<span class="font-bold">예측 결과 요약</span>
					</strong>
					<span class="text-sm text-gray-800 font-light cursor-pointer" @click="showPopup = true"
						>더보기 <em class="ml-1">+</em></span
					>
				</div>
				<p class="max-w-full mt-1 text-sm overflow-hidden text-ellipsis line-clamp-1 text-left text-primaryBlack">
					완만한 상승세를 보일 가능성이 있음. 특히 부동산 및 주택 시장 소비 심리지수가 긍정적인 으로 움직이는 상황에서
					MDF 또한 비슷하게 움직일 가능성이 높음. 하지만 금리 및 정책 변화 등 불확실성이 존재할 수 있음
				</p>
			</div>

			<div class="p-4 border rounded-lg bg-white shadow-black">
				<div class="flex justify-between items-center mb-5">
					<strong class="text-xl text-gray-800 font-bold">보드 예측 결과</strong>
					<span class="text-sm text-gray-800 font-light px-3 py-1 border rounded-full">상세보기</span>
				</div>
				<div class="w-full h-[400px]">
					<Line01></Line01>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-6 flex-[5]">
			<div class="p-4 border rounded-lg bg-gray-50">
				<div class="flex justify-between items-center">
					<Select01 :options="options" :selected-options="selectedOptions" @select="handleSelectChange" />
					<button @click="handleReset" class="text-pale p-2 font-light text-sm">
						<img :src="imageSrc('mdf', 'ico_refresh')" alt="초기화" class="inline-block mr-1" />
						초기화
					</button>
				</div>

				<div v-if="selectedOptions.length" class="flex flex-wrap gap-2 mt-3">
					<div
						v-for="option in selectedOptions"
						:key="option"
						class="flex items-center px-3 py-1 border rounded-full bg-white w-[140px] text-[14px]"
					>
						<span class="text-gray-800 mr-2 w-[80%] overflow-hidden text-ellipsis line-clamp-1 text-left">{{
							option
						}}</span>
						<span
							class="flex items-center justify-center text-white rounded-full cursor-pointer"
							@click="handleRemove(option)"
						>
							<img :src="imageSrc('common', 'ico_close')" alt="초기화" class="inline-block mr-1" />
						</span>
					</div>
				</div>
			</div>

			<!-- <div class="p-4 border rounded-lg bg-gray-50 h-[3200px]">주요 영향인자 분석을 선택해주세요.</div> -->
			<div class="mt-2">
				<h2 class="text-[#262626] text-[16px] font-bold flex justify-start mb-[16px]">동행종합지수_변동량(3개월전)</h2>
				<div class="mb-[16px]">
					<Line02></Line02>
				</div>
				<div>
					<Table01 />
				</div>
			</div>
			<div class="mt-2">
				<h2 class="text-[#262626] text-[16px] font-bold flex justify-start mb-[16px]">동행종합지수_변동량(3개월전)</h2>
				<div class="mb-[16px]">
					<Line02></Line02>
				</div>
				<div>
					<Table01 />
				</div>
			</div>
			<div class="mt-2">
				<h2 class="text-[#262626] text-[16px] font-bold flex justify-start mb-[16px]">동행종합지수_변동량(3개월전)</h2>
				<div class="mb-[16px]">
					<Line02></Line02>
				</div>
				<div>
					<Table01 />
				</div>
			</div>
		</div>
		<Popup01 :title="'이달의 영향인자 '" :isVisible="showPopup" @update:isVisible="showPopup = $event" :width="'720'">
			<p class="text-gray-600">여기에 팝업 내용이 들어갑니다.</p>
		</Popup01>
	</section>
</template>

<script>
import { ref } from 'vue'
import { useUtilities } from '@/utils/common'

export default {
	setup() {
		const options = [
			'연립다세대매매실거래가격지수(10개월전)',
			'선행종합지수_변동량(9개월전)',
			'항목 3',
			'항목 4',
			'항목 5',
		]
		const selectedOptions = ref([])
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const showPopup = ref(false)

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
			showPopup,
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
