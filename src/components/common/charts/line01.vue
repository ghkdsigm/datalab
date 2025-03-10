<!-- 보드예측결과 -->
<template>
	<div class="h-full">
		<div class="flex justify-between items-start w-full mb-4">
			<!-- 레이블 목록 -->
			<div class="legend-container flex-wrap">
				<template v-for="(dataset, index) in chartData.datasets" :key="index">
					<div
						:key="index"
						v-if="!dataset?.label?.includes('월')"
						class="legend-item"
						@click="toggleDataset(index)"
						:class="[
							{ active: hiddenDatasets[index] },
							{ srm: hasSRM(dataset.label) },
							{ bzplan: hasBZPLAN(dataset.label) },
							{ insane: hasINSANE(dataset.label) },
						]"
					>
						<span class="legend-text">{{ dataset.label }}</span>
						<span class="legend-color" :style="[{ backgroundColor: dataset.borderColor }]"></span>
					</div>
				</template>

				<template v-for="(dataset, index) in chartData.datasets" :key="index">
					<div v-if="dataset?.label?.includes('월') && !hiddenDatasets[index]" class="legend-item02">
						<span class="legend-text">{{ dataset.label }}</span>
						<span class="legend-color" :style="{ backgroundColor: dataset.borderColor }"></span>
					</div>
				</template>
			</div>

			<!-- 캘린더 (우측) -->
			<Select02
				:selectedMonth="selectedMonth"
				:months="months"
				@update:selectedMonth="handleMonthChange"
				:hiddenDatasets="hiddenDatasets"
			/>
		</div>
		<div class="chart-container">
			<canvas ref="chartCanvas"></canvas>
		</div>
	</div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, watch, watchEffect, computed, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import { useServiceStore } from '@/store/service'
import zoomPlugin from 'chartjs-plugin-zoom'
import { useUtilities } from '@/utils/common'

Chart.register(zoomPlugin)

