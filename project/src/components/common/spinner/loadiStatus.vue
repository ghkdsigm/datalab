<template>
	<div class="flex flex-col justify-center items-center w-full h-full">
		<div v-if="comment" class="flex flex-col justify-center items-center">
			<!-- 스피너 -->
			<div class="w-8 h-8 border-2 border-t-transparent border-primary rounded-full animate-spin mb-2"></div>

			<!-- 텍스트와 점 애니메이션 -->
			<div class="text-center text-[14px] text-gray-700">
				{{ comment }}<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>
			</div>
		</div>
		<div v-else>
			<!-- 스피너 -->
			<div class="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin mb-4"></div>

			<!-- 텍스트와 점 애니메이션 -->
			<!-- <div class="text-center text-[14px] text-gray-700">
				{{ comment }}<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>
			</div> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoadingStatus',
	props: {
		comment: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		return {}
	},
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
