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
						<span class="plus">
							{{ row.change_from_last_month
							}}<img
								v-if="row.relation === '+'"
								:src="imageSrc('common', 'ico_plus')"
								alt="상승"
								class="inline-block mr-1"
							/>
							<img v-else :src="imageSrc('common', 'ico_minus')" alt="하락" class="inline-block mr-1" />
						</span>
					</td>
					<td class="px-4 py-2">
						<span class="plus flex items-center justify-center"
							>{{ row.change_from_last_month }}
							<img
								v-if="row.relation === '+'"
								:src="imageSrc('common', 'ico_up')"
								alt="상승"
								class="inline-block ml-1" /><img
								v-else
								:src="imageSrc('common', 'ico_down')"
								alt="하락"
								class="inline-block ml-1"
						/></span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { useUtilities } from '@/utils/common'
export default {
	name: 'Table01',
	props: {
		content: {
			type: Object,
			default: () => null,
		},
	},
	setup(props) {
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const tableData = [
			{
				value: '0.2',
				importance: props.content.importance,
				relation: props.content.relation,
				iconValue: props.content.change_from_last_month,
			},
		]

		return { tableData, imageSrc }
	},
}
</script>

<style scoped>
.plus {
	color: #fb4f4f;
}
</style>
