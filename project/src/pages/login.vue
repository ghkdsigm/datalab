<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-96 p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-700">로그인</h2>
      <form class="mt-6" @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700">아이디</label>
          <input 
            type="text" 
            v-model="username"
            placeholder="아이디를 입력하세요"
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">비밀번호</label>
          <input 
            type="password" 
            v-model="password"
            placeholder="비밀번호를 입력하세요"
            class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center text-gray-600 text-sm">
            <input 
              type="checkbox" 
              v-model="rememberMe" 
              class="mr-2"
            />
            자동 로그인
          </label>
        </div>
        <button 
          type="submit"
          class="w-full py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()

const login = () => {
  console.log('아이디:', username.value)
  console.log('비밀번호:', password.value)
  console.log('자동 로그인:', rememberMe.value)
  
  if (username.value && password.value) {
    // 로그인 성공 시 /mdf 페이지로 리디렉션
    localStorage.setItem('user', JSON.stringify({ username: username.value }))
    router.push('/mdf')
  } else {
    // 로그인 실패 처리
    alert('아이디와 비밀번호를 확인하세요.')
  }
}

// 로그인 페이지가 로드되었을 때, 이미 로그인된 경우 /mdf 페이지로 리디렉션
onMounted(() => {
  const loggedInUser = localStorage.getItem('user')
  if (loggedInUser) {
    // user 정보가 있으면 로그인된 상태로 간주하고 /mdf로 리디렉션
    router.push('/mdf')
  }
})
</script>
