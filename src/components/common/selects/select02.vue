<template>
	<div class="flex justify-between items-center text-white">
		<div class="cursor-pointer">
			<i class="fas fa-calendar-alt text-xl"></i>
		</div>

		<!-- Dropdown -->
		<div class="relative" ref="dropdownRef">
			<button
				class="px-4 py-2 rounded-md flex items-center space-x-2 justify-between w-[140px] border border-[#CCCCCC]"
				@click="toggleDropdown"
			>
				<span class="pr-2">{{ formatYearMonth(selectedMonth) }}</span>
				<img :src="imageSrc('common', 'ico_calander')" alt="" />
			</button>

			<!-- Dropdown Menu -->
			<div
				v-if="isDropdownOpen"
				class="w-full absolute text-left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg text-[#222] z-40"
			>
				<ul>
					<li
						v-for="(month, idx) in months"
						:key="month"
						@click="selectMonth(month)"
						:class="{ 'bg-gray-200': !checkEle[idx] }"
						class="px-4 py-2 hover:bg-[#262626] hover:text-white cursor-pointer text-left"
					>
						{{ formatYearMonth(month) }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useUtilities } from '@/utils/common'

const props = defineProps({
	selectedMonth: String,
	months: Array,
	hiddenDatasets: Array,
})

const { setImageSrc, formatYearMonth } = useUtilities()
const imageSrc = (folder, img) => setImageSrc(folder, img)

const emit = defineEmits(['update:selectedMonth'])

const dropdownRef = ref(null)

const isDropdownOpen = ref(false)

const checkEle = ref([])

const toggleDropdown = event => {
	event.stopPropagation()
	isDropdownOpen.value = !isDropdownOpen.value
}

const selectMonth = month => {
	emit('update:selectedMonth', month)
	isDropdownOpen.value = false
}

const onClickOutside = event => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
		isDropdownOpen.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', onClickOutside)
	console.log('props.hiddenDatasets', props.hiddenDatasets)
	checkEle.value = props.hiddenDatasets.slice(-3)
})

watch(props.hiddenDatasets, (newVal, oldVal) => {
	checkEle.value = newVal.slice(-3)
})

onUnmounted(() => {
	document.removeEventListener('click', onClickOutside)
})
</script>
