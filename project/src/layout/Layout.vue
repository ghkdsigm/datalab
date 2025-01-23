<template>
	<transition name="route" mode="out-in">
		<component :is="layout"></component>
	</transition>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layout/DefaultLayout.vue'
import SecondLayout from '@/layout/SecondLayout.vue'

export default {
	components: {
		DefaultLayout,
		SecondLayout,
	},
	setup() {
		const route = useRoute()
		const layout = computed(() => route.meta.layout || 'DefaultLayout' || 'SecondLayout')

		return {
			layout,
		}
	},
}
</script>

<style>
/*컴포넌트 이동 트랜지션*/
/* .route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.1s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.1s ease-in;
} */
</style>
