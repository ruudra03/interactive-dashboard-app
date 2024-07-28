<template>
	<main class="home">
		<h1>Dashboard</h1>
		<v-container class="home-container">
			<v-row>
				<v-col>
					<SalaryChartCard v-if="!isLoading" />
				</v-col>
				<v-col></v-col>
			</v-row>
		</v-container>
	</main>
</template>

<script setup>
import SalaryChartCard from "../components/SalaryChartCard.vue"
import { useStore } from "vuex"
import { computed } from "vue"

const apiStore = useStore()

const isLoading = computed(() => {
	return apiStore.state.isLoading
})
</script>

<style scoped>
.home-container {
	margin: 0;
	padding: 0;
}
</style>