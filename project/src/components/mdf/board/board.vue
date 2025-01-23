<template>
	<CardBox
		:title="'이달의 MDF 예측'"
		:ico="'ico_bar_graph01'"
		:subTit01="'예측값'"
		:subTit02="'정확도'"
		:content="'content1'"
		:type="'section'"
		:more="false"
	/>
	<CardBox :title="'이달의 예측오차'" :ico="'ico_bar_graph02'" :content="'content2'" :type="'section'" :more="false" />
	<CardBox :title="'이달의 영향인자 Top3'" :ico="'ico_bar_graph03'" :content="'content3'" :type="'list'" :more="true" />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'Board',
	setup() {
		const content1 = ref({ value: 36209, accuracy: 150 })
		const content2 = ref({ value: 46209, accuracy: null })
		const content3 = ref([
			'동행종합지수_변동량',
			'주택매매시장소비심리지수',
			'부동산시장소비심리지수 변동량1',
			'부동산시장소비심리지수 변동량2',
		])

		return {
			content1,
			content2,
			content3,
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
