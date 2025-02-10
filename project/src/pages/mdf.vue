<template>
	<Content />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServiceStore } from '@/store/service'

const serviceStore = useServiceStore()
const serviceList = ref([])

const settingBasemonth = async () => {
	const params = 'bm_retail'
	await serviceStore.actGetBasemonth(params)

	serviceList.value = serviceStore.getBasemonth
	console.log(serviceList.value)
}

onMounted(async () => {
	await settingBasemonth()
})
</script>

<style></style>
