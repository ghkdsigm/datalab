<template>
	<div>
		<!-- 동종사지표 -->
		<h2 class="text-left text-[#555555] py-[40px] text-[16px] font-normal">동종사지표를 업데이트해주세요.</h2>
		<div>
			<div class="border-[#CCCCCC] border p-[30px] rounded-2xl bg-[#F8F8F8] mb-[40px]">
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
			</div>
			<div class="border-[#CCCCCC] border p-[30px] rounded-2xl bg-[#F8F8F8] mb-[40px]">
				<h3 class="text-[#262626] font-bold text-left text-[18px] items-center pb-[30px]">PB</h3>
				<div class="grid grid-cols-2 gap-4">
					<div class="bg-white py-[22px] px-[16px] rounded-xl border-2 border-dashed">
						<Upload01 :title="'두께'" />
					</div>
					<div class="bg-white py-[22px] px-[16px] rounded-xl border-2 border-dashed">
						<Upload01 :title="'친환경'" />
					</div>
				</div>
			</div>
			<div class="border-[#CCCCCC] border p-[30px] rounded-2xl bg-[#fff]">
				<h3 class="text-[#262626] font-bold text-left flex text-[18px] items-center pb-[30px]">
					데이터 히스토리
					<span class="text-[#777777] text-[14px] font-normal pl-[16px]">*모델은 매달 25일 학습합니다</span>
				</h3>
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const feature = ref()
</script>
