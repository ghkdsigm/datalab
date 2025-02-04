<template>
	<div class="bg-[#262626] rounded-[8px] p-4 h-full">
		<div class="flex justify-between items-center w-full">
			<div class="legend-container">
				<div
					v-for="(dataset, index) in chartData.datasets"
					:key="index"
					class="legend-item"
					@click="toggleDataset(index)"
					:class="{ active: isHidden(index) }"
				>
					<span class="legend-color" :style="{ backgroundColor: dataset.borderColor }"></span>
					<span class="legend-text">{{ dataset.label }}</span>
				</div>
			</div>
		</div>
		<div class="chart-container">
			<canvas ref="chartCanvas"></canvas>
		</div>
	</div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from 'vue'
import Chart from 'chart.js/auto'

export default defineComponent({
	name: 'LineChart02',
	props: {
		type: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const chartCanvas = ref(null)
		let chartInstance = null

		const chartData = reactive({
			labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2025-05'],
			datasets: [
				{ label: 'MDF', data: [36000, 25000, 20000, 27000, 21000], tension: 0, radius: 1, borderColor: '#BEE7A2' },
				{
					label: '동행종합지수_변동량',
					data: [26000, 21000, 28000, 37000, 40000],
					tension: 0,
					radius: 1,
					borderColor: '#FB4F4F',
				},
			],
		})

		onMounted(() => {
			const ctx = chartCanvas.value.getContext('2d')

			chartInstance = new Chart(ctx, {
				type: 'line',
				data: chartData,
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						// x: {
						// 	grid: { display: false },
						// 	display: true,
						// },
						// y: {
						// 	display: true,
						// 	title: {
						// 		display: true,
						// 		text: 'Value',
						// 	},
						// 	beginAtZero: false,
						// 	grid: {
						// 		color: context =>
						// 			[20000, 30000, 40000].includes(context.tick.value) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
						// 		drawBorder: false,
						// 		drawTicks: false,
						// 	},
						// 	ticks: { stepSize: 10000, callback: value => `${value / 1000}k` },
						// },

						x: {
							grid: { display: false },
							//position: 'bottom',
							ticks: {
								callback: value => value,
								maxRotation: props.type === 'trend' ? 0 : -90,
								minRotation: props.type === 'trend' ? 0 : -90,
								//align: 'end',
								//autoSkip: true,
								color: 'white',
								autoSkip: true, // 일부 레이블 자동 생략
								padding: 40, // 간격 조정
								align: 'end', // 레이블 정렬 변경
							},
							//title: { display: true, text: '수량', color: 'white', font: { size: 14 } },
						},
						y: {
							position: 'left',
							beginAtZero: false,
							grid: { color: 'rgba(255, 255, 255, 0.2)' },
							ticks: { callback: value => `${value / 1000}K`, color: 'white' },
							title: { display: true, text: '수량(M3)', color: 'white', font: { size: 14 }, padding: { bottom: 10 } },
						},
						y2: {
							position: 'right',
							beginAtZero: true,
							grid: { drawOnChartArea: false },
							ticks: { callback: value => `${value / 0.5}`, stepSize: 0.5, color: 'white' },
							title: { display: true, text: '영향인자', color: 'white', font: { size: 14 }, padding: { bottom: 10 } },
						},
					},
					plugins: {
						legend: { display: false },
						tooltip: {
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
		})

		const customVerticalLine = {
			id: 'customVerticalLine',
			afterDraw(chart) {
				//console.log('뭐나옴1', chart)
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

		const toggleDataset = index => {
			const datasetMeta = chartInstance.getDatasetMeta(index)
			datasetMeta.hidden = !datasetMeta.hidden
			chartInstance.update()
		}

		const isHidden = index => {
			return chartInstance?.getDatasetMeta(index)?.hidden ?? false
		}

		return { chartCanvas, chartData, toggleDataset, isHidden }
	},
})
</script>

<style lang="scss" scoped>
.chart-container {
	width: 100%;
	height: 85%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
}

.legend-container {
	display: flex;
	gap: 12px;
	margin-bottom: 12px;
}

.legend-item {
	display: flex;
	align-items: center;
	background: #262626;
	border-radius: 6px;
	padding: 6px 10px;
	cursor: pointer;
}

.legend-color {
	width: 15px;
	height: 2px;
}

.legend-text {
	color: white;
	font-size: 14px;
	font-weight: 400;
	margin-left: 6px;
}

.active {
	background: gray;
	opacity: 1;
}

.active .legend-text {
	text-decoration: line-through;
	color: #fff;
}
</style>
