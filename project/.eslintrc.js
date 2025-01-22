module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		// 'vue/setup-compiler-macros': true,
		browser: true,
		node: true,
		mocha: true,
		es6: true,
	},
	plugins: ['prettier', 'nuxt', 'vue'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'prettier/prettier': [
			'error',
			{
				bracketSpacing: true,
				jsxBracketSameLine: true,
				singleQuote: true,
				trailingComma: 'all',
				endOfLine: 'auto',
				bracketSameLine: false,
				useTabs: true,
				semi: false,
				arrowParens: 'avoid',
				printWidth: 120,
			},
		],
	},
}
