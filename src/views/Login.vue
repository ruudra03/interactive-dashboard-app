<template>
	<main class="login">
		<v-row justify="center">
			<v-col>
				<v-card>
					<form @submit.prevent="login">
						<v-container fill-height>
							<v-row>
								<v-col cols="12">
									<h1>Login</h1>
								</v-col>
								<v-col>
									<div class="error">
										{{ errorMsg }}
									</div>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<label>Username:</label>
									<input
										type="text"
										required
										v-model="username"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<label>Password:</label>
									<input
										type="password"
										required
										v-model="password"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-btn
										class="v-button"
										color="var(--dark-alt)"
										type="submit"
									>
										Login
									</v-btn>
								</v-col>
							</v-row>
						</v-container>
					</form>
				</v-card>
			</v-col>
		</v-row>
	</main>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const router = useRouter()

const apiStore = useStore()

const username = ref('')
const password = ref('')

const isError = computed(() => {
	return apiStore.state.isFailed
})

const errorMsg = computed(() => {
	if (isError) {
		return "Unable to login at this time. Try agian later."
	} else {
		return apiStore.state.invalidMsg
	}

})

const login = async () => {
	await apiStore.dispatch('loginUser', { username: username, password: password })
}
</script>

<style scoped>
form {
	max-width: 420px;
	margin: 30px auto;
	background: white;
	text-align: left;
	padding: 40px;
	border-radius: 10px;
}

label {
	color: #aaa;
	display: inline-block;
	margin: 25px 0 15px;
	font-size: 0.6em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}

input {
	display: block;
	padding: 10px 6px;
	width: 100%;
	box-sizing: border-box;
	border: none;
	border-bottom: 1px solid #ddd;
	color: #555;
}

.v-button {
	color: white;
}

.error {
	color: #ff0062;
	margin-top: 10px;
	font-size: 0.8em;
	font-weight: bold;
}
</style>
