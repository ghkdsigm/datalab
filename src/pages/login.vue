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
				<button type="submit" class="w-full py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
					로그인
				</button>
			</form>
			<!-- Microsoft 로그인 버튼 -->
			<button class="w-full py-2 mt-4 text-white bg-gray-700 rounded-lg hover:bg-gray-800" @click="loginWithMicrosoft">
				Microsoft 로그인
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()

//테스트로그인
const login = () => {
	console.log('아이디:', username.value)
	console.log('비밀번호:', password.value)

	if (username.value && password.value) {
		// 로그인 성공 시 /mdf 페이지로 리디렉션
		localStorage.setItem('user', JSON.stringify({ username: username.value }))
		router.push('/mdf')
	} else {
		// 로그인 실패 처리
		alert('아이디와 비밀번호를 확인하세요.')
	}
}

// PKCE 관련 변수
const codeVerifier = ref('')
const codeChallenge = ref('')

// 랜덤한 code_verifier 생성
const generateCodeVerifier = () => {
	const array = new Uint8Array(32)
	window.crypto.getRandomValues(array)
	return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// code_challenge 생성 (SHA256 -> Base64 URL 인코딩)
const generateCodeChallenge = async verifier => {
	const encoder = new TextEncoder()
	const data = encoder.encode(verifier)
	const hashBuffer = await crypto.subtle.digest('SHA-256', data)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const base64 = btoa(String.fromCharCode.apply(null, hashArray))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
	return base64
}

// Microsoft 로그인 (PKCE 적용)
const loginWithMicrosoft = async () => {
	const tenantId = 'bde6c396-3b73-41a6-95bc-a5cef029123b'
	const clientId = '77601210-69b6-4975-aa95-6d8dcd951868'
	const redirectUri = encodeURIComponent('http://localhost:3333/login')
	const scope = encodeURIComponent('openid profile email')

	// PKCE 생성
	codeVerifier.value = generateCodeVerifier()
	localStorage.setItem('pkce_code_verifier', codeVerifier.value) // 이후 토큰 요청에 필요

	codeChallenge.value = await generateCodeChallenge(codeVerifier.value)

	console.log('codeChallenge.value', codeChallenge.value)

	// Microsoft 로그인 URL 생성
	const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&response_mode=query&code_challenge=${codeChallenge.value}&code_challenge_method=S256`
	//const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&response_mode=query`
	window.location.href = authUrl // 버튼 클릭 후 리디렉션
}

// 페이지 로드 시 인증 코드 처리
onMounted(() => {
	const urlParams = new URLSearchParams(window.location.search)
	console.log('urlParams:', urlParams)
	const code = urlParams.get('code')

	console.log('Code from URL:', code)

	// if (code) {
	// 	const storedCodeVerifier = localStorage.getItem('pkce_code_verifier')

	// 	// 백엔드로 code_verifier 포함하여 액세스 토큰 요청
	// 	fetch('/api/auth/microsoft', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ code, code_verifier: storedCodeVerifier }),
	// 	})
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			localStorage.setItem('accessToken', data.accessToken)
	// 			router.push('/mdf')
	// 		})
	// 		.catch(error => console.error('인증 실패:', error))
	// }

	//테스트로그인
	const loggedInUser = localStorage.getItem('user')
	if (loggedInUser) {
		// user 정보가 있으면 로그인된 상태로 간주하고 /mdf로 리디렉션
		router.push('/mdf')
	}
})
</script>
