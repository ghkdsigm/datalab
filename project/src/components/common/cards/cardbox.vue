<template>
	<div class="w-full bg-white/10 rounded-lg border border-white/20 shadow-lg p-6 flex flex-col justify-between">
		<div class="text-center text-lg font-bold text-green-200 flex justify-between items-center mb-4">
			<span class="flex items-center">
				<img :src="`${imageSrc('mdf', ico)}`" :alt="ico || 'default-icon'" />
				<span class="ml-2">{{ title }}</span>
			</span>
			<span v-if="more" class="text-white text-sm font-light" @click="showPopup(true)"
				>더보기 <em class="ml-1">></em>
			</span>
		</div>
		<template v-if="type === 'section'">
			<!-- 이달의  예측 -->
			<div class="flex gap-0 justify-center items-center" v-if="feature !== 'trend'">
				<template v-if="!isLoading">
					<div class="flex-1 rounded-l-md text-center">
						<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base inline-block">
							{{ subTit01 }}
						</p>
						<p
							:class="[
								'mt-2 h-8 flex justify-center items-center text-white',
								content.base_pred ? 'text-base font-normal' : 'text-2xl font-bold',
							]"
						>
							<template v-if="content.base_pred">
								{{ content.base_pred }}
								<!-- <em class="ml-1">m3</em> -->
							</template>
							<template v-else><span class="text-white font-normal text-[18px]">업데이트예정</span></template>
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
								content.abs_error ? 'text-base font-normal' : 'text-2xl font-bold',
							]"
						>
							<template v-if="content.abs_error">
								{{ content.abs_error }}
								<!-- <span class="ml-1">%</span>
								<span class="text-sm font-light ml-1">( 6383 m3 )</span> -->
							</template>
							<template v-else><span class="text-white font-normal text-[18px]">업데이트예정</span></template>
						</p>
					</div>
				</template>
				<div v-else class="text-center text-red-500 flex justify-center items-center">
					<LoadingStatus v-if="isLoading" />
				</div>
			</div>
			<!-- 과거 미래 1년간 추세 -->
			<div class="flex gap-0 justify-center items-center" v-else>
				<template v-if="!isLoading">
					<div class="flex-1 rounded-l-md text-center">
						<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base inline-block">
							{{ subTit01 }}
						</p>
						<p
							:class="[
								'mt-2 h-8 flex justify-center items-center',
								content.trend_sale ? 'text-base font-normal' : 'text-2xl font-bold',
							]"
						>
							<template v-if="content.trend_sale === '1'">
								<span class="text-white font-bold text-[18px]"
									>상승 <img :src="`${imageSrc('common', 'ico_rising')}`" class="pl-2 w-[22px]"
								/></span>
							</template>
							<template v-else-if="content.trend_sale === '0'">
								<span class="text-white font-bold text-[18px]">보합</span>
							</template>
							<template v-else
								><span class="flex text-white font-bold text-[18px]"
									>하락 <img :src="`${imageSrc('common', 'ico_degradation')}`" class="pl-2 w-[22px]" /></span
							></template>
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
								content.trend_pred ? 'text-base font-normal' : 'text-2xl font-bold',
							]"
						>
							<template v-if="content.trend_pred === '1'">
								<span class="text-white font-bold text-[18px]"
									>상승 <img :src="`${imageSrc('common', 'ico_rising')}`" class="pl-2 w-[22px]"
								/></span>
							</template>
							<template v-else-if="content.trend_pred === '0'">
								<span class="text-white font-bold text-[18px]">보합</span>
							</template>
							<template v-else
								><span class="flex text-white font-bold text-[18px]"
									>하락 <img :src="`${imageSrc('common', 'ico_degradation')}`" class="pl-2 w-[22px]" /></span
							></template>
						</p>
					</div>
				</template>
				<div v-else class="text-center text-red-500 flex justify-center items-center">
					<LoadingStatus v-if="isLoading" />
				</div>
			</div>
		</template>

		<!-- 영향인자 -->
		<template v-else>
			<div class="flex gap-0" v-if="!isLoading && content !== undefined && content">
				<div class="flex-1 rounded-md text-center">
					<div v-for="(item, idx) in content.slice(0, 3)" :key="idx" class="h-6 my-1 flex items-center justify-center">
						<span class="text-gray-800 bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2">
							{{ idx + 1 }}
						</span>
						<span class="text-white">
							{{ item }}
						</span>
					</div>
				</div>
			</div>
			<div v-else class="flex gap-0 w-full h-full items-center justify-center text-white items-center">
				<LoadingStatus v-if="isLoading" />
			</div>
		</template>
	</div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useUtilities } from '@/utils/common'

export default defineComponent({
	name: 'Card',
	props: {
		title: String,
		content: {
			type: [Array, Object],
			required: true,
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
		subTit01: String,
		subTit02: String,
		ico: String,
	},
	setup(props, { emit }) {
		const { formatNumberWithComma, setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		const isLoading = ref(true)

		watch(
			() => props.content,
			(newValue, oldValue) => {
				if (newValue !== oldValue) {
					isLoading.value = false
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
			isLoading,
			showPopup,
		}
	},
})
</script>

<style scoped></style>
