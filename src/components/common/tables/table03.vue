<template>
	<div class="">
		<table class="w-full border-collapse">
			<colgroup>
				<col v-for="(col, index) in columns" :key="index" />
			</colgroup>
			<thead>
				<tr class="bg-[#F8F8F8] border-b border-[#E6E6E6]">
					<th v-for="(col, index) in columns" :key="index" class="p-3 text-left">{{ col }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, rowIndex) in tableData" :key="rowIndex" class="hover:bg-gray-100">
					<td
						v-for="(col, colIndex) in columns"
						:key="colIndex"
						class="p-3 text-left"
						@dblclick="editRow(rowIndex, col)"
					>
						<!-- 드롭다운이 필요한 경우 -->
						<select
							v-if="editingIndex === rowIndex && col === '구분'"
							v-model="row[col]"
							@keyup.enter="saveEdit"
							class="border px-2 py-1 w-full rounded-sm"
						>
							<option value="MDF">MDF</option>
							<option value="PB">PB</option>
						</select>

						<!-- 일반 입력 필드 -->
						<input
							v-else-if="editingIndex === rowIndex"
							v-model="row[col]"
							@keyup.enter="saveEdit"
							class="border px-2 py-1 w-full rounded-sm"
							autofocus
						/>

						<!-- 일반 텍스트 -->
						<span v-else>{{ row[col] }}</span>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- 추가 버튼 -->
		<div class="bg-[#F8F8F8]">
			<div class="px-3 py-[15px] text-left text-[#777777]">
				<span class="cursor-pointer underline decoration-1 text-[14px]" @click="addRow"> 특이사항 추가하기 + </span>
			</div>
		</div>

		<!-- 업데이트 버튼 -->
		<button class="mt-6 px-4 py-2 bg-[#262626] text-white rounded w-[200px] font-bold" @click="updateTable">
			업데이트하기
		</button>
	</div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useUpdateStore } from '@/store/update'

const updateStore = useUpdateStore()

// Props
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	content01: {
		type: Array,
		default: () => [], // 기본값 설정
	},
})

// 테이블 컬럼을 동적으로 추출
const columns = computed(() => {
	if (props.content01?.length > 0) {
		return Object.keys(props.content01[0]) // 첫 번째 객체의 키를 컬럼으로 사용
	}
	return []
})

// 테이블 데이터 (반응형 유지)
const tableData = ref([])

// content01 변경 시 tableData 업데이트
watchEffect(() => {
	console.log('watchEffect 감지됨, 부모의 content01 값:', props.content01)
	tableData.value = [...props.content01] // 항상 최신 값 유지
})

// 편집 상태 관리
const editingIndex = ref(null)

// 편집 시작
const editRow = (index, col) => {
	editingIndex.value = index
}

// 편집 종료
const saveEdit = () => {
	editingIndex.value = null
}

// 행 추가 (컬럼 수에 맞게 자동 생성)
const addRow = () => {
	const newRow = {}
	columns.value.forEach(col => {
		newRow[col] = '' // 기본값을 빈 문자열로 설정
	})
	tableData.value.push(newRow)

	// 방금 추가된 행을 자동으로 편집 모드로 설정
	editingIndex.value = tableData.value.length - 1
}

// 업데이트 로직
const updateTable = () => {
	console.log('Updated Data:', tableData.value)
	if (!tableData.value || tableData.value.length === 0) return

	const params = {
		data_type: props.title,
		data: tableData.value,
	}

	if (props.title === 'accident') {
		const res = updateStore.actGetUpdateUpload(params)
		console.log('결과', res)
	}
}
</script>

<style scoped>
button {
	transition: all 0.2s ease-in-out;
	border: 1px solid #f3f3f3;
}
</style>
