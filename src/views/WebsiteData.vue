<template>
	<main class="data">
		<h1>Website Data</h1>
		<v-container class="website-data-container">
			<v-row>
				<v-col>
					<v-card flat>
						<template v-slot:text>
							<v-text-field
								v-model="search"
								label="Search"
								prepend-inner-icon="mdi-magnify"
								variant="outlined"
								hide-details
								single-line
							></v-text-field>
						</template>
						<v-data-table
							v-model:page="page"
							:headers="headers"
							:items="data"
							:search="search"
							:items-per-page="itemsPerPage"
							height="450"
							item-value="id"
							multi-sort
						>
						</v-data-table>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</main>
</template>

<script setup>
import { computed, ref } from "vue"
import { useStore } from "vuex"

const apiStore = useStore()

const search = ref('')

const headers = [
	{ title: 'ID', align: 'start', sortable: false, key: 'id' },
	{ title: 'Name', key: 'name', align: 'end' },
	{ title: 'Gender', key: 'gender', align: 'end' },
	{ title: 'Type', key: 'type', align: 'end' },
	{ title: 'Department', key: 'department', align: 'end' },
	{ title: 'Position', key: 'position', align: 'end' },
	{ title: 'Branch', key: 'branch', align: 'end' },
	{ title: 'Salary', key: 'salary', align: 'end' },
	{ title: 'Hire Date', key: 'hire_date', align: 'end' },
	{ title: 'Status', key: 'status', align: 'end' },
	{ title: 'Location', key: 'location', align: 'end' }
]

const data = computed(() => {
	return apiStore.state.data
})

const page = ref(1)
const itemsPerPage = ref(50)
</script>

<style scoped>
.website-data-container {
	margin: 0;
	padding: 0;
}
</style>