<template>
	<div class="custom-select-wrapper">
		<!-- 드롭다운 헤더 -->
		<div class="custom-select-header" @click="toggleDropdown">
			<span v-html="getSelectDisplayValue" class=""></span>
		</div>

		<!-- 드롭다운 리스트 -->
		<ul v-if="isOpen" class="custom-select-list">
			<li v-for="(option, index) in options" :key="index" class="custom-select-item" @click="handleOptionClick(option)">
				{{ option }}
			</li>
		</ul>
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
		},
		selectedOptions: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['select'],
	setup(props, { emit }) {
		const isOpen = ref(false)

		// 드롭다운 열기/닫기
		const toggleDropdown = () => {
			isOpen.value = !isOpen.value
		}

		// 마지막 선택된 값과 나머지 개수 계산
		const getSelectDisplayValue = computed(() => {
			const lastSelected = props.selectedOptions[props.selectedOptions.length - 1] || '선택'
			const remainingCount = props.selectedOptions.length - 1

			return `
        ${`<span class="w-[120px] overflow-hidden text-ellipsis line-clamp-1 text-left">${lastSelected}</span>`}
        ${
					remainingCount > 0
						? `<span style="
                margin-left: 4px; color: #fff; font-weight: bold;
                background-color: red; border-radius: 12px; width: 34px;
                height: 22px; display: inline-flex; justify-content: center;
                align-items: center; text-decoration: none;
              ">+${remainingCount + 1}</span>`
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
		}
	},
}
</script>

<style scoped>
.custom-select-wrapper {
	position: relative;
	width: 200px;
}

.custom-select-header {
	cursor: pointer;
	background-color: #f4f4f4;
	padding: 8px 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.custom-select-header span {
	width: 100% !important;
	display: flex !important;
	justify-content: space-between !important;
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
}

.custom-select-item {
	padding: 8px 12px;
	cursor: pointer;
}

.custom-select-item:hover {
	background-color: #f0f0f0;
}
</style>
