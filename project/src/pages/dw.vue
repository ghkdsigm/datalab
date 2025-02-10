<template>
	<Content basemonth />
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { useServiceStore } from '@/store/service'

// const serviceStore = useServiceStore()
// const basemonth = ref([])

// const settingBasemonth = async () => {
// 	const params = 'bm_retail'
// 	await serviceStore.actGetBasemonth(params) // 비동기 작업 기다리기

// 	basemonth.value = serviceStore.getBasemonth
// }

// onMounted(async () => {
// 	await settingBasemonth()
// })
</script>

<style></style>
