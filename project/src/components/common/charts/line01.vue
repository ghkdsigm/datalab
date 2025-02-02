<template>
	<div class="chart-container">
		<div class="flex justify-between items-center w-full">
			<!-- ✅ 레이블 목록 -->
			<div class="legend-container">
				<div
					v-for="(dataset, index) in chartData.datasets"
					:key="index"
					class="legend-item"
					@click="toggleDataset(index)"
					:class="{ 'active': isHidden(index) }"
				>
					<span class="legend-text">{{ dataset.label }}</span>
					<span class="legend-color" :style="{ backgroundColor: dataset.borderColor }"></span>
				</div>
			</div>

			<!-- ✅ 캘린더 (우측) -->
			<input type="month" class="calendar-input" />
		</div>

		<canvas ref="chartCanvas"></canvas>
	</div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
	name: 'LineChart',
	setup() {
		const chartCanvas = ref(null);
		let chartInstance = null;

		const chartData = reactive({
			labels: ['2024월 1일', '2024월 2일', '2024월 3일', '2024월 4일', '2025월 5일'],
			datasets: [
				{ label: 'MDF', data: [12000, 18000, 45000, 22000, 17000], tension: 0, radius: 1, borderColor: '#25CFEE' },
				{ label: 'MDF (예측)', data: [10000, 16000, 14000, 21000, 15000], tension: 0, radius: 1, borderColor: '#FF9900' },
				{
					label: '특이사항',
					data: [{}, { x: 3, y: 25000 }], // 특이사항이 있는 날짜에 동그라미 표시
					borderColor: '#48B68E',
					backgroundColor: '#48B68E',
					radius: 6,
					pointStyle: 'circle',
					fill: false,
					type: 'scatter',
				},
				{ label: '사업계획', data: [14000, 12000, 18000, 23000, 19000], tension: 0, radius: 1, borderColor: '#66FF99' },
				{ label: 'SRM', data: [16000, 15000, 20000, 27000, 22000], tension: 0, radius: 1, borderColor: '#9966FF' },
			],
		});

		onMounted(() => {
			const ctx = chartCanvas.value.getContext('2d');

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
								color: (context) => [10000, 20000, 30000, 40000, 50000].includes(context.tick.value)
									? 'rgba(0, 0, 0, 0.1)'
									: 'transparent',
								drawBorder: false,
								drawTicks: false,
							},
							ticks: { stepSize: 10000, callback: (value) => `${value / 1000}k` },
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
				plugins: [customVerticalLine],
			});
		});

		const customVerticalLine = {
			id: 'customVerticalLine',
			afterDraw(chart) {
				if (!chart.tooltip?.active) return;

				const { ctx, tooltip, chartArea } = chart;
				const x = tooltip.caretX;

				ctx.save();
				ctx.beginPath();
				ctx.moveTo(x, chartArea.top);
				ctx.lineTo(x, chartArea.bottom);
				ctx.lineWidth = 1.5;
				ctx.strokeStyle = 'rgba(0, 2, 2, 1)';
				ctx.setLineDash([5, 5]);
				ctx.stroke();
				ctx.restore();
			},
		};

		const toggleDataset = (index) => {
			const datasetMeta = chartInstance.getDatasetMeta(index);
			datasetMeta.hidden = !datasetMeta.hidden;
			chartInstance.update();
		};

		const isHidden = (index) => {
			return chartInstance?.getDatasetMeta(index)?.hidden ?? false;
		};

		return { chartCanvas, chartData, toggleDataset, isHidden };
	},
});
</script>

<style scoped>
.chart-container {
	width: 100%;
	height: 85%;
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
	width: 10px;
	height: 10px;
	border-radius: 50%;
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
</style>
