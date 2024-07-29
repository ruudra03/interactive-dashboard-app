<template>
	<aside :class="`${isExpanded && 'is-expanded'}`">
		<div class="logo">
			<img src="../assets/logo.png" alt="Logo" />
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="toggleMenu">
				<span class="material-icons">
					keyboard_double_arrow_right
				</span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link class="button" to="/">
				<span class="material-icons">home</span>
				<span class="text">Home</span>
			</router-link>

			<router-link class="button" to="/website-data">
				<span class="material-icons">equalizer</span>
				<span class="text">Data</span>
			</router-link>

			<router-link class="button" to="/about">
				<span class="material-icons">description</span>
				<span class="text">About</span>
			</router-link>

			<router-link class="button" to="/add-user" v-if="isAdmin">
				<span class="material-icons">person_add</span>
				<span class="text">Add User</span>
			</router-link>

			<router-link class="button" to="/logout" v-if="isUserLoggedIn">
				<span class="material-icons">logout</span>
				<span class="text">Logout</span>
			</router-link>

			<router-link class="button" to="/login" v-else>
				<span class="material-icons">login</span>
				<span class="text">Login</span>
			</router-link>

			<router-link class="button" to="/settings">
				<span class="material-icons">settings</span>
				<span class="text">Settings</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"

const apiStore = useStore()

const isUserLoggedIn = computed(() => {
	return apiStore.state.isUserLoggedIn
})

const isAdmin = computed(() => {
	if (apiStore.state.activeUser[1] === 'admin') {
		return true
	} else {
		return false
	}
})

const isExpanded = ref(localStorage.getItem("isExpanded") === "true")

const toggleMenu = () => {
	isExpanded.value = !isExpanded.value

	localStorage.setItem("isExpanded", isExpanded.value)
}
</script>

<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;
	width: calc(2rem + 32px);
	min-height: 100vh;
	overflow: hidden;
	padding: 1rem;

	background-color: var(--dark);
	color: var(--light);

	transition: 0.2s ease-out;

	.flex {
		flex: 1 1 0;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-out;

		.menu-toggle {
			transition: 0.2s ease-out;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}

			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3,
	.button .text {
		opacity: 0;
		transition: 0.3s ease-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			padding: 0.5rem 1rem;
			transition: 0.2s ease-out;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}

			.text {
				color: var(--light);
				transition: 0.2s ease-out;
			}

			&:hover,
			&.router-link-exact-active {
				background-color: var(--dark-alt);

				.material-icons,
				.text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				border-right: 5px solid var(--primary);
			}
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;

			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3,
		.button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}
	}

	@media (max-width: 768px) {
		position: fixed;
		z-index: 99;
	}
}
</style>