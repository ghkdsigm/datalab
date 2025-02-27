<template>
	<div class="">
		<table class="w-full border-collapse">
			<colgroup>
				<col width="240px" />
				<col width="240px" />
				<col width="*" />
			</colgroup>
			<thead>
				<tr class="bg-[#F8F8F8] border-b border-[#E6E6E6]">
					<th class="p-3 text-left">보드구분</th>
					<th class="p-3 text-left">기준년월</th>
					<th class="p-3 text-left">특이사항</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in tableData" :key="index" class="hover:bg-gray-100">
					<td class="p-3 text-left" @dblclick="editRow(index)">
						<select
							v-if="editingIndex === index || row.board === ''"
							v-model="row.board"
							@blur="saveEdit"
							class="border px-2 py-1 w-full rounded-sm"
						>
							<option value="MDF">MDF</option>
							<option value="PB">PB</option>
						</select>
						<span v-else>{{ row.board }}</span>
					</td>
					<td class="p-3 text-left" @dblclick="editRow(index)">
						<input
							v-if="editingIndex === index || row.yearMonth === ''"
							v-model="row.yearMonth"
							@blur="saveEdit"
							@keyup.enter="saveEdit"
							class="border px-2 py-1 w-full rounded-sm"
							autofocus
						/>
						<span v-else>{{ row.yearMonth }}</span>
					</td>

					<td class="p-3 text-left" @dblclick="editRow(index)">
						<input
							v-if="editingIndex === index || row.remarks === ''"
							v-model="row.remarks"
							@blur="saveEdit"
							@keyup.enter="saveEdit"
							class="border px-2 py-1 w-full rounded-sm"
							autofocus
						/>
						<span v-else>{{ row.remarks }}</span>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="bg-[#F8F8F8]">
			<div class="px-3 py-[15px] text-left text-[#777777]">
				<span class="cursor-pointer underline decoration-1 text-[14px]" @click="addRow"> 특이사항 추가하기 + </span>
			</div>
		</div>
		<button class="mt-6 px-4 py-2 bg-[#262626] text-white rounded w-[200px] font-bold" @click="updateTable">
			업데이트하기
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([{ board: 'MDF', yearMonth: '202403', remarks: '유니드화재' }])

const editingIndex = ref(null)

const editRow = index => {
	editingIndex.value = index
}

const saveEdit = () => {
	editingIndex.value = null
}

const addRow = () => {
	const newIndex = tableData.value.length
	tableData.value.push({ board: '', yearMonth: '', remarks: '' })
	editingIndex.value = newIndex
}

const updateTable = () => {
	console.log('Updated Data:', tableData.value)
}
</script>
