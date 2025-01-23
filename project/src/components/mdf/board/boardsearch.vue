<template>
	<div class="w-full flex items-center justify-between">
		<div>
			<label for="product" class="mr-2 text-sm text-white"> 제품 </label>
			<SelectBox id="product" :options="arr" />

			<label for="month" class="mx-2 text-sm text-white"> 기준월 </label>
			<SelectBox id="month" :options="month" />

			<span class="ml-5 text-white">보드 수량 예측 결과입니다.</span>
		</div>
		<div class="text-sm text-white">(2024 12월 ~ 25년 5월 월별 예측 예상)</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'BoardSearch',
	setup() {
		const arr = ref([
			{ value: '', title: '전체' },
			{ value: 'item1', title: 'ITEM1' },
			{ value: 'item2', title: 'ITEM2' },
		])

		const month = ref([
			{ value: '11', title: '11' },
			{ value: '22', title: '22' },
		])

		return {
			arr,
			month,
		}
	},
})
</script>

<style scoped></style>
