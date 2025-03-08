<template>
	<div class="w-full flex items-center justify-between">
		<div>
			<label for="month" class="mr-2 text-md text-white">기준월</label>
			<SelectBox id="month" :options="month" v-model="selectedMonth" />

			<label for="prod" class="mx-2 text-md text-white">제품</label>
			<SelectBox id="prod" :options="prod" v-model="selectedProduct" />

			<span class="ml-5 text-white text-[20px] font-medium">보드 수량 예측 결과입니다.</span>
		</div>
		<div class="text-md text-white">{{ `( ${getStartEndDate(basemonth)} )` }}</div>
	</div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, computed, watchEffect, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useServiceStore } from '@/store/service'
import { useUtilities } from '@/utils/common'

export default defineComponent({
	name: 'BoardSearch',
	props: {
		basemonth: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const route = useRoute()
		const currentPath = computed(() => route.path)
		const serviceStore = useServiceStore()
		const { getStartEndDate } = useUtilities()

		const month = ref([])
		const prod = ref([])
		const selectedProduct = ref(0)
		const selectedMonth = ref(0)
		const isLoading = ref(false)

		// 기준월 데이터 업데이트 함수
		const updateMonth = () => {
			if (Array.isArray(props.basemonth) && props.basemonth.length > 0) {
				month.value = props.basemonth.map((item, idx) => {
					const year = item.slice(0, 4)
					const monthValue = item.slice(4)
					const monthTitle = `${year}.${monthValue}`
					return { value: Number(idx), title: monthTitle }
				})
				// 첫 번째 값 자동 선택
				selectedMonth.value = 0
				selectedProduct.value = 0
			} else {
				month.value = []
			}
		}

		// 제품 타입 불러오기
		const fetchProdType = async () => {
			if (!props.basemonth[selectedMonth.value]) return

			isLoading.value = true

			try {
				const params = {
					board_category: '',
					base_yyyymm: props.basemonth[selectedMonth.value],
				}

				if (currentPath.value === '/mdf') {
					params.board_category = 'mdf'
				} else if (currentPath.value === '/pb') {
					params.board_category = 'pb'
				} else if (currentPath.value === '/dw') {
					params.board_category = 'bm_retail'
				} else if (currentPath.value === '/apt') {
					params.board_category = 'apt_comp'
				} else {
					return
				}

				await serviceStore.actGetProdtype(params)
				await fetchPredData(params)
				await fetchtFeatureList(params)
			} catch (error) {
				console.log('error', error)
			} finally {
				isLoading.value = false
			}
		}

		// 예측데이터 불러오기
		const fetchPredData = async params => {
			if (params) params.prod_type = prod.value[selectedProduct.value]?.title
			else return
			await serviceStore.actGetPreddata(params)
		}

		// 보드 영향인자 리스트 불러오기
		const fetchtFeatureList = async params => {
			if (params) params.prod_type = prod.value[selectedProduct.value]?.title
			else return
			await serviceStore.actGetFeaturelist(params)
		}

		// serviceStore.getProdtype이 변경되면 prod 업데이트
		watchEffect(() => {
			if (serviceStore.getProdtype && serviceStore.getProdtype.prod_type) {
				prod.value = serviceStore.getProdtype.prod_type.map((item, idx) => ({
					value: Number(idx),
					title: item,
				}))

				serviceStore.selectMonthValue(props.basemonth[selectedMonth.value])
				serviceStore.selectProdValue(prod.value[selectedProduct.value]?.title)
			} else {
				prod.value = []
			}
		})

		// 마운트 시 초기화
		onMounted(async () => {
			updateMonth()
			await fetchProdType()
		})

		// basemonth 변경 감지하여 업데이트
		watch(
			() => props.basemonth,
			async () => {
				updateMonth()
				isLoading.value = true
				await fetchProdType()
			},
			{ deep: true },
		)

		// selectedMonth 변경 시 제품 정보 다시 불러오기
		watch(selectedMonth, async () => {
			await fetchProdType()
		})

		watch(selectedProduct, async () => {
			if (!props.basemonth[selectedMonth.value]) return

			isLoading.value = true
			try {
				const params = {
					board_category: '',
					base_yyyymm: props.basemonth[selectedMonth.value],
				}

				if (currentPath.value === '/mdf') {
					params.board_category = 'mdf'
				} else if (currentPath.value === '/pb') {
					params.board_category = 'pb'
				} else if (currentPath.value === '/dw') {
					params.board_category = 'bm_retail'
				} else {
					return
				}
				await fetchPredData(params)
				await fetchtFeatureList(params)
			} catch (error) {
				console.log('error', error)
			} finally {
				isLoading.value = false
			}
		})

		return {
			month,
			selectedProduct,
			selectedMonth,
			prod,
			isLoading,
			getStartEndDate,
		}
	},
})
</script>

<style scoped></style>
