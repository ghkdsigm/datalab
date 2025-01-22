module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	important: false,
	darkMode: 'class', // Tailwindcss 3.0 default is 'media',  'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
			},
			colors: {
				primary: '#1F2733',
				primaryHover: '#434A66',
				secondary: '#fff',
				secondaryHover: '#eee',
				third: '#11216b',
				thirdHover: '#182f96',
				fourth: '#cfcfcf4a',
				fourthHover: '#cfcfcf4a',
				fifth: '#42b883',
				fifthHover: '#42d392',
				sixth: '#fff',
				sixthHover: '#ccc',
				buttonHover: '0C7E60',
				dark: '#1a91da',
				light: '#a5d0f5',
				pale: '#777777',
				tranparent: 'transparent',
			},
			container: {
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '4rem',
					xl: '5rem',
					'2xl': '0rem',
				},
				margin: {
					'35vh': '35vh',
				},
				fontSize: {
					'1vh': '1vh',
					'2vh': '2vh',
					'3vh': '3vh',
					'4vh': '4vh',
					'5vh': '5vh',
					'6vh': '6vh',
					'7vh': '7vh',
					'8vh': '8vh',
					'9vh': '9vh',
					'10vh': '10vh',
					'11vh': '11vh',
					'12vh': '12vh',
					'13vh': '13vh',
					'14vh': '14vh',
					'15vh': '15vh',
					'16vh': '16vh',
					'17vh': '17vh',
					'18vh': '18vh',
					'19vh': '19vh',
					'20vh': '20vh',
					'21vh': '21vh',
					'22vh': '22vh',
					'23vh': '23vh',
					'24vh': '24vh',
					'25vh': '25vh',
					'26vh': '26vh',
					'27vh': '27vh',
					'28vh': '28vh',
					'29vh': '29vh',
					'30vh': '30vh',
					'31vh': '31vh',
					'32vh': '32vh',
					'33vh': '33vh',
					'34vh': '34vh',
					'35vh': '35vh',
					'36vh': '36vh',
					'37vh': '37vh',
					'38vh': '38vh',
					'39vh': '39vh',
					'40vh': '40vh',
				},
			},
		},
		screens: {
			'2xl': {max: '1535px'},
			// => @media (max-width: 1535px) { ... }

			xl: {max: '1279px'},
			// => @media (max-width: 1279px) { ... }

			lg: {max: '1023px'},
			// => @media (max-width: 1023px) { ... }

			md: {max: '767px'},
			// => @media (max-width: 767px) { ... }

			sm: {max: '639px'},
			// => @media (max-width: 639px) { ... }
		},
	},
	corePlugins: {
		container: false,
	},
	plugins: [
		function ({addComponents}) {
			// addComponents({
			//   '.container': {
			//     maxWidth: '100%',
			//     '@screen sm': {
			//       maxWidth: '640px',
			//     },
			//     '@screen md': {
			//       maxWidth: '768px',
			//     },
			//     '@screen lg': {
			//       maxWidth: '1280px',
			//     },
			//     '@screen xl': {
			//       maxWidth: '1600px',
			//     },
			//     '@screen 2xl': {
			//       maxWidth: '2900px',
			//     },
			//   },
			// });
		},
	],
}
