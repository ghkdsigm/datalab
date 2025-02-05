<template>
	<transition name="route" mode="out-in">
		<component v-if="layoutReady" :is="layout"></component>
	</transition>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layout/DefaultLayout.vue'
import SecondLayout from '@/layout/SecondLayout.vue'
import LoginLayout from '@/layout/LoginLayout.vue'

export default {
	name: 'Layout',
	components: {
		DefaultLayout,
		SecondLayout,
		LoginLayout,
	},
	setup() {
		const route = useRoute()
		const layout = computed(() => route.meta.layout || 'LoginLayout')

		const layoutReady = ref(false)

		console.log('layout', layout)

		// layout 값이 변경될 때 layoutReady를 true로 설정
		watchEffect(() => {
			if (layout.value) {
				layoutReady.value = true
			}
		})

		return {
			layout,
			layoutReady,
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
