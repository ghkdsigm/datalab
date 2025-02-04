<template>
	<!-- Center Section -->
	<div class="flex flex-col flex-[12] gap-6">
		<div class="mb-4">
			<h2 class="text-left text-[#777777] py-[40px] text-[18px] font-bold">트렌드를 확인할 외부 지표를 선택하세요.</h2>
			<div class="p-4 border rounded-lg bg-gray-50">
				<div class="flex justify-between items-center">
					<div class="flex gap-4">
						<div class="flex items-center gap-4 pr-4">
							<SelectBasic v-model="years" :options="yearsList" :width="'160'" :label="'시작 기준월'" />
							<SelectBasic v-model="months" :options="monthsList" :width="'160'" />
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

				<div v-if="selectedOptions.length" class="flex flex-wrap gap-2 mt-3">
					<div
						v-for="option in selectedOptions"
						:key="option"
						class="flex items-center px-3 py-1 border rounded-full bg-white w-[140px] text-[14px]"
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
		<div class="flex flex-col gap-6">
			<h2 class="text-[#262626] text-[16px] font-bold flex justify-start">연립다세대매매실거래가격지수</h2>
			<div class="flex gap-x-6 h-[205px] overflow-hidden">
				<!-- Left Section -->
				<div class="flex flex-col flex-[9] h-full">
					<div class="bg-white rounded-md h-full">
						<Line02 :type="'trend'"></Line02>
					</div>
				</div>

				<!-- Right Section -->
				<div class="flex flex-col flex-[3]">
					<div class="bg-white rounded-md">
						<Table02 :type="'trend'" />
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-6">
			<h2 class="text-[#262626] text-[16px] font-bold flex justify-start">연립다세대매매실거래가격지수</h2>
			<div class="flex gap-x-6 h-[205px] overflow-hidden">
				<!-- Left Section -->
				<div class="flex flex-col flex-[9] h-full">
					<div class="bg-white rounded-md h-full">
						<Line02 :type="'trend'"></Line02>
					</div>
				</div>

				<!-- Right Section -->
				<div class="flex flex-col flex-[3]">
					<div class="bg-white rounded-md">
						<Table02 :type="'trend'" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useUtilities } from '@/utils/common'

export default {
	setup() {
		const options = [
			'연립다세대매매실거래가격지수(10개월전)',
			'선행종합지수_변동량(9개월전)',
			'항목 3',
			'항목 4',
			'항목 5',
		]
		const selectedOptions = ref([])
		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		const selectedValue = ref('')
		const optionsList = ref([
			{ label: '옵션 1', value: 'option1' },
			{ label: '옵션 2', value: 'option2' },
			{ label: '옵션 3', value: 'option3' },
		])

		const years = ref('')
		const yearsList = ref([
			{ label: '옵션 1', value: 'option1' },
			{ label: '옵션 2', value: 'option2' },
			{ label: '옵션 3', value: 'option3' },
		])

		const months = ref('')
		const monthsList = ref([
			{ label: '옵션 1', value: 'option1' },
			{ label: '옵션 2', value: 'option2' },
			{ label: '옵션 3', value: 'option3' },
		])

		const handleSelectChange = value => {
			if (value && !selectedOptions.value.includes(value)) {
				selectedOptions.value.push(value)
			}
		}

		const handleReset = () => {
			selectedOptions.value = []
		}

		const handleRemove = option => {
			selectedOptions.value = selectedOptions.value.filter(item => item !== option)
		}

		return {
			options,
			selectedOptions,
			handleSelectChange,
			handleReset,
			handleRemove,
			imageSrc,
			selectedValue,
			optionsList,
			years,
			yearsList,
			months,
			monthsList,
		}
	},
}

// export default {
// 	name: 'PB',
// }
</script>

<style></style>
