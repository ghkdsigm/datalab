<template>
	<div class="flex items-center w-full border border-gray-300 rounded-lg p-4 bg-white border-dashed border-2">
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
					<img :src="imageSrc('common', 'ico_upload')" alt="업로드" class="inline-block mr-[10px]" />
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
				<p v-if="isUploaded && !fail" class="text-green-500 text-xs mt-2">파일이 정상 업로드 되었습니다</p>
				<p v-if="isUploaded && fail" class="text-red-500 text-xs mt-2">업로드에 실패하였습니다.</p>
			</div>

			<!-- 우측 버튼 -->
			<button
				v-if="!selectedFile"
				class="ml-auto px-6 py-2 font-bold text-white bg-[#555555] rounded-md hover:bg-black"
				@click="triggerFileInput"
			>
				파일 선택
			</button>
		</div>

		<!-- 파일 입력 (숨김) -->
		<input :id="fileInputId" ref="fileInput" type="file" class="hidden" @change="handleFileSelect" />

		<!-- 취소 / 삭제 버튼 -->
		<button v-if="selectedFile" class="ml-auto text-gray-500 hover:text-red-500" @click="cancelUpload">
			<svg
				v-if="!isUploaded"
				class="w-6 h-6"
				fill="none"
				stroke="#fff"
				stroke-width="1"
				width="18"
				height="18"
				viewBox="0 0 24 24"
			>
				<circle cx="9" cy="9" r="9" fill="#555555" />
				<path d="M4.5 5.22958L5.22958 4.5L13.5 12.7704L12.7704 13.5L4.5 5.22958Z" fill="white" />
				<path d="M13.5 5.22958L12.7704 4.5L4.5 12.7704L5.22958 13.5L13.5 5.22958Z" fill="white" />
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
import { ref, computed, onMounted } from 'vue'
import { useUtilities } from '@/utils/common'
import { useUpdateStore } from '@/store/update'

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
})

const { setImageSrc } = useUtilities()
const imageSrc = (folder, img) => setImageSrc(folder, img)
const selectedFile = ref(null)
const uploadProgress = ref(0)
const isUploading = ref(false)
const isUploaded = ref(false)
const fileInput = ref(null)
const updateStore = useUpdateStore()
const fail = ref(false)

// 각 컴포넌트마다 고유한 ID 생성
const fileInputId = computed(() => `file-upload-${Math.random().toString(36).substring(2, 10)}`)

const handleFileSelect = async event => {
	console.log('event', event)
	const file = event.target.files[0]

	if (file) {
		const formData = new FormData()
		formData.append('file', file)

		selectedFile.value = file
		if (props.title === 'MDF') {
			await fetchtUpdateCompetitorMdf(formData)
		} else {
			await fetchtUpdateCompetitorPb(formData)
		}
	}
}

const startUpload = val => {
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

const failUpload = val => {
	isUploading.value = true
	isUploaded.value = false
	fail.value = false
	uploadProgress.value = 0

	const interval = setInterval(() => {
		if (uploadProgress.value >= 100) {
			clearInterval(interval)
			isUploading.value = false
			isUploaded.value = true
			fail.value = true
		} else {
			uploadProgress.value += 10
		}
	}, 300)
}

// 외부 경기지표 리스트 등록
const fetchtUpdateCompetitorMdf = async formData => {
	const res = await updateStore.actGetUpdateCompetitorMdf(formData)
	if (res.status === 200) {
		startUpload()
	} else {
		failUpload()
	}
}

// 외부 경기지표 리스트 등록
const fetchtUpdateCompetitorPb = async formData => {
	const res = await updateStore.actGetUpdateCompetitorPb(formData)
	console.log('??', res)
	if (res.status === 200) {
		startUpload()
	} else {
		failUpload()
	}
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
