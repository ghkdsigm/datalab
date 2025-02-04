<template>
	<div class="w-full overflow-x-auto">
		<table class="w-full border-collapse">
			<colgroup>
				<col width="33%" />
				<col width="33%" />
				<col width="33%" />
			</colgroup>
			<!-- 헤더 -->
			<thead>
				<tr class="text-center bg-[#F8F8F8]">
					<th class="px-4 py-2 cursor-pointer" colspan="2" @click="sortTable('value')">
						값
						<span v-if="sortKey === 'value'">{{ sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '' }}</span>
					</th>
					<th
						class="px-4 py-2 cursor-pointer"
						:style="tableData.length > 4 ? 'padding-left:0; padding-right:20px' : 'padding-left:10px;'"
						@click="sortTable('importance')"
					>
						구분
						<span v-if="sortKey === 'importance'">{{
							sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : ''
						}}</span>
					</th>
				</tr>
			</thead>
		</table>

		<div class="max-h-[170px] overflow-y-auto">
			<table class="w-full border-collapse">
				<tbody>
					<tr
						v-for="(row, index) in sortedTableData"
						:key="index"
						class="border-t border-b border-[#E6E6E6] text-center"
					>
						<!-- 값 변경 가능 -->
						<td class="px-4 py-2" @dblclick="editValue(index)">
							<template v-if="editingIndex === index">
								<input
									v-model="editInput"
									class="border rounded py-1 text-left"
									@blur="saveValue(index)"
									@keyup.enter="saveValue(index)"
									@keyup.esc="cancelEdit"
									ref="editField"
								/>
							</template>
							<template v-else>
								{{ row.value }}
							</template>
						</td>
						<td class="px-4 py-2">
							<span class="plus" v-if="row.change === '1'">
								<img :src="imageSrc('common', 'ico_plus')" alt="상승" class="inline-block mr-1" />
							</span>
						</td>
						<td class="px-4 py-2">
							<span class="flex items-center justify-center">{{ row.importance }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { ref, computed, nextTick } from 'vue'
import { useUtilities } from '@/utils/common'

export default {
	name: 'Table01',
	setup() {
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		// 원본 테이블 데이터
		const tableData = ref([
			{ value: '0.2', importance: '544', change: '1' },
			{ value: '1.5', importance: '210', change: '1' },
			{ value: '0.8', importance: '312', change: '1' },
			{ value: '2.0', importance: '111', change: '1' },
			{ value: '0.3', importance: '632', change: '1' },
		])

		const originalData = ref([...tableData.value]) // 원래 순서 저장

		// 정렬 상태
		const sortKey = ref(null)
		const sortOrder = ref(null) // 'asc' -> 'desc' -> null

		// 정렬된 데이터 반환
		const sortedTableData = computed(() => {
			if (!sortKey.value) return tableData.value

			const sorted = [...tableData.value].sort((a, b) => {
				const valA = a[sortKey.value]
				const valB = b[sortKey.value]

				if (sortOrder.value === 'asc') return valA > valB ? 1 : -1
				if (sortOrder.value === 'desc') return valA < valB ? 1 : -1
				return 0
			})

			return sorted
		})

		// 정렬 함수 (asc → desc → null)
		const sortTable = key => {
			if (sortKey.value === key) {
				sortOrder.value = sortOrder.value === 'asc' ? 'desc' : sortOrder.value === 'desc' ? null : 'asc'
			} else {
				sortKey.value = key
				sortOrder.value = 'asc'
			}

			// 정렬 해제 시 원본 데이터 복원
			if (sortOrder.value === null) {
				tableData.value = [...originalData.value]
				sortKey.value = null
			}
		}

		// 수정 관련
		const editingIndex = ref(null)
		const editInput = ref('')
		const editField = ref(null)

		const editValue = async index => {
			editingIndex.value = index
			editInput.value = tableData.value[index].value
			await nextTick()
			editField.value[0].focus()
		}

		const saveValue = index => {
			if (editInput.value.trim() !== '') {
				tableData.value[index].value = editInput.value
			}
			editingIndex.value = null
		}

		const cancelEdit = () => {
			editingIndex.value = null
		}

		return {
			tableData,
			imageSrc,
			sortKey,
			sortOrder,
			sortedTableData,
			sortTable,
			editingIndex,
			editInput,
			editField,
			editValue,
			saveValue,
			cancelEdit,
		}
	},
}
</script>

<style scoped>
.plus {
	color: #fb4f4f;
}
th {
	cursor: pointer;
	transition: background 0.2s ease;
}
th:hover {
	background: #e6e6e6;
}

/* 스크롤바 기본 스타일링 */
::-webkit-scrollbar {
	width: 5px;
}

::-webkit-scrollbar-thumb {
	background-color: #888;
}

::-webkit-scrollbar-thumb:hover {
	background-color: #555;
}

::-webkit-scrollbar-track {
	background: #f1f1f1;
}
</style>
