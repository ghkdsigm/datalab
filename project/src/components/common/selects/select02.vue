<template>
	<div class="flex justify-between items-center text-white">
		<!-- Calendar Icon -->
		<div class="cursor-pointer">
			<i class="fas fa-calendar-alt text-xl"></i>
		</div>

		<!-- Dropdown -->
		<div class="relative" ref="dropdownRef">
			<button
				class="px-4 py-2 rounded-md flex items-center space-x-2 justify-between w-[140px] border border-[#CCCCCC]"
				@click="toggleDropdown"
			>
				<span class="pr-2">{{ selectedMonth }}</span>
				<img :src="imageSrc('common', 'ico_calander')" alt="" />
			</button>

			<!-- Dropdown Menu -->
			<div
				v-if="isDropdownOpen"
				class="w-full absolute text-left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg text-[#222] z-40"
			>
				<ul>
					<li
						v-for="month in months"
						:key="month"
						@click="selectMonth(month)"
						class="px-4 py-2 hover:bg-gray-200 cursor-pointer text-left"
					>
						{{ month }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'
import { useUtilities } from '@/utils/common'

const props = defineProps({
	selectedMonth: String, // 부모로부터 선택된 월
	months: Array, // 선택 가능한 월 목록
})

const { setImageSrc } = useUtilities()
const imageSrc = (folder, img) => setImageSrc(folder, img)

const emit = defineEmits(['update:selectedMonth'])

const dropdownRef = ref(null)

const isDropdownOpen = ref(false)

const toggleDropdown = event => {
	event.stopPropagation()
	isDropdownOpen.value = !isDropdownOpen.value
}

const selectMonth = month => {
	emit('update:selectedMonth', month) // 부모에게 선택된 월 전달
	isDropdownOpen.value = false // 드롭다운 닫기
}

// 드롭다운 외부 클릭 시 닫기
const onClickOutside = event => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
		isDropdownOpen.value = false
	}
}

// 이벤트 리스너 추가 및 제거
onMounted(() => {
	document.addEventListener('click', onClickOutside)
})
onUnmounted(() => {
	document.removeEventListener('click', onClickOutside)
})
</script>
