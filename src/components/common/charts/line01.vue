<!-- 보드예측결과 -->
<template>
	<div class="h-full">
		<div class="flex justify-between items-center w-full mb-4">
			<!-- 레이블 목록 -->
			<div class="legend-container">
				<div
					v-for="(dataset, index) in chartData.datasets"
					:key="index"
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
					<span class="legend-color" :style="{ backgroundColor: dataset.borderColor }"></span>
				</div>
			</div>

			<!-- 캘린더 (우측) -->
			<Select02 :selectedMonth="selectedMonth" :months="months" @update:selectedMonth="handleMonthChange" />
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

Chart.register(zoomPlugin)

export default defineComponent({
	name: 'LineChart01',
	props: {
		content: {
			type: [Array, Object],
			require: false,
		},
	},
	setup(props) {
		const chartCanvas = ref(null)
		let chartInstance = null
		const isFirstChange = ref(true)
		const checkLabel = ref(false)

		const serviceStore = useServiceStore()
		const currentMonth = computed(() => serviceStore.getselectMonth)

		const selectedMonth = ref() // 기본값: 이번 달
		const months = ref([])
		const hiddenDatasets = reactive([])

		const chartData = reactive({
			labels: [],
			datasets: [
				{
					label: 'MDF',
					tension: 0,
					radius: 1,
					borderColor: '#25CFEE',
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					label: 'MDF (예측)',
					tension: 0,
					radius: 1,
					borderColor: '#FF9900',
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					label: '특이사항',
					data: [{}, {}, { x: 3, y: 25000 }], // 특이사항이 있는 날짜에 동그라미 표시
					borderColor: '#48B68E',
					backgroundColor: '#48B68E',
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
					data: [34000, 22000, 31000],
					tension: 0,
					radius: 1,
					borderColor: '#FF11BC',
					fill: false,
					borderDash: [5, 5],
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
				{
					label: 'SRM 표시',
					tension: 0,
					radius: 1,
					borderColor: '#23A400',
					borderWidth: 3,
					pointRadius: 0,
					pointHoverRadius: 5,
				},
			],
		})

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

		onMounted(() => {
			getLast3Months()
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
				chartData.datasets[1].data = props.content.pred[String(selectedMonth.value)] || [] //MDF-예측
				chartData.datasets[3].data = props.content.bzplan || [] //사업계획
				if (selectedMonth.value && props.content.srm) {
					chartData.datasets[4].data = Object.values(props.content.srm) || [] //SRM
				}

				if (chartInstance) {
					chartInstance.update()
				}
			}
		})

		const handleMonthChange = newMonth => {
			selectedMonth.value = newMonth
		}

		const customVerticalLine = {
			id: 'customVerticalLine',
			afterDraw(chart) {
				//console.log('chart??', chart)
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

		const createChart = () => {
			const ctx = chartCanvas.value.getContext('2d')

			chartInstance = new Chart(ctx, {
				type: 'line',
				data: chartData,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: { grid: { display: false } },
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
								enabled: true, // 드래그 이동 가능
								mode: 'x', // X, Y축 모두 이동
								threshold: 10, // 드래그 시작 감지 민감도 (10픽셀 이상 이동시 반응)
							},
							zoom: {
								wheel: {
									enabled: true, // 마우스 휠 확대/축소
								},
								mode: 'x', // X, Y축 모두 확대/축소
							},
						},
						tooltip: {
							callbacks: {
								label: function (tooltipItem) {
									console.log('tooltipItem', tooltipItem)
									const value = tooltipItem.raw
									const label = tooltipItem.dataset.label
									return value !== undefined ? `${label}: ${value}` : 'No Data'
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
				plugins: [customVerticalLine, customVerticalLine02],
			})
			hiddenDatasets.length = chartData.datasets.length
			hiddenDatasets.fill(false)
		}

		const toggleDataset = index => {
			const datasetMeta = chartInstance.getDatasetMeta(index)
			datasetMeta.hidden = !datasetMeta.hidden
			hiddenDatasets[index] = datasetMeta.hidden
			chartInstance.update()
		}

		// const isHidden = index => {
		// 	// console.log('chartInstancechartInstance', chartInstance)
		// 	return chartInstance?.getDatasetMeta(index)?.hidden ?? false
		// 	//checkLabel.value = chartInstance?.getDatasetMeta(index)?.hidden ?? false
		// }

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

.legend-color {
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
