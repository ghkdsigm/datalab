<template>
	<div>
		<!-- 동종사지표 -->
		<h2 class="text-left text-[#555555] py-[40px] text-[16px] font-normal">동종사지표를 업데이트해주세요.</h2>
		<div>
			<!-- <div class="border-[#CCCCCC] border p-[30px] rounded-2xl bg-[#F8F8F8] mb-[40px]">
				<h3 class="text-[#262626] font-bold text-left text-[18px] items-center pb-[30px]">MDF</h3>
				<div class="grid grid-cols-2 gap-4">
					<div class="bg-white py-[22px] px-[16px] rounded-xl border-2 border-dashed">
						<Upload01 :title="'두께'" />
					</div>
					<div class="bg-white py-[22px] px-[16px] rounded-xl border-2 border-dashed">
						<Upload01 :title="'친환경'" />
					</div>
					<div class="bg-white py-[22px] px-[16px] rounded-xl border-2 border-dashed">
						<Upload01 :title="'브랜드'" />
					</div>
					<div class="bg-white py-[22px] px-[16px] rounded-xl border-2 border-dashed">
						<Upload01 :title="'협회자료'" />
					</div>
				</div>
			</div> -->
			<div class="border-[#CCCCCC] border px-[30px] py-[25px] rounded-2xl bg-[#F8F8F8] mb-[40px]">
				<h3 class="text-[#262626] font-bold text-left text-[18px] items-center">보드</h3>
				<div class="grid grid-cols-2 gap-4 py-[30px]">
					<Upload01 :title="'MDF'" />
					<Upload01 :title="'PB'" />
				</div>
				<div>
					<p class="text-[#262626] text-[14px]">다음과 반드시 동일한 양식으로 파일을 업데이트 해주세요.</p>
					<ul class="text-[#262626] text-[14px] flex justify-center mt-[14px]">
						<li class="mx-4"><strong class="font-bold">·</strong> 파일 형식 : .xlsx, .xls</li>
						<li class="mx-4">- 파일명 : 제품명_년도(ex. mdf_2025)</li>
						<li class="mx-4">- 엑셀 시트명 : 수급현황, 등급, 두께, 종류</li>
					</ul>
				</div>
			</div>
			<div class="border-[#CCCCCC] border p-[30px] rounded-2xl bg-[#fff]">
				<h3 class="text-[#262626] font-bold text-left flex text-[18px] items-center pb-[30px]">
					데이터 히스토리
					<span class="text-[#777777] text-[14px] font-normal pl-[16px]">*모델은 매달 25일 학습합니다</span>
				</h3>
				<FullScreenLoader v-if="loadingContent01" />
				<table class="w-full" v-else>
					<colgroup>
						<col width="*" />
						<col width="20%" />
						<col width="20%" />
					</colgroup>
					<thead>
						<tr>
							<th class="bg-[#F8F8F8] text-[#262626] font-bold py-[13px] border-[#E6E6E6] border-b">
								파일 업로드 현황
							</th>
							<th class="bg-[#F8F8F8] text-[#262626] font-bold py-[13px] border-[#E6E6E6] border-b">업로드 날짜</th>
							<th class="bg-[#F8F8F8] text-[#262626] font-bold py-[13px] border-[#E6E6E6] border-b">모델 학습 여부</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(file, index) in content?.file_list" :key="index">
							<td class="py-[13px] border-[#E6E6E6] border-b">
								<span class="hover:text-red cursor-pointer" @click="getDownLoadFile(file)">
									{{ file }}
								</span>
							</td>
							<td class="py-[13px] border-[#E6E6E6] border-b">{{ content?.upload_dates[index] }}</td>
							<td class="py-[13px] border-[#E6E6E6] border-b">
								<span
									v-if="content?.train_used[index] === 'X'"
									class="inline-block bg-[#FB4F4F] rounded-[4px] px-[20px] py-[10px] text-[14px] text-white font-bold"
								>
									모델 반영 실패
								</span>
								<span
									v-else-if="content?.train_used[index] === 'O'"
									class="inline-block bg-[#00CE7D] rounded-[4px] px-[20px] py-[10px] text-[14px] text-white font-bold"
								>
									모델 반영 완료
								</span>
								<span
									v-else
									class="inline-block bg-white border boder-[#CCCCCC] rounded-[4px] px-[20px] py-[10px] text-[14px] text-[#555555]"
								>
									모델 반영 대기중
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUpdateStore } from '@/store/update'
const updateStore = useUpdateStore()

const content = computed(() => updateStore.getUpdateHistory)
const loadingContent01 = computed(() => updateStore.getLoadinghistory)

// 업데이트 히스토리
const fetchUpdateHistory = async () => {
	await updateStore.actGetUpdateHistory()
}

// 파일 다운로드
const getDownLoadFile = async val => {
	const params = {
		file_name: val,
	}

	fetchData(params)
}

const fetchData = async params => {
	try {
		const response = await updateStore.actGetUpdateDownload(params)

		console.log('response', response)

		if (response.data && response.data.body.presigned_url) {
			const link = document.createElement('a')
			link.href = response.data.body.presigned_url
			link.setAttribute('download', '') // 파일 이름 자동 지정
			document.body.appendChild(link)
			link.click()
			link.remove()
		} else {
			console.error('파일 URL이 응답에 없습니다.', response.data)
		}
	} catch (err) {
		console.error('파일 다운로드 중 오류 발생:', err)
	}
}

onMounted(async () => {
	await fetchUpdateHistory()
})
</script>
