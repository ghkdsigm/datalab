<template>
	<div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
		<div class="bg-gray-700 bg-opacity-50 absolute inset-0" @click="closePopup"></div>
		<div class="bg-white rounded-lg relative overflow-hidden pop" :style="`width:${width}px`">
			<div class="flex justify-between items-center bg-[#F8F8F8]">
				<h3 class="text-lg p-4 pl-8 font-bold">{{ title }}</h3>
				<button @click="closePopup" class="p-2 pr-4 text-gray-500 hover:text-gray-700">
					<img :src="imageSrc('common', 'ico_close_pop')" alt="" />
				</button>
			</div>
			<div class="p-8 overflow-scroll flex flex-col">
				<div class="flex items-center justify-left mb-[24px]">
					<strong class="">예측오차(비율)</strong>
					<span
						class="border border-[#CCCCCC] bg-[#F8F8F8] py-[10px] px-[16px] ml-[16px] rounded-md w-[160px] text-left"
						>{{ data?.pred_error }}</span
					>
				</div>
				<div class="flex max-h-[300px]" style="min-width: max-content">
					<table class="min-w-full border-collapse text-sm">
						<thead class="bg-gray-100">
							<tr>
								<th class="w-[80px] border-b border-gray-300 px-4 py-2">년월</th>
								<th v-for="key in predKeys" :key="key" class="w-[120px] border-b border-gray-300 px-4 py-2">
									{{ key }} 예측
								</th>
								<th class="w-[120px] border-b border-gray-300 px-4 py-2">실적</th>
								<th class="w-[120px] border-b border-gray-300 px-4 py-2">{{ predKeys[2] }} 차이</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(date, index) in data.table_data.index" :key="date">
								<td class="w-[80px] border-b border-gray-300 px-4 py-2">{{ date }}</td>
								<td v-for="key in predKeys" :key="key" class="w-[120px] border-b border-gray-300 px-4 py-2">
									{{ formatNumber(data.table_data.pred[key]?.[index]) }}
								</td>
								<td class="w-[120px] border-b border-gray-300 px-4 py-2">
									{{ formatNumber(data.table_data.real[index]) }}
								</td>
								<td class="w-[120px] border-b border-gray-300 px-4 py-2">
									{{ formatNumber(data.table_data.diff[predKeys[0]]?.[index]) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useUtilities } from '@/utils/common'
import { ref, computed } from 'vue'

// Props 정의
const props = defineProps({
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
	data: {
		type: Object,
		required: true,
	},
})

const { setImageSrc } = useUtilities()
const imageSrc = (folder, img) => setImageSrc(folder, img)

const emit = defineEmits(['update:isVisible'])

const closePopup = () => {
	emit('update:isVisible', false)
}

// rank 데이터 추출 (data에서 rank가 있으면 사용, 없으면 빈 배열)
const rank = computed(() => props.data || [])

const predKeys = computed(() => Object.keys(props.data.table_data.pred) || [])

const formatNumber = value => {
	return value != null && !isNaN(value)
		? Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
		: '-'
}
</script>

<style scoped>
.pop {
	box-shadow: 0px 8px 30px 7px #00000040;
}

table {
	height: 100%;
	display: flex;
	flex-direction: column;
}

tbody {
	flex: 1;
	display: flex;
	flex-direction: column;
}

td {
	vertical-align: top; /* 내용이 위쪽에 정렬되도록 설정 */
}
</style>
