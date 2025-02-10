<template>
	<div class="w-full flex items-center justify-between">
		<div>
			<label for="product" class="mr-2 text-sm text-white">제품</label>
			<SelectBox id="product" :options="arr" v-model="selectedProduct" />

			<label for="month" class="mx-2 text-sm text-white">기준월</label>
			<SelectBox id="month" :options="month" v-model="selectedMonth" />

			<span class="ml-5 text-white">보드 수량 예측 결과입니다.</span>
		</div>
		<div class="text-sm text-white">(2024 12월 ~ 25년 5월 월별 예측 예상)</div>
	</div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'

export default defineComponent({
	name: 'BoardSearch',
	props: {
		basemonth: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		// 제품 옵션 데이터
		const arr = ref([
			{ value: 'product1', title: '제품 1' },
			{ value: 'product2', title: '제품 2' },
			{ value: 'product3', title: '제품 3' },
		])

		// 기준월 옵션 데이터
		const month = ref([])

		// 선택된 제품과 월을 저장할 변수
		const selectedProduct = ref('')
		const selectedMonth = ref(0)

		// 월 정보 변환
		onMounted(() => {
			if (Array.isArray(props.basemonth)) {
				props.basemonth.map((item, idx) => {
					const monthValue = item.slice(4) // 마지막 두 자리는 월을 의미
					const monthTitle = `${monthValue}월` // 예: "12월"로 변환

					console.log(idx)

					month.value.push({ value: Number(idx), title: monthTitle })
					console.log('month.value', month.value)
				})
			} else {
				console.error('basemonth는 배열이어야 합니다.')
			}
		})

		return {
			arr,
			month,
			selectedProduct,
			selectedMonth,
		}
	},
})
</script>

<style scoped></style>
