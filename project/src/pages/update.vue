<template>
	<div class="flex flex-col flex-[12] gap-6">
		<div class="mb-4">
			<div class="flex pt-[40px]">
				<button
					v-for="(tab, index) in tabs"
					:key="index"
					@click="activeTab = tab.name"
					class="px-4 py-2 text-lg font-bold bg-[#F3F3F3]"
					:class="activeTab === tab.name ? 'text-[#00B0B9] activeTab' : 'text-[#777777]'"
				>
					{{ tab.label }}
				</button>
			</div>

			<h2 class="text-left text-[#777777] py-[40px] text-[18px] font-bold">트렌드를 확인할 외부 지표를 선택하세요.</h2>

			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-6">
					<component :is="activeComponent"></component>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
import Industry from '@/components/update/industry.vue'
import Plan from '@/components/update/plan.vue'
import Significant from '@/components/update/significant.vue'
import Srm from '@/components/update/srm.vue'

export default {
	name: 'PB',
	setup() {
		const activeTab = ref('Significant')
		const tabs = [
			{ name: 'Significant', label: '특이사항', component: Significant },
			{ name: 'Plan', label: '사업계획', component: Plan },
			{ name: 'Srm', label: 'SRM', component: Srm },
			{ name: 'Industry', label: '동종업계', component: Industry },
		]

		const activeComponent = computed(() => {
			const tab = tabs.find(t => t.name === activeTab.value)
			return tab ? tab.component : null
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
