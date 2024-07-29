<template>
	<v-card class="mx-auto my-2" elevation="10">
		<v-card-item>
			<v-card-title> Salary Distribution </v-card-title>

			<template v-slot:append>
				<v-menu
					v-model="menu"
					:close-on-content-click="false"
					location="start"
				>
					<template v-slot:activator="{ props }">
						<v-btn
							:class="filters ? 'filters-applied' : ''"
							color="var(--dark-alt)"
							v-bind="props"
						>
							<span class="material-icons">tune</span>
						</v-btn>
					</template>

					<v-card>
						<v-card-actions>
							<v-btn variant="text" @click="menu = false">
								Cancel
							</v-btn>
							<v-btn
								color="var(--primary)"
								variant="text"
								@click="applyFilters"
							>
								Apply
							</v-btn>
							<v-btn
								color="red"
								variant="text"
								@click="removeFilters"
							>
								Remove
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu>
			</template>
		</v-card-item>
		<canvas id="salary-chart"></canvas>
	</v-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import ChartJS from "chart.js/auto"
import { useStore } from "vuex"

const apiStore = useStore()

const fav = ref(true)
const menu = ref(false)
const filters = ref(false)
const message = ref(false)
const hints = ref(true)

const applyFilters = () => {
	menu.value = false
	filters.value = true
}

const removeFilters = () => {
	menu.value = false
	filters.value = false
}

// ChartJS
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
		const result = JSON.parse(JSON.stringify(apiStore.state.data))

		const resultDepartments = result.filter((e) => {
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

	for (const s in companySalaries.value) {
		if (companySalaries.value[s] in uniqueSalaries) {
			counter.push(uniqueSalaries[companySalaries.value[s]])
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
		allDatasets[p] = uniqueSalaryCounter(employees, companySalaries)
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
			mode: 'dataset'
		},
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true
			}
		}
	}
}

const addDataset = (position, dataset, department) => {
	const newDataset = {
		label: position,
		data: dataset,
		stack: department
	}

	chartData.datasets.push(newDataset)
}

onMounted(() => {
	const chartDatasets = companyDepartmentsWithPositions.value

	const chartDatasetsData = salaryDatasets.value

	for (const d in chartDatasets) {
		for (const p of chartDatasets[d]) {
			const dataset = chartDatasetsData[p]
			addDataset(p, dataset, d)
		}
	}

	new ChartJS(document.getElementById('salary-chart'), chartConfig)
})
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
