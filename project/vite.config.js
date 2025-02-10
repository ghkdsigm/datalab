import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [vue()],
	build: {
		terserOptions: {
			compress: {
				drop_console: mode === 'production',
				drop_debugger: mode === 'production',
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	compilerOptions: {
		isCustomElement: tag => tag.startsWith('custom-'), // 맞춤형 요소 설정
	},
}))
