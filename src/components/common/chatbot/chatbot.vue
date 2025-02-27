<template>
	<!-- 챗봇 버튼 -->
	<div class="chatbotHead fixed bottom-[7vh] z-50">
		<button @click="toggleChat" class="w-[90px] h-[90px] flex items-center justify-center">
			<img :src="imageSrc('chatbot', 'ico_chatbot_button')" alt="챗봇버튼" />
		</button>
	</div>

	<!-- 챗봇 팝업 -->
	<div
		v-if="isOpen"
		class="chatbotBody fixed bottom-[9vh] w-[360px] h-[50%] bg-white rounded-lg flex flex-col overflow-hidden"
	>
		<!-- 헤더 -->
		<div class="bg-[#00B0B9] text-white p-3 flex justify-between items-center">
			<span class="font-bold">Chatbot</span>
			<button @click="toggleChat">
				<img :src="imageSrc('chatbot', 'ico_close')" alt="챗봇검색" />
			</button>
		</div>

		<!-- 새로고침 버튼 -->
		<div class="newTalk bg-white p-2 text-center border-b flex justify-end">
			<button @click="refreshChat" class="text-[#777777] text-[12px] flex items-center mr-1">
				<img :src="imageSrc('mdf', 'ico_refresh')" alt="초기화" class="inline-block mr-1" />
				새 대화
			</button>
		</div>

		<!-- 채팅 메시지 영역 -->
		<div class="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
			<!-- 대화 시작 전 안내 -->
			<div v-if="isLoading" class="flex flex-col items-center text-center gap-2">
				<span class="text-3xl">💬</span>
				<p>안녕하세요. 수요예측기반 Chatbot 입니다.</p>
				<p>무엇이든 물어보세요.</p>
			</div>

			<!-- 채팅 메시지 -->
			<div v-for="(message, index) in messages" :key="index" class="flex items-start gap-3">
				<div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
				<div class="bg-gray-100 px-3 py-2 rounded-lg max-w-[70%]">
					{{ message.text }}
				</div>
			</div>
		</div>

		<!-- 입력 영역 -->
		<div class="p-4 bg-gray-100 border-t flex items-center relative">
			<input
				v-model="newMessage"
				@keyup.enter="sendMessage"
				type="text"
				placeholder="메시지를 입력하세요"
				class="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B0B9]"
			/>
			<button @click="sendMessage" class="absolute right-5 text-blue-500 text-xl">
				<img v-if="newMessage.length !== 0" :src="imageSrc('chatbot', 'ico_send')" alt="챗봇검색" />
				<img v-else :src="imageSrc('chatbot', 'ico_send_off')" alt="챗봇검색" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { useUtilities } from '@/utils/common'
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const messages = ref([])
const newMessage = ref('')
const isLoading = ref(true)

const toggleChat = () => {
	isOpen.value = !isOpen.value
	if (isOpen.value) {
		setTimeout(() => {
			messages.value = [
				{ isUser: false, text: '안녕하세요. 수요예측기반 Chatbot 입니다.' },
				{ isUser: false, text: '무엇이든 물어보세요.' },
			]
			isLoading.value = false
		}, 2000)
	}
}

const sendMessage = () => {
	if (newMessage.value.trim()) {
		messages.value.push({ isUser: true, text: newMessage.value })

		setTimeout(() => {
			messages.value.push({ isUser: false, text: `AI의 응답: ${newMessage.value}` })
		}, 1000)

		newMessage.value = ''
	}
}

const refreshChat = () => {
	messages.value = [
		{ isUser: false, text: '안녕하세요. 챗봇입니다.' },
		{ isUser: false, text: '무엇이든 물어보세요.' },
	]
}

const { setImageSrc } = useUtilities()
const imageSrc = (folder, img) => setImageSrc(folder, img)
</script>

<style lang="scss" scoped>
.chatbotHead {
	right: calc(50% - 730px);
}
.chatbotBody {
	box-shadow: 0px 8px 30px 7px #00000033;
	right: calc(50% - 640px);
}
.newTalk {
	box-shadow: 0px 2px 4px 0px #00000014;
}

@media (max-width: 1500px) {
	.chatbotHead {
		right: 1%;
	}

	.chatbotBody {
		right: 8%;
	}
}
</style>
