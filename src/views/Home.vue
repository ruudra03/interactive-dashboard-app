<template>
	<main class="home">
		<v-container class="home-container">
			<v-row>
				<v-col cols="auto">
					<h1>Dashboard</h1>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="auto">
					<DashboardFilter />
				</v-col>
			</v-row>

			<p v-if="isLoading">Loading...</p>
			<p v-else-if="isError">Error! Unable to connect to the server.</p>

			<v-row v-else align="start">
				<v-col md="6" sm="12" xs="12" lg="6">
					<SalaryChartCard />
				</v-col>
				<v-col md="6" sm="12" xs="12" lg="6">
					<HireDateChartCard />
				</v-col>

				<v-col md="12" sm="12" xs="12" lg="12">
					<TableCard />
				</v-col>
			</v-row>
		</v-container>
	</main>
</template>

<script setup>
import SalaryChartCard from "../components/SalaryChartCard.vue"
import DashboardFilter from '../components/DashboardFilter.vue'
import HireDateChartCard from '../components/HireDateChartCard.vue'
import TableCard from '../components/TableCard.vue'
import { useStore } from "vuex"
import { computed } from "vue"

const apiStore = useStore()

const isLoading = computed(() => {
	return apiStore.state.isLoading
})

const isError = computed(() => {
	return apiStore.state.isError
})
</script>

<style scoped>
.home-container {
	margin: 0;
	padding: 0;
}
</style>