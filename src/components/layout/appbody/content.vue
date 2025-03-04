<template>
	<section class="flex justify-between gap-6 w-full">
		<div
			class="flex flex-col gap-6 flex-[7] min-w-[0] sticky-container"
			:style="
				chartHeight ? 'height:630px; max-height:630px' : 'height:535px; max-height:535px;     margin-bottom: 120px;'
			"
		>
			<div class="mb-2 px-4 py-3 border rounded-lg bg-white shadow-black">
				<div class="flex justify-between items-center">
					<strong class="text-cyan-500 font-bold flex">
						<img :src="imageSrc('mdf', 'ico_talk')" alt="초기화" class="inline-block mr-1" />
						<span class="font-bold text-xl">예측 결과 요약</span>
					</strong>
					<span class="text-md text-gray-800 font-light cursor-pointer flex items-center" @click="showPopup = true"
						><span>더보기</span> <em class="ml-1 text-md flex">+</em></span
					>
				</div>
				<p
					class="max-w-full mt-1 text-md overflow-hidden text-ellipsis line-clamp-1 text-left text-primaryBlack"
					v-if="!loadingContent01"
				>
					{{ content.summary?.short }}
				</p>
				<p
					class="max-w-full mt-1 text-md overflow-hidden text-ellipsis line-clamp-1 text-left text-primaryBlack"
					v-else
				>
					정보를 불러오고있습니다<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>
				</p>
			</div>

			<div class="h-full p-4 border rounded-lg bg-white shadow-black">
				<div class="flex justify-between items-center mb-5">
					<strong class="text-xl text-gray-800 font-bold">보드 예측 결과</strong>
					<span
						class="text-sm text-gray-800 font-light px-3 py-1 border rounded-full cursor-pointer"
						@click="showPopup02 = true"
						>상세보기</span
					>
				</div>
				<div class="w-full chartWrap" v-if="!loadingContent01" :style="chartHeight ? 'height: 88%;' : 'height: 82%;'">
					<Line01 :content="content?.table_data" @updateChartHeight="updateChartHeight"></Line01>
				</div>
				<div
					class="w-full chartWrap flex justify-center items-center"
					:style="chartHeight ? 'height: 88%;' : 'height: 82%;'"
					v-else-if="!loadingContent01 && !content.table_data"
				>
					업데이트 예정
				</div>
				<div
					class="w-full chartWrap flex justify-center items-center"
					:style="chartHeight ? 'height: 88%;' : 'height: 82%;'"
					v-else
				>
					<LoadingStatus :comment="'보드 예측 결과를 불러오고있습니다'" />
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-6 flex-[5] min-w-[0]">
			<div class="p-4 border rounded-lg bg-gray-50">
				<div class="flex justify-between items-center">
					<Select01
						:disabled="loadingContent01 ? true : false"
						:options="options"
						:selected-options="selectedOptions"
						@select="handleSelectChange"
					/>
					<button @click="handleReset" class="text-pale p-2 font-light text-md">
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
						class="flex items-center px-3 py-1 border rounded-full bg-white min-w-[180px] text-[14px] select-none"
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
			<div v-if="content02.length !== 0">
				<div class="mb-6" v-for="(item, idx) in content02" :key="idx">
					<h2 class="text-[#262626] text-[16px] font-bold flex justify-start mb-[16px]">
						{{ Object.keys(item?.graph_data)[1] }}
					</h2>
					<div class="mb-[16px]">
						<Line03
							:borderColor="['#BEE7A2', '#FB4F4F']"
							:leftTit="'수량(M3)'"
							:rightTit="'영향인자'"
							:idx="item?.graph_data['index']"
							:content="item?.graph_data[selectedOptions[idx]]"
							:allcontent="item?.graph_data['전체']"
							:title="selectedOptions[idx]"
						/>
					</div>
					<div>
						<Table01 :content="item?.table_data" :value="item?.graph_data[selectedOptions[idx]]?.slice(-1)[0]" />
					</div>
				</div>
			</div>
			<div
				v-else-if="!isLoading"
				class="p-4 border rounded-lg bg-gray-50 h-[545px] flex flex-col justify-center items-center text-[16px]"
			>
				주요 영향인자 분석을<br />선택해주세요.
			</div>
			<div v-if="isLoading" class="py-[100px] text-center text-gray-500">
				<LoadingStatus :comment="'주요 영향인자를 불러오고있습니다'" />
			</div>
		</div>
		<Popup00
			:title="'예측 결과 상세보기 '"
			:isVisible="showPopup"
			@update:isVisible="showPopup = $event"
			:width="'720'"
		>
			<p
				class="text-gray-600 text-left"
				v-if="content?.summary?.full"
				v-html="formatSummaryText(content?.summary?.full)"
			></p>
			<p class="text-gray-600 text-center" v-else="isLoading">예측 결과 요약 정보가 존재하지않습니다.</p>
			<!-- <p class="text-gray-600 text-center" v-if="isLoading">예측 결과 요약 상세 정보를 불러오고 있습니다.</p> -->
		</Popup00>

		<Popup02
			:title="'상세보기 '"
			:isVisible="showPopup02"
			@update:isVisible="showPopup02 = $event"
			:data="content"
			:width="'720'"
		>
		</Popup02>
	</section>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUtilities } from '@/utils/common'
