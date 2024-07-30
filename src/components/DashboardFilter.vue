<template >
	<v-menu v-model="menu" :close-on-content-click="false" location="end">
		<template v-slot:activator="{ props }">
			<v-btn
				class="filter-button"
				:class="filters ? 'filters-applied' : ''"
				color="var(--dark-alt)"
				v-bind="props"
				elevation="24"
			>
				<span class="material-icons">tune</span>
			</v-btn>
		</template>

		<v-card>
			<v-list>
				<v-list-item>
					<v-switch
						v-model="isExcludeInactive"
						color="var(--primary)"
						label="Exclude inactive employees"
						hide-details
						class="px-4"
					></v-switch>
				</v-list-item>
			</v-list>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn variant="text" @click="menu = false"> Cancel </v-btn>
				<v-btn
					color="var(--primary)"
					variant="text"
					@click="applyFilters"
				>
					Apply
				</v-btn>
				<v-btn color="red" variant="text" @click="removeFilters">
					Remove
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script setup>
import { ref } from "vue"

const menu = ref(false)
const filters = ref(false)

const isExcludeInactive = ref(false)

const applyFilters = () => {
	menu.value = false
	filters.value = true
}

const removeFilters = () => {
	menu.value = false
	filters.value = false
}

</script>

<style lang="scss" scoped>
.filter-button {
	color: white;
}

.filters-applied {
	.material-icons {
		color: var(--primary);
	}
}
</style>
