import { ref } from 'vue'

export function useUtilities() {
	//공백 들여쓰기
	const formatStringWithNewlines = rawString => {
		return rawString.replace(/\n/g, '<br>')
	}

	//공통 이미지 처리
	const getImageSrc = (folder, file) => {
		const images = {
			bottom: import.meta.glob('@/assets/img/bottom/*.svg', { eager: true }),
			side: import.meta.glob('@/assets/img/side/*.svg', { eager: true }),
			news: import.meta.glob('@/assets/img/news/*.png', { eager: true }),
			// 필요 경로들 여기에 추가
		}
		const selectedFolder = images[folder] || {}
		const fileName = `/src/assets/img/${folder}/${file}.svg`

		return selectedFolder[fileName]?.default || selectedFolder[fileName]
	}

	//공통 이미지 처리
	const setImageSrc = (folder, file) => {
		const images = import.meta.glob('@/assets/img/**/*.@(svg|png|jpg)', { eager: true })

		const fileName = `/src/assets/img/${folder}/${file}`

		return (
			images[fileName + '.svg']?.default ||
			images[fileName + '.png']?.default ||
			images[fileName + '.jpg']?.default ||
			images[fileName + '.svg'] ||
			images[fileName + '.png'] ||
			images[fileName + '.jpg']
		)
	}

	//3자리 콤마
	const formatNumberWithComma = num => {
		if (isNaN(num)) return num // 숫자가 아닌 값일 경우 원래 값 반환
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	return {
		formatStringWithNewlines,
		getImageSrc,
		setImageSrc,
		formatNumberWithComma,
	}
}
