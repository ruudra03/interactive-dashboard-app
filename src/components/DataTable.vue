<template>
	<v-card flat>
		<v-data-table
			v-model:page="page"
			:headers="headers"
			:items="data"
			:items-per-page="itemsPerPage"
			:height="tableHeight"
			item-value="id"
			multi-sort
		>
		</v-data-table>
	</v-card>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"

const apiStore = useStore()

const props = defineProps(['height'])

const tableHeight = ref(props.height)

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
const itemsPerPage = ref(10)
</script>
