<template>
	<div class="w-full flex items-center justify-between">
		<div>
			<label for="product" class="mr-2 text-sm text-white"> 제품 </label>
			<SelectBox id="product" :options="arr" />

			<label for="month" class="mx-2 text-sm text-white"> 기준월 </label>
			<SelectBox id="month" :options="month" v-model="selectedMonth" />

			<span class="ml-5 text-white">보드 수량 예측 결과입니다.</span>
		</div>
		<div class="text-sm text-white">(2024 12월 ~ 25년 5월 월별 예측 예상)</div>
	</div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
	name: 'BoardSearch',
	setup() {
		const arr = ref([
			{ value: '', title: '전체' },
			{ value: 'item1', title: 'ITEM1' },
			{ value: 'item2', title: 'ITEM2' },
		])

		const month = ref([
			{ value: '1', title: '1월' },
			{ value: '2', title: '2월' },
			{ value: '3', title: '3월' },
			{ value: '4', title: '4월' },
			{ value: '5', title: '5월' },
			{ value: '6', title: '6월' },
			{ value: '7', title: '7월' },
			{ value: '8', title: '8월' },
			{ value: '9', title: '9월' },
			{ value: '10', title: '10월' },
			{ value: '11', title: '11월' },
			{ value: '12', title: '12월' },
		])

		const currentMonth = computed(() => {
			const now = new Date()
			return now.getMonth() + 1
		})

		const selectedMonth = ref(currentMonth.value)

		return {
			arr,
			month,
			selectedMonth,
		}
	},
})
</script>

<style scoped></style>
