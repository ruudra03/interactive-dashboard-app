<template>
	<v-card elevation="10">
		<DataTable :height="200" :showSearch="false" />
	</v-card>
</template>

<script setup>
import DataTable from './DataTable.vue'
</script>