import { useServiceStore } from '@/store/service'

export default {
	setup(props, { emit }) {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)
		const scrollContainer = ref()
		const selectedOptions = ref([])
		const selectedOptionsAdded = ref(null)
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const showPopup = ref(false)
		const showPopup02 = ref(false)
		const isLoading = ref(false)

		const serviceStore = useServiceStore()
		const content = computed(() => serviceStore.getPreddata)
		const content02 = computed(() => serviceStore.getFeaturevalue ?? [])
		const options = computed(() => serviceStore.getFeaturelist.feature_list)

		const month = computed(() => serviceStore.getselectMonth)
		const prod = computed(() => serviceStore.getselectProd)

		const deleteFlag = ref(false)
		const deleteItem = ref(null)

		const loadingContent01 = computed(() => serviceStore.getLoadingpreddata)

		const chartHeight = ref(true)

		onMounted(() => {
			handleReset()
		})

		// 주요영향인자분석 불러오기
		const fetchFeatureValue = async (type, option) => {
			console.log('type', type)
			if (!selectedOptions.value) return

			if (selectedOptions.value.length) isLoading.value = true

			try {
				if (type === 'create') {
					const params = {
						board_category: checkCurrentPath(currentPath.value),
						base_yyyymm: month.value,
						prod_type: prod.value,
						feature_name: selectedOptionsAdded.value,
					}

					await serviceStore.actGetFeaturevalue(params)
					selectedOptionsAdded.value = null
				} else if (type === 'delete') {
					console.log('option1', option)
					selectedOptionsAdded.value = null
					await serviceStore.removeFeatureValue(option)
				} else {
					console.log('option2', option)
					selectedOptionsAdded.value = null
					await serviceStore.removeFeatureValue('remove')
				}
			} catch (error) {
				console.error('Error fetching external trend:', error)
			} finally {
				isLoading.value = false
			}
		}

		watch(
			() => selectedOptions.value,
			async () => {
				selectedOptionsAdded.value = selectedOptions.value[selectedOptions.value.length - 1] || null
				if (deleteFlag.value === false && selectedOptions.value.length !== 0) {
					await fetchFeatureValue('create')
				} else {
					if (deleteFlag.value) {
						await fetchFeatureValue('delete', deleteItem.value)
					}
					deleteFlag.value = false
				}
			},
			{ deep: true },
		)

		const checkCurrentPath = val => {
			if (val === '/mdf') {
				return 'mdf'
			} else if (val === '/pb') {
				return 'pb'
			} else if (val === '/dw') {
				return 'bm_retail'
			} else if (val === '/apt') {
				return 'apt_comp'
			} else {
				return
			}
		}

		const handleSelectChange = value => {
			if (value && !selectedOptions.value.includes(value)) {
				selectedOptions.value.push(value)
			}
		}

		const handleReset = async () => {
			deleteFlag.value = true
			selectedOptions.value = []
			await fetchFeatureValue('remove')
		}

		const handleRemove = option => {
			selectedOptions.value = selectedOptions.value.filter(item => item !== option)
			deleteItem.value = option
			deleteFlag.value = true
		}

		watch(month, () => {
			handleReset()
		})

		watch(prod, () => {
			handleReset()
		})

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

		const formatSummaryText = text => {
			if (!text) return ''

			text = text.replace(
				/(\d+)\.\s/,
				'</p><h2 class="text-[16px] font-bold mt-6 mb-4">주요 상승 요인</h2><p class="mt-4 flex items-start gap-0 ext-[16px]"><span class="min-w-[24px] font-bold ext-[16px]">$1.</span><span class="flex-1">',
			)

			return (
				text.replace(
					/(\d+)\.\s/g,
					'</p><p class="mt-4 flex items-start gap-0"><span class="min-w-[24px] font-bold text-xl">$1.</span><span class="flex-1">',
				) + '</span>'
			)
		}

		const updateChartHeight = val => {
			chartHeight.value = val
		}

		return {
			currentRoutes,
			currentPath,
			isLoading,
			options,
			selectedOptions,
			handleSelectChange,
			handleReset,
			handleRemove,
			imageSrc,
			showPopup,
			showPopup02,
			startDrag,
			onDrag,
			stopDrag,
			scrollContainer,
			selectedOptionsAdded,
			content,
			content02,
			checkCurrentPath,
			deleteFlag,
			deleteItem,
			formatSummaryText,
			loadingContent01,
			updateChartHeight,
			chartHeight,
		}
	},
}
</script>

<style scoped>
.sticky-container {
	/*max-height: 630px;*/
	/*height: 630px;*/
	position: sticky !important;
	/* top: 80px; */
	top: 30px;
}

.chartWrap {
	height: 88%;
}

/* 점들에 애니메이션 적용 */
.dot-1,
.dot-2,
.dot-3 {
	opacity: 0;
	animation: blink 1.5s infinite;
}

.dot-1 {
	animation-delay: 0s;
}

.dot-2 {
	animation-delay: 0.3s;
}

.dot-3 {
	animation-delay: 0.6s;
}

/* 애니메이션 효과 */
@keyframes blink {
	0%,
	100% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
}
</style>
