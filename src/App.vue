<template>
	<div class="app">
		<Sidebar />
		<router-view class="router-view" />
	</div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated } from "vue"
import { useStore } from "vuex"
import Sidebar from "./components/Sidebar.vue"

const apiStore = useStore()

onMounted(async () => {
	await apiStore.dispatch('fetchData')

	if (localStorage.getItem('isUserLoggedIn')) {
		apiStore.dispatch('loadStoredUser')
	}

	// console.log(apiStore.state.isExcludeInactive)
	apiStore.dispatch('loadStoredFilters')
	// console.log(apiStore.state.isExcludeInactive)
})
</script>


<style lang="scss">
:root {
	--primary: #4ade80;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--error: #ff0062;
	--sidebar-width: 200px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Fira sans", sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 768px) {
			padding-left: 6rem;
		}
	}

	.router-view {
		overflow: auto;
	}
}
</style>
