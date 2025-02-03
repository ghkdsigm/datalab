<template>
	<div class="w-full overflow-x-auto">
		<table class="w-full border-collapse">
			<colgroup>
				<col width="25%" />
				<col width="25%" />
				<col width="25%" />
				<col width="25%" />
			</colgroup>
			<!-- 헤더 -->
			<thead>
				<tr class="text-center bg-[#F8F8F8]">
					<th class="px-4 py-2">값</th>
					<th class="px-4 py-2">중요도</th>
					<th class="px-4 py-2">MDF와의 관계</th>
					<th class="px-4 py-2">전월대비증감</th>
				</tr>
			</thead>
			<!-- 바디 -->
			<tbody>
				<tr v-for="(row, index) in tableData" :key="index" class="border-t border-b border-[#E6E6E6] text-center">
					<td class="px-4 py-2">{{ row.value }}</td>
					<td class="px-4 py-2">{{ row.importance }}</td>
					<td class="px-4 py-2">
						<span class="plus" v-if="row.change === '1'">{{ row.change }}</span>
					</td>
					<td class="px-4 py-2">
						<span class="plus">{{ row.iconValue }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Table01',
	setup() {
		const tableData = [{ value: '0.2', importance: '544', change: '1', iconValue: '193' }]

		return { tableData }
	},
}
</script>

<style scoped>
.plus {
	color: #fb4f4f;
}
</style>
