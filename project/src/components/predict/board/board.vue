<template>
	<CardBox
		:title="`이달의 ${currentPath === '/mdf' ? 'MDF' : currentPath === '/pb' ? 'PB' : currentPath === '/dw' ? '건장재 시판' : '준공실적'} 예측`"
		:ico="'ico_bar_graph01'"
		:subTit01="'예측값'"
		:subTit02="'실적 오차'"
		:content="content1"
		:feature="''"
		:type="'section'"
		:more="false"
	/>
	<CardBox
		:title="'과거 미래 1년간 추세'"
		:ico="'ico_bar_graph02'"
		:subTit01="'과거'"
		:subTit02="'미래'"
		:content="content1"
		:feature="'trend'"
		:type="'section'"
		:more="false"
	/>
	<CardBox
		:title="'이달의 영향인자 Top3'"
		:ico="'ico_bar_graph03'"
		:content="content2"
		:feature="''"
		:type="'list'"
		:more="true"
		@openPop="openPop"
	/>
	<Popup01
		:title="'이달의 영향인자'"
		:isVisible="showPopup"
		@update:isVisible="showPopup = $event"
		:width="'720'"
		:data="content3"
	/>
</template>

<script>
import { defineComponent, ref, watch, onMounted, computed, watchEffect, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useServiceStore } from '@/store/service'

export default defineComponent({
	name: 'Board',
	setup() {
		const route = useRoute()
		const currentPath = computed(() => route.path)
		const serviceStore = useServiceStore()

		const selectMonth = computed(() => serviceStore.getselectMonth)
		const selectProd = computed(() => serviceStore.getselectProd)

		const content3 = computed(() => serviceStore.getPreddata?.feature_information ?? [])
		const content1 = computed(() => serviceStore.getPreddata?.card_section ?? [])
		const content2 = ref(null)

		const showPopup = ref(false)
		const openPop = val => {
			showPopup.value = val
		}

		onMounted(async () => {})

		watchEffect(() => {
			if (serviceStore.getPreddata?.feature_information) {
				content2.value = serviceStore.getPreddata.feature_information[serviceStore.getselectMonth]
			}
		})

		return {
			currentPath,
			serviceStore,
			content1,
			content2,
			content3,
			selectMonth,
			selectProd,
			showPopup,
			openPop,
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
