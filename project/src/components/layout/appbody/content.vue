<template>
	<section class="flex justify-between gap-6 w-full">
		<div class="flex flex-col gap-6 flex-[7] min-w-[0] sticky-container">
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
					{{ content?.summary?.short }}
				</p>
			</div>

			<div class="p-4 border rounded-lg bg-white shadow-black">
				<div class="flex justify-between items-center mb-5">
					<strong class="text-xl text-gray-800 font-bold">보드 예측 결과</strong>
					<span class="text-sm text-gray-800 font-light px-3 py-1 border rounded-full">상세보기</span>
				</div>
				<div class="w-full h-[400px]">
					<!-- <LoadingStatus v-if="isLoading" /> -->
					<Line01 :content="content?.table_data"></Line01>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-6 flex-[5] min-w-[0]">
			<div class="p-4 border rounded-lg bg-gray-50">
				<div class="flex justify-between items-center">
					<Select01 :options="options" :selected-options="selectedOptions" @select="handleSelectChange" />
					<button @click="handleReset" class="text-pale p-2 font-light text-sm">
						<img :src="imageSrc('mdf', 'ico_refresh')" alt="초기화" class="inline-block mr-1" />
						초기화
					</button>
				</div>

				<!-- 가로 스크롤이 가능하도록 설정 -->
				<div
					v-if="selectedOptions.length"
					ref="scrollContainer"
					class="mt-3 flex gap-2 overflow-hidden whitespace-nowrap scrollbar-hide cursor-grab active:cursor-grabbing min-w-[250px]"
					@mousedown="startDrag"
					@mousemove="onDrag"
					@mouseup="stopDrag"
					@mouseleave="stopDrag"
					@touchstart="startDrag"
					@touchmove="onDrag"
					@touchend="stopDrag"
				>
					<div
						v-for="option in selectedOptions"
						:key="option"
						class="flex items-center px-3 py-1 border rounded-full bg-white min-w-[140px] text-[14px] select-none"
					>
						<span class="text-gray-800 mr-2 w-[80%] overflow-hidden text-ellipsis line-clamp-1 text-left block">
							{{ option }}
						</span>
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
					<Line02 :leftTit="'수량(M3)'" :rightTit="'영향인자'" />
				</div>
				<div>
					<Table01 />
				</div>
			</div>
			<div class="mt-2">
				<h2 class="text-[#262626] text-[16px] font-bold flex justify-start mb-[16px]">동행종합지수_변동량(3개월전)</h2>
				<div class="mb-[16px]">
					<Line02 :leftTit="'수량(M3)'" :rightTit="'영향인자'" />
				</div>
				<div>
					<Table01 />
				</div>
			</div>
			<div class="mt-2">
				<h2 class="text-[#262626] text-[16px] font-bold flex justify-start mb-[16px]">동행종합지수_변동량(3개월전)</h2>
				<div class="mb-[16px]">
					<Line02 :leftTit="'수량(M3)'" :rightTit="'영향인자'" />
				</div>
				<div>
					<Table01 />
				</div>
			</div>
		</div>
		<Popup00 :title="'이달의 영향인자 '" :isVisible="showPopup" @update:isVisible="showPopup = $event" :width="'720'">
			<p class="text-gray-600">
				{{ content?.summary?.full }}
			</p>
		</Popup00>
	</section>
</template>

<script>
import { ref, computed } from 'vue'
import { useUtilities } from '@/utils/common'
import { useServiceStore } from '@/store/service'

export default {
	setup(props, { emit }) {
		const isLoading = ref(true)

		const scrollContainer = ref()
		const options = [
			'연립다세대매매실거래가격지수(10개월전)',
			'선행종합지수_변동량(9개월전)',
			'가나다라마바사 선행종합지수_변동량(9개월전)',
			'아이우에오 항목 4',
			'유우미나니카노 항목 5',
		]
		const selectedOptions = ref([])
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const showPopup = ref(false)

		const serviceStore = useServiceStore()
		const content = computed(() => serviceStore.getPreddata)

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

		//드래그
		let isDragging = false
		let startX = 0
		let scrollLeft = 0

		const startDrag = event => {
			isDragging = true
			startX = event.type.includes('touch') ? event.touches[0].pageX : event.pageX
			scrollLeft = scrollContainer.value.scrollLeft
		}

		const onDrag = event => {
			if (!isDragging) return
			event.preventDefault()
			const x = event.type.includes('touch') ? event.touches[0].pageX : event.pageX
			const walk = (x - startX) * 1.5 // 드래그 속도 조정
			scrollContainer.value.scrollLeft = scrollLeft - walk
		}

		const stopDrag = () => {
			isDragging = false
		}

		return {
			isLoading,
			options,
			selectedOptions,
			handleSelectChange,
			handleReset,
			handleRemove,
			imageSrc,
			showPopup,
			startDrag,
			onDrag,
			stopDrag,
			scrollContainer,
			content,
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
