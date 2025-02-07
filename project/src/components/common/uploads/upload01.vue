<template>
	<div class="flex items-center w-full border border-gray-300 rounded-lg p-4">
		<!-- 좌측 제목 -->
		<span class="pr-[40px] text-gray-700 font-semibold">{{ title }}</span>

		<!-- 가운데 영역 -->
		<div class="flex-1 flex items-center justify-center">
			<label
				v-if="!selectedFile"
				:for="fileInputId"
				class="w-full h-[40px] flex flex-1 flex-row items-center justify-center cursor-pointer"
			>
				<div class="flex items-center">
					<!-- 아이콘 -->
					<svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16c0 3.313 2.687 6 6 6h4c3.313 0 6-2.687 6-6m-6-10a6 6 0 00-6 6"
						/>
					</svg>
					<!-- 텍스트 -->
					<p class="text-gray-500 text-sm">파일을 첨부해주세요</p>
				</div>
			</label>

			<!-- 업로드 진행 중 -->
			<div v-else class="w-full h-[40px] justify-start flex flex-col items-start">
				<div class="flex">
					<p class="text-[#262626] text-sm font-medium">{{ selectedFile.name }}</p>
					<p v-if="isUploading" class="text-[#9E9E9E] text-xs mt-1 pl-2">Uploading...</p>
				</div>
				<div v-if="isUploading" class="w-full bg-[#E6E6E6] rounded-full h-2 mt-2">
					<div class="loadingBar h-2 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
				</div>
				<p v-if="isUploaded" class="text-green-500 text-xs mt-2">파일이 정상 업로드 되었습니다</p>
			</div>

			<!-- 우측 버튼 -->
			<button
				v-if="!selectedFile"
				class="ml-auto px-6 py-2 font-bold text-white bg-gray-600 rounded-md hover:bg-black"
				@click="triggerFileInput"
			>
				파일 선택
			</button>
		</div>

		<!-- 파일 입력 (숨김) -->
		<input :id="fileInputId" ref="fileInput" type="file" class="hidden" @change="handleFileSelect" />

		<!-- 취소 / 삭제 버튼 -->
		<button v-if="selectedFile" class="ml-auto text-gray-500 hover:text-red-500" @click="cancelUpload">
			<svg v-if="!isUploaded" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
			<svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 6h18M8 6v12M16 6v12M5 6h14l-1 14H6L5 6zM10 6V4a2 2 0 014 0v2"
				/>
			</svg>
		</button>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
	title: {
		type: String,
		required: true,
	},
})

const selectedFile = ref(null)
const uploadProgress = ref(0)
const isUploading = ref(false)
const isUploaded = ref(false)
const fileInput = ref(null)

// 각 컴포넌트마다 고유한 ID 생성
const fileInputId = computed(() => `file-upload-${Math.random().toString(36).substring(2, 10)}`)

const handleFileSelect = event => {
	const file = event.target.files[0]
	if (file) {
		selectedFile.value = file
		startUpload()
	}
}

const startUpload = () => {
	isUploading.value = true
	isUploaded.value = false
	uploadProgress.value = 0

	const interval = setInterval(() => {
		if (uploadProgress.value >= 100) {
			clearInterval(interval)
			isUploading.value = false
			isUploaded.value = true
		} else {
			uploadProgress.value += 10
		}
	}, 300)
}

const cancelUpload = () => {
	selectedFile.value = null
	isUploading.value = false
	isUploaded.value = false
	uploadProgress.value = 0
}

const triggerFileInput = () => {
	fileInput.value.click()
}
</script>

<style lang="scss" scoped>
.loadingBar {
	background: linear-gradient(90deg, #196ce8 35.42%, #1ae3a7 127.62%);
}
</style>
