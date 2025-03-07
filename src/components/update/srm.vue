<template>
	<div>
		<!-- SRM   -->
		<h2 class="text-left text-[#555555] py-[40px] text-[16px] font-normal">SRM을 업데이트해주세요.</h2>
		<div class="border border-[#CCCCCC] rounded-l-2xl p-8">
			<Table03 :content01="content01 ? content01 : []" :title="'srm'" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUpdateStore } from '@/store/update'

const updateStore = useUpdateStore()
const content01 = computed(() => updateStore.getUpdateGetdata)
</script>

<style lang="css" scoped></style>
