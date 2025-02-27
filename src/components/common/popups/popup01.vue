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
			<div class="p-8 overflow-scroll">
				<strong class="block mb-[24px] text-left">월별 변수 선택 결과</strong>
				<div class="flex max-h-[300px]" style="min-width: max-content">
					<div v-for="(values, year) in filteredData" :key="year" class="mb-6">
						<table class="w-full border-collapse">
							<thead>
								<tr class="block w-full">
									<th class="block w-full border-b border-gray-300 bg-[#E6E6E6] text-left font-bold px-4 py-2">
										{{ year }}
									</th>
								</tr>
							</thead>
							<tbody>
								<!-- 실제 데이터가 있는 경우 -->
								<tr v-for="(item, index) in values" :key="index" class="border-b border-gray-300">
									<td class="px-4 py-2 text-left text-[14px]">{{ item }}</td>
								</tr>
								<!-- 데이터가 없는 경우 빈 tr 추가 -->
								<tr v-if="values.length === 0" class="h-[36px] border-b border-gray-300">
									<td class="px-4 py-2 text-left text-[14px]">-</td>
								</tr>
								<!-- 최대 데이터 수에 맞춰 빈 tr 추가 -->
								<tr v-for="n in maxRows - values.length" :key="'empty-' + n" class="h-[36px] border-b border-gray-300">
									<td class="px-4 py-2 text-left text-[14px]">-</td>
								</tr>
							</tbody>
						</table>
					</div>
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
const rank = computed(() => props.data.rank || [])

// 연도별 데이터 필터링 (rank 제외 & null 제거)
const filteredData = computed(() => {
	return Object.keys(props.data)
		.filter(year => year !== 'rank')
		.reduce((acc, year) => {
			acc[year] = props.data[year].filter(Boolean) // null 제거
			return acc
		}, {})
})

// 가장 많은 데이터를 가진 테이블의 항목 수를 계산
const maxRows = computed(() => {
	return Math.max(...Object.values(filteredData.value).map(values => values.length), 0)
})
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
