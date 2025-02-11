<template>
	<CardBox
		:title="'이달의 MDF 예측'"
		:ico="'ico_bar_graph01'"
		:subTit01="'예측값'"
		:subTit02="'정확도'"
		:content="content1"
		:type="'section'"
		:more="false"
	/>
	<CardBox :title="'이달의 예측오차'" :ico="'ico_bar_graph02'" :content="content2" :type="'section'" :more="false" />
	<CardBox :title="'이달의 영향인자 Top3'" :ico="'ico_bar_graph03'" :content="content3" :type="'list'" :more="true" />
</template>

<script>
import { defineComponent, ref, watch, onMounted, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useServiceStore } from '@/store/service'

export default defineComponent({
	name: 'Board',
	setup() {
		const route = useRoute()
		const currentPath = computed(() => route.path)
		const serviceStore = useServiceStore()

		const selectMonth = computed(() => {
			return serviceStore.getselectMonth
		})
		const selectProd = computed(() => {
			return serviceStore.getselectProd
		})

		const content1 = ref({ value: 36209, accuracy: 150 })
		const content2 = ref({ value: 46209, accuracy: null })
		const content3 = ref([])

		onMounted(() => {
			// if (serviceStore.getPreddata.feature_information[selectMonth.value]) {
			// 	content3.value = serviceStore.getPreddata.feature_information[selectMonth.value]
			// } else {
			// 	content3.value = []
			// }
		})

		watch(selectMonth, async () => {
			if (!serviceStore.getPreddata.feature_information) {
				return
			}

			const firstKey = Object.keys(serviceStore.getPreddata.feature_information)[0]

			const firstValue = serviceStore.getPreddata.feature_information[firstKey]
			console.log('firstValue', firstValue)

			content3.value = firstValue
			// if (serviceStore.getPreddata.feature_information[selectMonth.value] !== null) {
			// 	content3.value = serviceStore.getPreddata.feature_information[selectMonth.value]
			// } else {
			// 	content3.value = []
			// }
		})

		return {
			currentPath,
			serviceStore,
			content1,
			content2,
			content3,
			selectMonth,
			selectProd,
		}
	},
})
</script>

<style scoped>
.search {
	display: flex;
}

.search-result {
	display: flex;
	justify-content: space-between;
}
</style>
