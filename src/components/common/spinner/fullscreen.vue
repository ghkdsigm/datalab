<!-- components/FullScreenLoader.vue -->
<template>
	<div class="relative inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
		<div class="loader animate-spin w-12 h-12 border-2 border-t-[#00B0B9] border-gray-300 rounded-full mb-4"></div>
		<p class="text-gray-600 text-md">로딩 중입니다...</p>
	</div>
</template>

<script setup>
// 로직은 필요 없지만 향후 확장 가능성 대비 setup 유지
</script>

<style scoped>
/* 혹시 Tailwind에서 직접 구현 안 쓰고 커스텀 원하실 경우 이렇게도 가능 */
.loader {
	border-top-color: #00b0b9;
}
</style>
