<template>
	<div class="w-full bg-white/10 rounded-lg border border-white/20 shadow-lg p-6 flex flex-col justify-between">
		<div class="text-center text-lg font-bold text-green-200 flex justify-between items-center mb-4">
			<span class="flex items-center">
				<img :src="`${imageSrc('mdf', ico)}`" :alt="ico || 'default-icon'" />
				<span class="ml-2 text-[20px]">{{ title }}</span>
			</span>
			<span v-if="more" class="text-white text-sm font-light cursor-pointer" @click="showPopup(true)"
				>더보기 <em class="ml-1">></em>
			</span>
		</div>
		<template v-if="type === 'section'">
			<!-- 이달의  예측 -->
			<div class="flex gap-0 justify-center items-center mb-2" v-if="feature !== 'trend'">
				<div class="flex-1 rounded-l-md text-center">
					<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base inline-block">
						{{ subTit01 }}
					</p>
					<p
						:class="[
							'mt-2 h-8 flex justify-center items-center text-white',
							cardContent.base_pred ? 'text-base font-bold' : 'text-2xl font-bold',
						]"
					>
						<template v-if="!loadingContent01">
							<span class="text-[26px] font-bold">{{ truncateNumber(Number(cardContent?.base_pred)) + ' m3' }}</span>
							<!-- <em class="ml-1">m3</em> -->
						</template>
						<template v-else-if="!loadingContent01 && !cardContent.base_pred"
							><span class="text-white font-bold text-[18px]">업데이트예정</span></template
						>
						<template v-else>
							<div class="pt-6">
								<LoadingStatus />
							</div>
						</template>
					</p>
				</div>
				<div class="w-px h-[62px] bg-gray-400 mx-3"></div>
				<div class="flex-1 rounded-r-md text-center">
					<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base inline-block">
						{{
							subTit02 ||
							new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('ko-KR', { month: 'long' })
						}}
					</p>
					<p
						:class="[
							'mt-2 h-8 flex justify-center items-center text-white',
							cardContent.abs_error ? 'text-base font-bold' : 'text-2xl font-bold',
						]"
					>
						<template v-if="!loadingContent01">
							<span class="text-[26px] font-bold">{{ truncateNumber(Number(cardContent?.abs_error)) + ' m3' }}</span>
							<!-- <span class="ml-1">%</span>
								<span class="text-sm font-light ml-1">( 6383 m3 )</span> -->
						</template>
						<template v-else-if="!loadingContent01 && !cardContent.abs_error"
							><span class="text-white font-bold text-[18px]">업데이트예정</span></template
						>
						<template v-else>
							<div class="pt-6">
								<LoadingStatus />
							</div>
						</template>
					</p>
				</div>
			</div>
			<!-- 과거 미래 1년간 추세 -->
			<div class="flex gap-0 justify-center items-center mb-2" v-else>
				<div class="flex-1 rounded-l-md text-center">
					<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base inline-block">
						{{ subTit01 }}
					</p>
					<p
						:class="[
							'mt-2 h-8 flex justify-center items-center',
							cardContent.trend_sale ? 'text-base font-normal' : 'text-2xl font-bold',
						]"
					>
						<template v-if="!loadingContent01">
							<span v-if="cardContent.trend_sale === '1'" class="text-white font-bold text-[26px]"
								>상승 <img :src="`${imageSrc('common', 'ico_rising')}`" class="pl-2 w-[22px]"
							/></span>
							<span v-else-if="cardContent.trend_sale === '0'" class="text-white font-bold text-[26px]"
								>보합 <img :src="`${imageSrc('common', 'ico_middle')}`" class="pl-2 w-[22px]"
							/></span>
							<span v-else class="flex text-white font-bold text-[26px]"
								>하락 <img :src="`${imageSrc('common', 'ico_degradation')}`" class="pl-2 w-[22px]" /></span
						></template>
						<template v-else-if="!loadingContent01 && !cardContent.trend_sale"
							><span class="text-white font-normal text-[26px]">업데이트예정</span></template
						>
						<template v-else>
							<div class="pt-6">
								<LoadingStatus />
							</div>
						</template>
					</p>
				</div>
				<div class="w-px h-[62px] bg-gray-400 mx-3"></div>
				<div class="flex-1 rounded-r-md text-center">
					<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base inline-block">
						{{ subTit02 }}
					</p>
					<p
						:class="[
							'mt-2 h-8 flex justify-center items-center',
							cardContent.trend_pred ? 'text-base font-normal' : 'text-2xl font-bold',
						]"
					>
						<template v-if="!loadingContent01">
							<span v-if="cardContent.trend_pred === '1'" class="text-white font-bold text-[26px]"
								>상승 <img :src="`${imageSrc('common', 'ico_rising')}`" class="pl-2 w-[22px]"
							/></span>

							<span v-else-if="cardContent.trend_pred === '0'" class="text-white font-bold text-[26px]">보합</span>
							<span v-else class="flex text-white font-bold text-[26px]"
								>하락 <img :src="`${imageSrc('common', 'ico_degradation')}`" class="pl-2 w-[22px]" /></span
						></template>
						<template v-else-if="!loadingContent01 && !cardContent.trend_pred"
							><span class="text-white font-normal text-[26px]">업데이트예정</span></template
						>
						<template v-else>
							<div class="pt-6">
								<LoadingStatus />
							</div>
						</template>
					</p>
				</div>
			</div>
		</template>

		<!-- 영향인자 -->
		<template v-else>
			<div class="flex gap-0" v-if="!loadingContent01">
				<div class="flex-1 rounded-md text-center">
					<div
						v-for="(item, idx) in cardContent.slice(0, 3)"
						:key="idx"
						class="h-6 my-2 flex items-center justify-center"
					>
						<span class="text-gray-800 bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2">
							{{ idx + 1 }}
						</span>
						<span class="text-white text-lg">
							{{ item }}
						</span>
					</div>
				</div>
			</div>
			<div class="flex gap-0 justify-center" v-else-if="!loadingContent01 && cardContent.length === 0">
				<div class="pt-6">업데이트예정</div>
			</div>
			<div class="flex gap-0 justify-center" v-else>
				<div class="pt-6">
					<LoadingStatus />
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { defineComponent, ref, watch, computed, watchEffect } from 'vue'
import { useUtilities } from '@/utils/common'
import { useServiceStore } from '@/store/service'

