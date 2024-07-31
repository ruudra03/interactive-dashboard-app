<template>
	<v-card class="mx-auto my-2" elevation="10">
		<v-card-item>
			<v-row>
				<v-col cols="auto">
					<v-card-title>
						Salary Distribution
						<v-tooltip
							activator="parent"
							location="bottom"
							max-width="400"
						>
							Chart plots salaries given to number of employees in
							each department. Here, each stack for the given
							salary represents positions in each company
							department.
						</v-tooltip>
					</v-card-title>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="auto">
					<v-btn
						density="compact"
						@click="downloadChartImage"
						elevation="0"
					>
						Download
						<v-tooltip activator="parent" location="bottom">
							Opens a PNG image in new tab/window
						</v-tooltip>
					</v-btn>
				</v-col>
			</v-row>

			<canvas id="salary-chart"></canvas>
		</v-card-item>
	</v-card>
</template>

<script setup>
import { color } from '../utils/colorsLibrary'
import { computed, onMounted, ref } from "vue"
import ChartJS from "chart.js/auto"
import { useStore } from "vuex"

const apiStore = useStore()

// ChartJS
const chartImage = ref('')
const isAnimationComplete = ref(false)

const companySalaries = computed(() => {
	const allSalaries = apiStore.state.data.map((e) => {
		return e.salary
	})

	const uniqueSalaries = allSalaries.filter((value, index, array) => {
		return array.indexOf(value) === index
	})

	return uniqueSalaries.sort((a, b) => a - b).map((s) => '$' + s)
})

const companyPositions = computed(() => {
	const allPositions = apiStore.state.data.map((e) => {
		return e.position
	})

	const uniquePositions = allPositions.filter((value, index, array) => {
		return array.indexOf(value) === index
	})

	return uniquePositions
})

const companyDepartmentsWithPositions = computed(() => {
	const allDepartments = apiStore.state.data.map((e) => {
		return e.department
	})

	const uniqueDepartments = allDepartments.filter((value, index, array) => {
		return array.indexOf(value) === index
	})

	const uniqueDepartmentsWithPositions = {}

	for (const d of uniqueDepartments) {
		const resultDepartments = apiStore.state.data.filter((e) => {
			return e.department === d
		})

		const allResultPositions = resultDepartments.map((e) => {
			return e.position
		})

		const uniqueResultPositions = allResultPositions.filter((value, index, array) => {
			return array.indexOf(value) === index
		})

		uniqueDepartmentsWithPositions[d] = uniqueResultPositions
	}

	return uniqueDepartmentsWithPositions
})

const uniqueSalaryCounter = (employees, companySalaries) => {
	const employeeSalaries = employees.map((e) => {
		return e.salary
	})

	const allSalaries = employeeSalaries.sort((a, b) => a - b).map((s) => '$' + s)

	const uniqueSalaries = {}

	for (const s of allSalaries) {
		if (uniqueSalaries[s]) {
			uniqueSalaries[s] += 1
		} else {
			uniqueSalaries[s] = 1
		}
	}

	let counter = []

	for (const s in companySalaries) {
		if (companySalaries[s] in uniqueSalaries) {
			counter.push(uniqueSalaries[companySalaries[s]])
		} else {
			counter.push(0)
		}
	}

	return counter
}

const salaryDatasets = computed(() => {
	const allDatasets = {}

	for (const p of companyPositions.value) {
		const employees = apiStore.state.data.filter((e) => {
			return e.position === p
		})
		allDatasets[p] = uniqueSalaryCounter(employees, companySalaries.value)
	}

	return allDatasets
})

const chartData = {
	labels: companySalaries.value,
	datasets: []
}

const chartConfig = {
	type: 'bar',
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
			mode: 'x'
		},
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true
			}
		},
		animation: {
			onComplete: function () {
				isAnimationComplete.value = true
			}
		}
	}
}

const addDataset = (position, dataset, department, bgColor) => {
	const newDataset = {
		label: position,
		data: dataset,
		backgroundColor: bgColor,
		stack: department
	}

	chartData.datasets.push(newDataset)
}

let salaryChart

onMounted(() => {
	chartImage.value = ''
	isAnimationComplete.value = false

	const chartDatasets = companyDepartmentsWithPositions.value

	const chartDatasetsData = salaryDatasets.value

	for (const d in chartDatasets) {
		for (const p of chartDatasets[d]) {
			const positionIndex = companyPositions.value.indexOf(p)
			const c = color(positionIndex)
			const dataset = chartDatasetsData[p]
			addDataset(p, dataset, d, c)
		}
	}

	salaryChart = new ChartJS(document.getElementById('salary-chart'), chartConfig)
})

const downloadChartImage = () => {
	if (isAnimationComplete.value && salaryChart) {
		chartImage.value = salaryChart.toBase64Image()
	}
	if (chartImage.value !== '') {
		window.open(chartImage.value, 'Chart Image')
	}
}
</script>

<style lang="scss" scoped>
.material-icons {
	color: white;
}

.filters-applied {
	.material-icons {
		color: var(--primary);
	}
}
</style>
