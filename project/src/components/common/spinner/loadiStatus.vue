<template>
	<div class="flex flex-col justify-center items-center w-full h-full">
		<!-- 스피너 -->
		<div class="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin mb-4"></div>

		<!-- 텍스트와 점 애니메이션 -->
		<div class="text-center text-[14px] text-gray-700">
			조회중입니다<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoadingSpinner',
}
</script>

<style scoped>
/* 점들에 애니메이션 적용 */
.dot-1,
.dot-2,
.dot-3 {
	opacity: 0;
	animation: blink 1.5s infinite;
}

.dot-1 {
	animation-delay: 0s;
}

.dot-2 {
	animation-delay: 0.3s;
}

.dot-3 {
	animation-delay: 0.6s;
}

/* 애니메이션 효과 */
@keyframes blink {
	0%,
	100% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
}
</style>
