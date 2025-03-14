<template>
	<!-- Center Section -->
	<div class="flex flex-col flex-[12] w-full">
		<h2 class="text-left text-[#777777] py-[40px] text-[18px] font-bold">트렌드를 확인할 외부 지표를 선택하세요.</h2>
		<FullScreenLoader v-if="loadingContent01" />
		<div v-else>
			<div class="flex flex-col gap-6 flex-[5] min-w-[0] sticky top-[20px] z-[3]">
				<div class="p-4 border rounded-lg bg-gray-50">
					<div class="flex justify-between items-center">
						<div class="flex gap-4">
							<div class="flex items-center gap-4 pr-4">
								<SelectBasic v-model="years" :options="yearsList || []" :width="'160'" :label="'시작 기준월'" />
								<SelectBasic v-model="months" :options="monthsList || []" :width="'160'" />
							</div>
							<Select01
								:options="options"
								:selected-options="selectedOptions"
								:label="'외부지표선택'"
								@select="handleSelectChange"
							/>
						</div>
						<button @click="handleReset" class="text-pale p-2 font-light text-sm">
							<img :src="imageSrc('mdf', 'ico_refresh')" alt="초기화" class="inline-block mr-1" />
							초기화
						</button>
					</div>

					<div
						v-if="selectedOptions.length"
						class="flex gap-2 mt-3 overflow-hidden whitespace-nowrap scrollbar-hide cursor-grab active:cursor-grabbing min-w-[250px]"
						ref="scrollContainer"
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
			</div>

			<div>
				<div v-if="content.length !== 0" class="flex flex-col gap-6 pb-[100px] mt-8">
					<div class="flex flex-col gap-6" v-for="(item, idx) in content" :key="idx">
						<h2 class="text-[#262626] text-[16px] font-bold flex justify-start">
							{{ Object.keys(item)[1] }}
						</h2>
						<div class="flex gap-x-6 h-[205px] overflow-hidden">
							<!-- Left -->
							<div class="flex flex-col flex-[9] h-full">
								<div class="bg-white rounded-md h-full">
									<Line02
										:type="'trend'"
										:borderColor="['#5DB096', '#D17EB1']"
										:leftTit="'외부지표'"
										:rightTit="'영향인자'"
										:idx="item[Object.keys(item)[0]]"
										:content="item[Object.keys(item)[1]]"
									/>
								</div>
							</div>

							<!-- Right -->
							<div class="flex flex-col flex-[3]">
								<div class="bg-white rounded-md">
									<Table02 :type="'trend'" :title="Object.keys(item)[1]" :content="item" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-else-if="!isLoading" class="py-[100px] text-center text-gray-500">외부 지표를 선택해주세요.</div>

				<div v-if="isLoading" class="py-[100px] text-center text-gray-500">
					<LoadingStatus :comment="'지표를 불러오고있습니다'" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, watch, onBeforeMount, onMounted, computed, watchEffect, nextTick } from 'vue'
import { useUtilities } from '@/utils/common'
import { useServiceStore } from '@/store/service'

export default {
	name: 'TREND',
	setup() {
		const scrollContainer = ref()
		const serviceStore = useServiceStore()
		const selectedOptions = ref([])
		const selectedOptionsAdded = ref(null)
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const isLoading = ref(false)

		const loadingContent01 = computed(() => serviceStore.getLoadingtrend)

		const options = computed(() => serviceStore.getExternallist.column_name)
		const selectedValue = ref('')
		const years = ref(String(new Date().getFullYear()))

		const content = computed(() => serviceStore.getExternaltrend ?? [])

		const yearsList = computed(() =>
			serviceStore.getExternallist?.year
				?.slice()
				.reverse()
				.map(item => ({ label: String(item), value: String(item) })),
		)

		const months = ref(String(new Date().getMonth() + 1).padStart(2, '0'))
		const monthsList = computed(() =>
			serviceStore.getExternallist?.month?.map(item => ({ label: String(item), value: String(item) })),
		)

		const deleteFlag = ref(false)
		const deleteItem = ref(null)

		// 외부 경기지표 리스트 불러오기
		const fetchtExternalList = async () => {
			await serviceStore.actGetExternallist()
		}

		// 개별 지표 값 불러오기
		const fetchExternalTrend = async (type, option) => {
			console.log('type', type)
			if (!years.value || !months.value || !selectedOptions.value) return

			if (selectedOptions.value.length) isLoading.value = true

			try {
				if (type === 'create') {
					const params = {
						start_year: years.value,
						start_month: months.value,
						external_name: selectedOptionsAdded.value,
					}

					await serviceStore.actGetExternaltrend(params)
					selectedOptionsAdded.value = null
				} else if (type === 'delete') {
					console.log('option1', option)
					selectedOptionsAdded.value = null
					await serviceStore.removeExternalTrend(option)
				} else {
					console.log('option2', option)
					selectedOptionsAdded.value = null
					await serviceStore.removeExternalTrend('remove')
				}
			} catch (error) {
				console.error('Error fetching external trend:', error)
			} finally {
				isLoading.value = false
			}
		}

		onBeforeMount(async () => {
			await fetchtExternalList()
		})

		onMounted(async () => {
			handleReset()

			// if (deleteFlag.value === false) {
			// 	await fetchExternalTrend('create')
			// }
		})

		watch(
			() => years.value,
			async () => {
				//selectedOptions.value = []
				handleReset()
				console.log('selectedOptions.value.length', selectedOptions.value.length)
				if (deleteFlag.value === false && selectedOptions.value.length !== 0) {
					await fetchExternalTrend('create')
				} else {
					if (deleteFlag.value) {
						await fetchExternalTrend('delete', deleteItem.value)
						deleteFlag.value = false
					}
				}
			},
			{ deep: true },
		)

		watch(
			() => months.value,
			async () => {
				//selectedOptions.value = []
				handleReset()
				console.log('selectedOptions.value.length', selectedOptions.value.length)
				if (deleteFlag.value === false && selectedOptions.value.length !== 0) {
					await fetchExternalTrend('create')
				} else {
					if (deleteFlag.value) {
						await fetchExternalTrend('delete', deleteItem.value)
					}
					deleteFlag.value = false
				}
			},
			{ deep: true },
		)

		watch(
			() => selectedOptions.value,
			async () => {
				selectedOptionsAdded.value = selectedOptions.value[selectedOptions.value.length - 1] || null
				if (deleteFlag.value === false && selectedOptions.value.length !== 0) {
					await fetchExternalTrend('create')
				} else {
					if (deleteFlag.value) {
						await fetchExternalTrend('delete', deleteItem.value)
					}
					deleteFlag.value = false
				}
			},
			{ deep: true },
		)

		const handleSelectChange = value => {
			if (value && !selectedOptions.value.includes(value)) {
				selectedOptions.value.push(value)
			}
		}

		const handleReset = async () => {
			deleteFlag.value = true
			selectedOptions.value = []
			await fetchExternalTrend('remove')
		}

		const handleRemove = async option => {
			selectedOptions.value = selectedOptions.value.filter(item => item !== option)
			deleteItem.value = option
			deleteFlag.value = true
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
			options,
			selectedOptions,
			selectedOptionsAdded,
			handleSelectChange,
			handleReset,
			handleRemove,
			imageSrc,
			selectedValue,
			years,
			yearsList,
			months,
			monthsList,
			deleteFlag,
			deleteItem,
			content,
			isLoading,
			startDrag,
			onDrag,
			scrollContainer,
			stopDrag,
			loadingContent01,
		}
	},
}
</script>

<style></style>
