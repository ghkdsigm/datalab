<template>
	<span v-if="label" class="font-bold">
		{{ label }}
	</span>
	<div class="custom-select-wrapper">
		<!-- 드롭다운 헤더 -->
		<div class="custom-select-header" :style="`width:${width}px`" @click="toggleDropdown">
			<span class="selected-value">{{ selectedLabel }}</span>
			<span class="arrow-icon">{{ isOpen ? '▲' : '▼' }}</span>
		</div>

		<!-- 드롭다운 리스트 -->
		<ul v-if="isOpen" class="custom-select-list">
			<li v-for="(option, index) in options" :key="index" class="custom-select-item" @click="handleOptionClick(option)">
				{{ option.label }}
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
		modelValue: {
			type: [String, Number],
			default: '',
		},
		width: {
			type: String,
			default: '180',
		},
		label: {
			type: String,
			default: '',
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const isOpen = ref(false)

		// 드롭다운 열기/닫기
		const toggleDropdown = () => {
			isOpen.value = !isOpen.value
		}

		// 선택된 값
		const selectedLabel = computed(() => {
			const selectedOption = props.options.find(option => option.value === props.modelValue)
			return selectedOption ? selectedOption.label : '선택'
		})

		// 항목 선택
		const handleOptionClick = option => {
			emit('update:modelValue', option.value)
			isOpen.value = false
		}

		return {
			isOpen,
			toggleDropdown,
			selectedLabel,
			handleOptionClick,
		}
	},
}
</script>

<style scoped>
.custom-select-wrapper {
	position: relative;
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

.arrow-icon {
	font-size: 14px;
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
}

.custom-select-item {
	padding: 8px 12px;
	cursor: pointer;
	text-align: left;
}

.custom-select-item:hover {
	background-color: #f0f0f0;
}
</style>
