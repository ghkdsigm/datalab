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
					<td class="px-4 py-2">{{ formatNumberWithCommaAndTwoDecimals(value) }}</td>
					<td class="px-4 py-2">{{ formatToTwoDecimals(row.importance) }}</td>
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
						<span class="flex items-center justify-center"
							><span
								:class="
									categorizeNumber(Number(row.iconValue)) === 'Positive'
										? 'plus'
										: categorizeNumber(Number(row.iconValue)) === 'Negative'
											? 'minus'
											: ''
								"
								>{{ formatNumberWithCommaAndTwoDecimals(row.iconValue) }}</span
							>
							<!-- <img
								v-if="row.relation === '+'"
								:src="imageSrc('common', 'ico_up')"
								alt="상승"
								class="inline-block ml-1" /><img
								v-else
								:src="imageSrc('common', 'ico_down')"
								alt="하락"
								class="inline-block ml-1"
							/>-->
							<!-- {{ categorizeNumber(row.iconValue) }} -->
							<img
								v-if="categorizeNumber(Number(row.iconValue)) === 'Positive'"
								:src="imageSrc('common', 'ico_up')"
								alt="상승"
								class="inline-block ml-1"
							/>
							<!-- <img
								v-else-if="categorizeNumber(Number(row.iconValue)) === 'Zero'"
								:src="imageSrc('common', 'ico_down')"
								alt="보합"
								class="inline-block ml-1"
							/> -->
							<span v-else-if="categorizeNumber(Number(row.iconValue)) === 'Zero'" class="pl-2 font-bold"> - </span>
							<img
								v-else-if="categorizeNumber(Number(row.iconValue)) === 'Negative'"
								:src="imageSrc('common', 'ico_down')"
								alt="하락"
								class="inline-block ml-1"
							/>
							<span v-else></span>
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { useUtilities } from '@/utils/common'
const { formatNumberWithCommaAndTwoDecimals, formatToTwoDecimals } = useUtilities()

export default {
	name: 'Table01',
	props: {
		content: {
			type: Object,
			default: () => null,
		},
		value: {
			type: [Number, String],
			default: '',
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

		const categorizeNumber = num => {
			if (typeof num !== 'number' || isNaN(num)) {
				return 'Invalid input' // 숫자가 아닌 경우 처리
			}

			if (num < 0) {
				return 'Negative' // 음수인 경우
			} else if (num === 0) {
				return 'Zero' // 0인 경우
			} else {
				return 'Positive' // 양수인 경우 (소수 포함)
			}
		}

		return { tableData, imageSrc, formatNumberWithCommaAndTwoDecimals, formatToTwoDecimals, categorizeNumber }
	},
}
</script>

<style scoped>
.plus {
	color: #fb4f4f;
}
.minus {
	color: #006ff1;
}
</style>
