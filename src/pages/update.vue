<template>
	<div class="flex flex-col flex-[12] gap-6">
		<div class="mb-4">
			<div class="flex pt-[40px]">
				<button
					v-for="(tab, index) in tabs"
					:key="index"
					@click="activeTab = tab.name"
					class="px-8 py-2 text-lg font-bold bg-[#F3F3F3]"
					:class="activeTab === tab.name ? 'text-[#00B0B9] activeTab' : 'text-[#777777] font-normal'"
				>
					{{ tab.label }}
				</button>
			</div>

			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-6">
					<component :is="activeComponent"></component>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, computed, watchEffect, nextTick } from 'vue'
import Industry from '@/components/update/industry.vue'
import Plan from '@/components/update/plan.vue'
import Significant from '@/components/update/significant.vue'
import Srm from '@/components/update/srm.vue'
import { useServiceStore } from '@/store/service'
import { useUpdateStore } from '@/store/update'

export default {
	name: 'UPDATE',
	setup() {
		const serviceStore = useServiceStore()
		const updateStore = useUpdateStore()
		const activeTab = ref('accident')
		const tabs = [
			{ name: 'accident', label: '특이사항', component: Significant },
			{ name: 'bzplan', label: '사업계획', component: Plan },
			{ name: 'srm', label: 'SRM', component: Srm },
			{ name: 'Industry', label: '동종사지표', component: Industry },
		]

		const fetchUpdateGetdata = async params => {
			await updateStore.actGetUpdateGetdata(params)
		}

		const content = ref([])

		const activeComponent = computed(() => {
			const tab = tabs.find(t => t.name === activeTab.value)
			return tab ? tab.component : null
		})

		watch(
			() => activeTab.value,
			async (newValue, oldValue) => {
				console.log('oldValue', oldValue)
				console.log('newValue', newValue)
				if (!newValue || newValue === 'Industry') return

				const params = { data_type: newValue }
				await fetchUpdateGetdata(params)
			},
		)
		onMounted(async () => {
			const params = { data_type: activeTab.value }
			await fetchUpdateGetdata(params)
		})

		return { activeTab, activeComponent, tabs }
	},
}
</script>

<style scoped>
button {
	transition: all 0.2s ease-in-out;
	border: 1px solid #f3f3f3;
}
.activeTab {
	box-shadow: 0px 4px 8px 0px #00000033;
	border: 1px solid #00b0b9;
	border-radius: 4px;
	background-color: #fff !important;
}
</style>
