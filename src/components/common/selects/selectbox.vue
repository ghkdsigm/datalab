<template>
	<select :id="id" class="styled-select" :value="modelValue" @input="updateValue">
		<option v-for="(option, idx) in options" :key="idx" :value="option.value">
			{{ option.title }}
		</option>
	</select>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SelectBox',
	props: {
		id: {
			type: String,
			required: true,
		},
		options: {
			type: Array,
			required: true,
			validator: value => {
				return value.every(option => 'value' in option && 'title' in option)
			},
		},
		modelValue: {
			type: [String, Number],
			default: '',
		},
	},
	methods: {
		updateValue(event) {
			this.$emit('update:modelValue', event.target.value)
		},
	},
})
</script>

<style scoped>
.styled-select {
	background-color: #3b3b3b;
	color: rgba(210, 255, 231, 1);
	padding: 8px 12px;
	border-radius: 4px;
	border: 1px solid #ffffff87;
	box-shadow: 6px 6px 10px 0px #000000de;
	font-size: 18px;
	font-weight: 600;
	min-width: 140px;
}
</style>
