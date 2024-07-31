<template>
	<v-card class="mx-auto my-2" elevation="10">
		<v-card-item>
			<v-row>
				<v-col cols="auto">
					<v-card-title> Hiring Date Distribution </v-card-title>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="auto">
					<v-btn
						density="compact"
						@click="downloadChartImage"
						elevation="0"
					>
						Download
					</v-btn>
				</v-col>
			</v-row>
			<canvas id="hire-date-chart"></canvas>
		</v-card-item>
	</v-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { color } from '../utils/colorsLibrary'
import ChartJS from "chart.js/auto"
import { useStore } from "vuex"

const apiStore = useStore()

// ChartJS
const chartImage = ref('')
const isAnimationComplete = ref(false)

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const monthsValue = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const currentYear = new Date().getFullYear()
const latestDataMonthVal = "06"

const companyYears = computed(() => {
	const allYears = apiStore.state.data.map((e) => {
		return e.hire_date.slice(-4)
	})

	const uniqueYears = allYears.filter((value, index, array) => {
		return array.indexOf(value) === index
	}).sort((a, b) => a - b)

	return uniqueYears
})

const uniqueHireDateCounter = (employees, months, year) => {
	const employeeHireDates = employees.map((e) => {
		return e.hire_date.slice(3, 5)
	})

	const allHireDates = employeeHireDates.sort((a, b) => a - b)

	const uniqueHireDates = {}

	for (const m of allHireDates) {
		if (uniqueHireDates[m]) {
			uniqueHireDates[m] += 1
		} else {
			uniqueHireDates[m] = 1
		}
	}

	let counter = []

	for (const m in monthsValue) {
		if (monthsValue[m] in uniqueHireDates) {
			counter.push(uniqueHireDates[monthsValue[m]])
		} else {
			if (!year === currentYear && !monthsValue[m] === latestDataMonthVal) {
				counter.push(0)
			}
		}
	}

	return counter
}

const hireDateDatasets = computed(() => {
	const allDatasets = {}

	for (const y of companyYears.value) {
		const employees = apiStore.state.data.filter((e) => {
			return e.hire_date.slice(-4) === y
		})
		allDatasets[y] = uniqueHireDateCounter(employees, months, y)
	}

	return allDatasets
})

const chartData = {
	labels: months,
	datasets: []
}

const chartConfig = {
	type: 'line',
	data: chartData,
	options: {
		plugins: {
			legend: {
				display: false
			}
		},
		responsive: true,
		interaction: {
			intersect: false,
			mode: 'dataset'
		},
		animation: {
			onComplete: function () {
				isAnimationComplete.value = true
			}
		}
	}
}

const addDataset = (year, dataset) => {
	const newDataset = {
		label: year,
		data: dataset
	}

	chartData.datasets.push(newDataset)
}

let hireDateChart

onMounted(() => {
	chartImage.value = ''
	isAnimationComplete.value = false

	const chartDatasets = companyYears.value

	const chartDatasetsData = hireDateDatasets.value

	for (const y in chartDatasets) {
		const dataset = chartDatasetsData[chartDatasets[y]]
		addDataset(chartDatasets[y], dataset)
	}

	hireDateChart = new ChartJS(document.getElementById('hire-date-chart'), chartConfig)
})

const downloadChartImage = () => {
	if (isAnimationComplete.value && hireDateChart) {
		chartImage.value = hireDateChart.toBase64Image()
	}
	if (chartImage.value !== '') {
		window.open(chartImage.value, 'Chart Image')
	}
}
</script>