export default defineComponent({
	name: 'CardBox',
	props: {
		title: {
			type: String,
			default: '',
		},
		content: {
			type: [Array, Object, null],
			required: true,
			default: () => [],
		},
		more: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			required: true,
		},
		feature: {
			type: String,
			default: '',
		},
		subTit01: {
			type: String,
			default: '',
		},
		subTit02: {
			type: String,
			default: '',
		},
		ico: {
			type: String,
			default: '',
		},
	},
	setup(props, { emit }) {
		const serviceStore = useServiceStore()
		const { formatNumberWithComma, setImageSrc, truncateNumber } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		const cardContent = ref([])

		const loadingContent01 = computed(() => serviceStore.getLoadingpreddata)

		// watch(
		// 	() => props.content,
		// 	(newValue, oldValue) => {
		// 		if (newValue !== oldValue) {
		// 			isLoading.value = false
		// 		}
		// 	},
		// 	{ deep: true },
		// )

		watch(
			() => props.content,
			(newValue, oldValue) => {
				if (newValue !== oldValue) {
					cardContent.value = newValue
				} else {
					cardContent.value = oldValues
				}
			},
			{ deep: true },
		)

		const showPopup = option => {
			emit('openPop', option)
		}

		return {
			formatNumberWithComma,
			imageSrc,
			showPopup,
			cardContent,
			loadingContent01,
			truncateNumber,
		}
	},
})
</script>

<style scoped></style>
