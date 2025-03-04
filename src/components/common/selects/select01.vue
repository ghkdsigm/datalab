<template>
	<div class="flex items-center">
		<span v-if="label" class="font-bold pr-4">
			{{ label }}
		</span>
		<div class="custom-select-wrapper" :class="{ disabled: disabled }" ref="dropdownRef">
			<!-- 드롭다운 헤더 -->
			<div class="custom-select-header" @click="toggleDropdown" :style="`width:${width}px`">
				<span v-html="getSelectDisplayValue"></span>
				<div class="right-content">
					<!-- <span v-if="remainingCount > 0" class="badge">+{{ remainingCount + 1 }}</span> -->
					<span class="arrow-icon">{{ isOpen ? '▲' : '▼' }}</span>
				</div>
			</div>

			<!-- 드롭다운 리스트 -->
			<ul v-if="isOpen && !disabled" class="custom-select-list">
				<li
					v-for="(option, index) in options"
					:key="index"
					class="custom-select-item"
					:class="{ 'selected-item': selectedOptions.includes(option) }"
					@click="handleOptionClick(option)"
				>
					{{ option }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['select'],
	setup(props, { emit }) {
		const isOpen = ref(false)
		const dropdownRef = ref(null)
		const remainingCount = computed(() => props.selectedOptions.length - 1)

		// 드롭다운 열기/닫기
		const toggleDropdown = event => {
			event.stopPropagation()
			if (!props.disabled) {
				isOpen.value = !isOpen.value
			}
		}

		// 마지막 선택된 값과 나머지 개수 계산
		const getSelectDisplayValue = computed(() => {
			const lastSelected = props.selectedOptions[props.selectedOptions.length - 1] || '선택해주세요.'

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
			if (!props.disabled) {
				emit('select', option)
				isOpen.value = false
			}
		}

		// 드롭다운 외부 클릭 시 닫기
		const onClickOutside = event => {
			if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
				isOpen.value = false
			}
		}

		// 이벤트 리스너 추가 및 제거
		onMounted(() => {
			document.addEventListener('click', onClickOutside)
		})
		onUnmounted(() => {
			document.removeEventListener('click', onClickOutside)
		})

		return {
			isOpen,
			toggleDropdown,
			getSelectDisplayValue,
			handleOptionClick,
			remainingCount,
			handleOptionClick,
			dropdownRef,
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

/* disabled 상태일 때 스타일 */
.custom-select-wrapper.disabled {
	opacity: 0.5;
	pointer-events: none;
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
	max-height: 410px;
	overflow-y: scroll;
	box-shadow: 0px 2px 5px #00000038;
}

.custom-select-item {
	padding: 8px 12px;
	cursor: pointer;
}

.custom-select-item:hover {
	background-color: #f0f0f0;
}
.selected-item {
	background-color: #e1e1e1;
}
</style>
