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
						@click="toggleIsExcludeInactive"
					></v-switch>
				</v-list-item>
			</v-list>
		</v-card>
	</v-menu>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"

const apiStore = useStore()

const menu = ref(false)
const filters = ref(false)
const isExcludeInactive = computed(() => {
	return apiStore.state.isExcludeInactive
})

const toggleIsExcludeInactive = () => {
	apiStore.commit('toggleIsExcludeInactive')
}
</script>

<style lang="scss" scoped>
.filter-button {
	color: white;
}
</style>