export default defineComponent({
	name: 'LineChart01',
	props: {
		content: {
			type: [Array, Object],
			require: false,
		},
	},
	setup(props, { emit }) {
		const chartCanvas = ref(null)
		let chartInstance = null
		const isFirstChange = ref(true)
		const checkLabel = ref(false)

		const serviceStore = useServiceStore()
		const currentMonth = computed(() => serviceStore.getselectMonth)

		const selectedMonth = ref()
		const months = ref([])
		const hiddenDatasets = reactive([])

		const chartHeight = ref(null)

		const chartData = reactive({
			labels: [],
			datasets: [
				{
					label: 'MDF',
					tension: 0,
					radius: 1,
					borderColor: '#25CFEE',
					backgroundColor: '#25CFEE',
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					label: 'MDF (예측)',
					tension: 0,
					radius: 1,
					borderColor: '#F7832F',
					backgroundColor: '#F7832F',
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					label: '특이사항',
					//data: [{}, {}, { x: 3, y: 25000, z: '특이사항입니당' }],
					borderColor: '#9299AC',
					backgroundColor: '#9299AC',
					radius: 6,
					pointStyle: 'circle',
					// pointRadius: 10,
					// pointHoverRadius: 15,
					fill: false,
					type: 'scatter',
					borderWidth: 3,
				},
				{
					label: '사업계획',
					//data: [34000, 22000, 31000],
					tension: 0,
					radius: 1,
					borderColor: '#FF11BC',
					backgroundColor: '#FF11BC',
					fill: false,
					borderDash: [5, 5],
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					label: 'SRM 표시',
					tension: 0,
					radius: 1,
					borderColor: '#23E19D',
					backgroundColor: '#23E19D',
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					borderColor: '#FFD600',
					backgroundColor: '#FFD600',
					borderWidth: 3,
					tension: 0,
					radius: 1,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					borderColor: '#735EF0',
					backgroundColor: '#735EF0',
					borderWidth: 3,
					tension: 0,
					radius: 1,
					pointRadius: 0,
					pointHoverRadius: 5,
					hidden: true,
				},
				{
					borderColor: '#F1476B',
					backgroundColor: '#F1476B',
					borderWidth: 3,
					tension: 0,
					radius: 1,
					pointRadius: 0,
					pointHoverRadius: 5,
					hidden: true,
				},
			],
		})

		const { formatNumberWithCommaAndTwoDecimals } = useUtilities()

		// 특이사항 필터
		// const accidentData = computed(() =>
		// 	props.content.index.value.map(date => {
		// 		const key = date.replace("-", ""); // "2024-03" -> "202403"
		// 		return data.value[key] ? { x: date, y: data.value[key] } : null;
		// 	})
		// );

		// 최근 3개월 옵션 생성
		const getLast3Months = () => {
			if (currentMonth.value) {
				const currentYear = String(currentMonth.value).slice(0, 4)
				const currentMonthValue = String(currentMonth.value).slice(4, 6)

				// 현재 월을 기준으로 Date 객체 생성
				const now = new Date(`${currentYear}-${currentMonthValue}-01`)

				// months 배열 초기화
				months.value = []

				for (let i = 0; i < 3; i++) {
					// 최신 달부터 추가
					const month = new Date(now)
					month.setMonth(now.getMonth() - i) // 현재 월에서 i개월 전으로 설정
					const year = month.getFullYear()
					const monthFormatted = String(month.getMonth() + 1).padStart(2, '0') // 월을 두 자리로 맞춤
					months.value.push(`${year}${monthFormatted}`) // unshift 사용 (배열 앞에 추가)
				}
			}
			selectedMonth.value = months.value[0]
		}

		watch(currentMonth, (newVal, oldVal) => {
			getLast3Months() //예측결과내 셀렉트
			if (isFirstChange.value) {
				selectedMonth.value = newVal
				isFirstChange.value = false // 이후 감지 차단
			}
		})

		const formatMonth = dateString => {
			return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}`
		}

		const extractMonth = value => {
			const month = value.toString().slice(-2) // 마지막 두 자리를 추출 (월)
			return `${month}월` // 월에 '월'을 붙여서 반환
		}

		const accidentData = computed(() => {
			// MDF실제값 중간 Y축 위치
			// const filteredRealValues = props.content?.real?.filter(value => value !== null)
			// const minRealValue = Math.min(...filteredRealValues)
			// const maxRealValue = Math.max(...filteredRealValues)
			// const chartMinValue = minRealValue
			// const chartMaxValue = maxRealValue
			// const midValue = (chartMaxValue + chartMinValue) / 2
			// const adjustedY = midValue + midValue * 0.01 // 10% 정도 더 아래로 내리기

			return props.content.index?.map((date, idx) => {
				const key = date?.replace('-', '') // "2024-03" -> "202403"
				console.log('accide', key)

				// accident 데이터가 해당 월에 있는 경우에만 표시
				const accident = props.content.accident[key]
					? { x: 3, y: props.content.real[idx], z: props.content.accident[key] }
					: {}

				return accident
			})
		})

		onMounted(() => {
			getLast3Months()

			chartData.datasets[5].label = `MDF (${extractMonth(months.value[0])})`
			chartData.datasets[6].label = `MDF (${extractMonth(months.value[1])})`
			chartData.datasets[7].label = `MDF (${extractMonth(months.value[2])})`

			// if (props.content) {
			// 	chartData.labels = props.content.index || []
			// 	chartData.datasets[0].data = props.content.real || [] //mdf
			// 	chartData.datasets[3].data = props.content.bzplan || [] //bzplan
			// 	if (chartInstance) {
			// 		chartInstance.update()
			// 	}
			// }

			createChart()
		})

		watchEffect(() => {
			if (props.content) {
				chartData.labels = props.content.index || [] //레이블연도
				chartData.datasets[0].data = props.content.real || [] //MDF
				//chartData.datasets[1].data = props.content.pred[String(selectedMonth.value)] || [] //MDF-예측
				//chartData.datasets[2].data = accidentData.value || [] //특이사항
				//chartData.datasets[2].data = accidentData.value || []
				chartData.datasets[3].data = props.content.bzplan || [] //사업계획

				chartData.datasets[5].data = props.content.pred[String(months.value[0])] || [] //MDF-예측
				chartData.datasets[6].data = props.content.pred[String(months.value[1])] || [] //MDF-예측
				chartData.datasets[7].data = props.content.pred[String(months.value[2])] || [] //MDF-예측

				if (months.value) {
					console.log('months.value[0]', months.value[0])
					// chartData.datasets[5].label = `MDF (${extractMonth(months.value[0])})`
					// chartData.datasets[6].label = `MDF (${extractMonth(months.value[1])})`
					// chartData.datasets[7].label = `MDF (${extractMonth(months.value[2])})`
				}

				if (selectedMonth.value && props.content.srm) {
					chartData.datasets[4].data = Object.values(props.content.srm) || [] //SRM
					chartData.datasets[5].label = `MDF (${extractMonth(months.value[0])})`
					chartData.datasets[6].label = `MDF (${extractMonth(months.value[1])})`
					chartData.datasets[7].label = `MDF (${extractMonth(months.value[2])})`
				}

				if (props.content.accident) {
					chartData.datasets[2].data = accidentData.value || [] //특이사항
				}

				if (chartInstance) {
					chartInstance.update()
				}
			}
		})

		const handleMonthChange = newMonth => {
			selectedMonth.value = newMonth

			if (newMonth === months.value[0]) {
				toggleDataset(5)
			} else if (newMonth === months.value[1]) {
				toggleDataset(6)
			} else {
				toggleDataset(7)
			}
		}

		const customVerticalLine = {
			id: 'customVerticalLine',
			afterDraw(chart) {
				if (!chart.tooltip?.active) return

				const { ctx, tooltip, chartArea } = chart
				const x = tooltip.caretX

				ctx.save()
				ctx.beginPath()
				ctx.moveTo(x, chartArea.top)
				ctx.lineTo(x, chartArea.bottom)
				ctx.lineWidth = 5
				ctx.strokeStyle = 'rgba(0, 2, 2, 1)'
				ctx.setLineDash([5, 5])
				ctx.stroke()
				ctx.restore()
			},
		}

		const customVerticalLine02 = {
			id: 'customVerticalLine02',
			beforeInit: function (chart) {
				console.log('chart', chart)
				chart.options.scales.x.ticks.callback = function (value, index, values) {
					let label = chart.data.labels[index]

					if (/^\d{4}월 \d{1,2}일/.test(label)) {
						return label.replace(/^(\d{4}월) (\d{1,2}일)/, '$1\n$2')
					}
					return label
				}
			},
		}

		const customLabelPlugin = {
			id: 'customLabelPlugin',
			afterDraw(chart) {
				const ctx = chart.ctx

				chart.data.datasets.forEach((dataset, datasetIndex) => {
					if (dataset.label === '특이사항') {
						const meta = chart.getDatasetMeta(datasetIndex)

						dataset.data.forEach((point, index) => {
							if (!point || !meta.data[index]) return // point가 null이거나 element가 없으면 건너뛰기

							if (point.z) {
								//console.log('meta.data[index]', meta.data[index])
								//console.log('point.z', point.z)
								// z 값이 있을 때만 실행
								// const element = meta.data[index]
								// const x = element.x
								// const y = element.y
								// ctx.fillStyle = '#000'
								// ctx.font = '12px Arial'
								// ctx.textAlign = 'center'
								// ctx.fillText(point.z, x, y - 10) // 텍스트를 포인트 위에 표시
							}
						})
					} else return
				})
			},
		}

		const createChart = () => {
			const ctx = chartCanvas.value.getContext('2d')

			chartInstance = new Chart(ctx, {
				type: 'line',
				data: chartData,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: { grid: { display: false }, ticks: { padding: 5 }, offset: true },
						y: {
							beginAtZero: false,
							grid: {
								color: context =>
									[10000, 20000, 30000, 40000, 50000].includes(context.tick.value)
										? 'rgba(0, 0, 0, 0.1)'
										: 'transparent',
								drawBorder: false,
								drawTicks: false,
							},
							ticks: { stepSize: 10000, callback: value => `${value / 1000}k` },
						},
					},
					plugins: {
						legend: { display: false },
						zoom: {
							pan: {
								enabled: true,
								mode: 'x', // X, Y축 모두 이동 가능ㅋ
								threshold: 10, // 드래그 시작 감지 민감도 (10픽셀 이상 이동시 반응)
							},
							zoom: {
								wheel: {
									enabled: true, // 마우스 휠 확대/축소
								},
								mode: 'x', // X, Y축 모두 확대/축소 가능
							},
						},
						tooltip: {
							callbacks: {
								label: function (tooltipItem) {
									if (tooltipItem.raw.z) {
										return `${tooltipItem.raw.z}` // z 값 표시
									}
									const value = tooltipItem.raw
									const label = tooltipItem.dataset.label
									return value !== undefined ? `${label}: ${formatNumberWithCommaAndTwoDecimals(value)}` : 'No Data'
								},
							},
							enabled: true,
							mode: 'nearest',
							intersect: false,
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							titleColor: '#fff',
							bodyColor: '#fff',
							borderColor: '#fff',
							borderWidth: 1,
							padding: 10,
						},
					},
					hover: { mode: 'nearest', intersect: false },
				},
				plugins: [customVerticalLine, customVerticalLine02, customLabelPlugin],
			})
			hiddenDatasets.length = chartData.datasets.length
			hiddenDatasets.splice(0, hiddenDatasets.length, ...chartData.datasets.map(dataset => dataset.hidden ?? false))
		}

		const toggleDataset = index => {
			if (index === 1) {
				hiddenDatasets[5] = !hiddenDatasets[5]
				hiddenDatasets[6] = true
				hiddenDatasets[7] = true

				const datasetMeta5 = chartInstance.getDatasetMeta(5)
				const datasetMeta6 = chartInstance.getDatasetMeta(6)
				const datasetMeta7 = chartInstance.getDatasetMeta(7)

				datasetMeta5.hidden = hiddenDatasets[5]
				datasetMeta6.hidden = hiddenDatasets[6]
				datasetMeta7.hidden = hiddenDatasets[7]
			}

			const datasetMeta = chartInstance.getDatasetMeta(index)
			const isCurrentlyHidden = hiddenDatasets[index]

			datasetMeta.hidden = !isCurrentlyHidden
			hiddenDatasets[index] = datasetMeta.hidden

			nextTick(() => {
				chartInstance.update()
			})
		}

		// 초기 hidden 상태로 반응형 배열 채우기
		//hiddenDatasets.splice(0, hiddenDatasets.length, ...chartData.datasets.map(dataset => dataset.hidden ?? false))

		watch(hiddenDatasets, (newVal, oldVal) => {
			if (newVal[5] && newVal[6] && newVal[7]) {
				chartHeight.value = true
				hiddenDatasets[1] = true
			} else if (!newVal[5] || !newVal[6] || !newVal[7]) {
				chartHeight.value = false
				hiddenDatasets[1] = false
			} else {
				chartHeight.value = false
				hiddenDatasets[1] = false
			}

			emit('updateChartHeight', chartHeight.value)
		})

		const hasSRM = val => {
			if (typeof val === 'string' && val.includes('SRM')) {
				return true
			}
			return false
		}

		const hasBZPLAN = val => {
			if (typeof val === 'string' && val.includes('사업계획')) {
				return true
			}
			return false
		}

		const hasINSANE = val => {
			if (typeof val === 'string' && val.includes('특이사항')) {
				return true
			}
			return false
		}

		return {
			chartCanvas,
			chartData,
			toggleDataset,
			hiddenDatasets,
			months,
			handleMonthChange,
			selectedMonth,
			createChart,
			currentMonth,
			getLast3Months,
			isFirstChange,
			checkLabel,
			hasSRM,
			hasBZPLAN,
			hasINSANE,
			extractMonth,
			accidentData,
			chartHeight,
			formatNumberWithCommaAndTwoDecimals,
		}
	},
})
</script>

<style scoped>
.chart-container {
	width: 100%;
	height: calc(100% - 44px);
	background: white;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
}

/* ✅ 캘린더 (우측 상단) */
.calendar-input {
	/* 원하는 스타일 적용 */
}

/* ✅ 레이블 스타일 */
.legend-container {
	display: flex;
	gap: 12px;
}

.legend-item {
	display: flex;
	align-items: center;
	background: #262626;
	border-radius: 100px;
	padding: 8px 10px;
	cursor: pointer;
}

.legend-item02 {
	display: flex;
	align-items: center;
	background: #fff;
	border-radius: 100px;
	padding: 3px 10px;
	border: 1px solid #cccccc;
}
.legend-color {
	width: 15px;
	height: 3px;
	margin-left: 6px;
}

.legend-item02 .legend-color {
	width: 15px;
	height: 3px;
	margin-left: 6px;
}

.bzplan .legend-color {
	width: 15px;
	height: 3px;
	margin-left: 6px;
	background: linear-gradient(to right, #ff11bc 50%, currentColor 50%); /* 여기서 currentColor는 borderColor와 같음 */
	background-size: 5px 5px; /* 점선의 크기 */
}
.insane .legend-color {
	border-radius: 50px;
	width: 9px;
	height: 9px;
}

.legend-color-accident {
	width: 10px !important;
	height: 10px !important;
	border-radius: 50%;
	margin-left: 6px;
}

.legend-color-bzplan {
	width: 15px !important;
	border: 1px dotted green !important;
	border-width: 2px !important;
	margin-left: 6px;
}

.legend-text {
	color: white;
	font-size: 14px;
	font-weight: 400;
}

.legend-item02 .legend-text {
	color: #000;
	font-size: 14px;
	font-weight: 400;
}

.active {
	background: gray;
	opacity: 0.6;
}

.active .legend-text {
	text-decoration: line-through;
	color: #ccc;
}

.srm {
	background: white !important;
	color: #262626 !important;
	border: 1px solid #cccccc;
}
.srm .legend-text {
	color: #262626 !important;
}
</style>
