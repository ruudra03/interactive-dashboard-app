<template>
	<main class="home">
		<h1>Dashboard</h1>

		<p v-if="isLoading">Loading...</p>
		<p v-else-if="isError">Error! Unable to connect to the server.</p>
		<v-container class="home-container" v-else>
			<v-row>
				<v-col cols="7">
					<SalaryChartCard />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<TableCard />
				</v-col>
			</v-row>
		</v-container>
	</main>
</template>

<script setup>
import SalaryChartCard from "../components/SalaryChartCard.vue"
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