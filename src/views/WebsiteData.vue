<template>
	<main class="data">
		<h1>Website Data</h1>
		<v-container class="website-data-container">
			<v-row>
				<v-col>
					<v-card flat>
						<DataTable
							:height="450"
							:showSearch="true"
							:search="search"
						/>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</main>
</template>

<script setup>
import DataTable from '../components/DataTable.vue'
import { ref } from "vue"

const search = ref('')
</script>