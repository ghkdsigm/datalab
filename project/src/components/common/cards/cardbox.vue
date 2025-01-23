<template>
	<div class="w-full bg-white/10 rounded-lg border border-white/20 shadow-lg p-6 flex flex-col justify-between">
		<div class="text-center text-lg font-bold text-green-200 flex justify-between items-center mb-6">
			<span class="flex items-center">
				<img :src="`${imageSrc('mdf', ico)}`" :alt="ico || 'default-icon'" />
				<span class="ml-2">{{ title }}</span>
			</span>
			<span v-if="more" class="text-white text-sm font-light">더보기</span>
		</div>

		<template v-if="type === 'section'">
			<div class="flex gap-0">
				<template v-if="content">
					<div class="flex-1 rounded-l-md text-center">
						<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base">
							{{ subTit01 || new Date().toLocaleString('ko-KR', { month: 'long' }) }}
						</p>
						<p
							:class="[
								'mt-2 h-8 flex justify-center items-center',
								content.value ? 'text-base font-normal' : 'text-2xl font-bold',
							]"
						>
							<template v-if="content.value">
								{{ formatNumberWithComma(content.value) }}
								<em class="ml-1">m3</em>
							</template>
							<template v-else>업데이트예정</template>
						</p>
					</div>
					<div class="w-px h-[62px] bg-gray-400 mx-3"></div>
					<div class="flex-1 rounded-r-md text-center">
						<p class="bg-white text-gray-800 px-5 py-1 rounded-full font-bold text-base">
							{{
								subTit02 ||
								new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('ko-KR', { month: 'long' })
							}}
						</p>
						<p
							:class="[
								'mt-2 h-8 flex justify-center items-center',
								content.accuracy ? 'text-base font-normal' : 'text-2xl font-bold',
							]"
						>
							<template v-if="content.accuracy">
								{{ formatNumberWithComma(content.accuracy) }}
								<span class="ml-1">%</span>
								<span class="text-sm font-light ml-1">( 6383 m3 )</span>
							</template>
							<template v-else>업데이트예정</template>
						</p>
					</div>
				</template>
				<div v-else class="text-center text-red-500">에러가 발생하였습니다.</div>
			</div>
		</template>

		<template v-else>
			<div class="flex gap-0">
				<div class="flex-1 rounded-md text-center">
					<div v-for="(item, idx) in content.slice(0, 3)" :key="idx" class="h-6 flex items-center">
						<span class="text-gray-800 bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2">
							{{ idx + 1 }}
						</span>
						{{ item }}
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
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
		subTit01: String,
		subTit02: String,
		ico: String,
	},
	setup() {
		const { formatNumberWithComma, setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)
		return {
			formatNumberWithComma,
			imageSrc,
		}
	},
})
</script>

<style scoped></style>
