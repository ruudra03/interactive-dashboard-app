<template>
	<main class="home">
		<h1>Dashboard</h1>
		<v-container class="home-container" v-if="!isLoading">
			<v-row>
				<v-col>
					<SalaryChartCard />
				</v-col>
				<v-col></v-col>
			</v-row>
		</v-container>
		<p v-else>Loading...</p>
		<p v-if="isError">Error! Unable to connect to the server.</p>
	</main>
</template>

<script setup>
import SalaryChartCard from "../components/SalaryChartCard.vue"
import { useStore } from "vuex"
import { computed, onMounted } from "vue"

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