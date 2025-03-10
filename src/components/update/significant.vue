<template>
	<div>
		<!-- 특이사항  -->
		<h2 class="text-left text-[#555555] py-[40px] text-[16px] font-normal">특이사항을 업데이트해주세요.</h2>
		<div class="border border-[#CCCCCC] rounded-l-2xl p-8">
			<FullScreenLoader v-if="loadingContent01" />
			<Table03 v-else :content01="content01 ? content01 : []" :title="'accident'" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUpdateStore } from '@/store/update'

const updateStore = useUpdateStore()
const content01 = computed(() => updateStore.getUpdateGetdata)
const loadingContent01 = computed(() => updateStore.getLoadinggetdata)
</script>

<style lang="css" scoped></style>
