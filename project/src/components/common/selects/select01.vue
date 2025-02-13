<template>
	<div class="flex items-center">
		<span v-if="label" class="font-bold pr-4">
			{{ label }}
		</span>
		<div class="custom-select-wrapper">
			<!-- 드롭다운 헤더 -->
			<div class="custom-select-header" @click="toggleDropdown" :style="`width:${width}px`">
				<span v-html="getSelectDisplayValue"></span>
				<div class="right-content">
					<!-- <span v-if="remainingCount > 0" class="badge">+{{ remainingCount + 1 }}</span> -->
					<span class="arrow-icon">{{ isOpen ? '▲' : '▼' }}</span>
				</div>
			</div>

			<!-- 드롭다운 리스트 -->
			<ul v-if="isOpen" class="custom-select-list">
				<li
					v-for="(option, index) in options"
					:key="index"
					class="custom-select-item"
					@click="handleOptionClick(option)"
				>
					{{ option }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
	name: 'CustomSelect',
	props: {
		options: {
			type: Array,
			required: true,
			default: () => [],
		},
		selectedOptions: {
			type: Array,
			default: () => [],
		},
		width: {
			type: String,
			default: '330',
		},
		label: {
			type: String,
			default: '',
		},
	},
	emits: ['select'],
	setup(props, { emit }) {
		const isOpen = ref(false)
		const remainingCount = computed(() => props.selectedOptions.length - 1)

		// 드롭다운 열기/닫기
		const toggleDropdown = () => {
			isOpen.value = !isOpen.value
		}

		// 마지막 선택된 값과 나머지 개수 계산
		const getSelectDisplayValue = computed(() => {
			const lastSelected = props.selectedOptions[props.selectedOptions.length - 1] || '선택'

			return `
    <span class="w-[230px] overflow-hidden text-ellipsis line-clamp-1 text-left">${lastSelected}</span>
    ${
			remainingCount.value > 0
				? `<span style="margin-left: 4px; color: #fff; font-weight: bold;
            background-color: #FB4F4F; border-radius: 12px; width: 34px;
            height: 22px; display: inline-flex; justify-content: center;
            align-items: center;">+${remainingCount.value + 1}</span>`
				: ''
		}
  `
		})

		// 항목 클릭 시 선택
		const handleOptionClick = option => {
			emit('select', option)
			isOpen.value = false
		}

		return {
			isOpen,
			toggleDropdown,
			getSelectDisplayValue,
			handleOptionClick,
			remainingCount,
		}
	},
}
</script>

<style lang="scss" scoped>
.custom-select-wrapper {
	position: relative;
	display: flex;
	align-items: center;
	> span:first-child {
		padding-right: 10px;
	}
}

.custom-select-header {
	cursor: pointer;
	background-color: #fff;
	padding: 8px 12px;
	border: 1px solid #555555;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
}

.custom-select-header span:first-child {
	width: 100% !important;
	display: flex !important;
	justify-content: space-between !important;
}

.custom-select-header span:last-child {
	width: 100% !important;
	display: flex !important;
	justify-content: end !important;
}

/* 화살표 아이콘 스타일 */
.arrow-icon {
	font-size: 14px;
	margin-left: 5px;
	color: #555;
}

.custom-select-list {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background: white;
	border: 1px solid #ccc;
	margin: 0;
	padding: 0;
	list-style: none;
	border-radius: 4px;
	z-index: 10;
	max-height: 300px;
	overflow-y: scroll;
}

.custom-select-item {
	padding: 8px 12px;
	cursor: pointer;
}

.custom-select-item:hover {
	background-color: #f0f0f0;
}
</style>
