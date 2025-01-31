<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-gray-700 bg-opacity-50 absolute inset-0" @click="closePopup"></div>
    <div class="bg-white rounded-lg w-96 p-4 relative">
      <div class="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h3 class="text-xl">{{ title }}</h3>
        <button @click="closePopup" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div>
        <slot></slot> <!-- 내용 삽입 위치 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:isVisible']);

const closePopup = () => {
  emit('update:isVisible', false); // 부모 컴포넌트로 팝업 숨기기 이벤트 전송
};
</script>

<style scoped>
/* 스타일은 Tailwind CSS를 사용하므로 별도의 CSS 작성 없이 위 코드에서 스타일링 가능합니다 */
</style>
