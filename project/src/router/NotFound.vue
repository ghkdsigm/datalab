<template>
  <div class="flex flex-col items-center space-y-4 justify-center h-screen pb-20 mx-auto text-black dark:text-white">
    <div class="">
      <i class="fab fa-twitter transition-all text-6xl ease-in-out text-primary hover:text-dark mb-1"></i>
    </div>
    <div class="text-9xl">404</div>
    <div class="text-2xl">페이지가 존재하지 않습니다.</div>
    <button>
      <a :href="buttonLink" class="border-2 border-black hover:text-primary hover:border-primary dark:border-gray-100 dark:hover:border-primary py-2 px-6 mt-5 block rounded-full">
        {{ buttonText }}
      </a>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const buttonLink = computed(() => {
  if (route.path.includes('/inoutkiosk')) {
    return '/inoutkiosk';
  }
  if (route.path.includes('/performancestatus')) {
    return '/performancestatus';
  }
  return '/customerkiosk';
});

const buttonText = computed(() => {
  if (route.path.includes('/inoutkiosk')) {
    return '입출고 무인화 키오스크로';
  }
  if (route.path.includes('/performancestatus')) {
    return '성능상황판 으로';
  }
  return '고객 키오스크로';
});
</script>

<style lang="scss" scoped>
</style>
