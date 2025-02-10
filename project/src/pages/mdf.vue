<template>
	<Content />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServiceStore } from '@/store/service'

const serviceStore = useServiceStore()
const serviceList = ref([])

const settingBasemonth = async () => {
	const params = 'mdf'
	await serviceStore.actGetBasemonth(params) // 비동기 작업 기다리기

	serviceList.value = serviceStore.getBasemonth
}

onMounted(async () => {
	await settingBasemonth()
})
</script>

<style></style>
