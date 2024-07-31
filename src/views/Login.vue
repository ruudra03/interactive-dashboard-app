<template>
	<main class="login">
		<v-container>
			<v-row>
				<v-spacer></v-spacer>
				<v-col>
					<v-card min-width="500">
						<form @submit.prevent="login">
							<v-container fill-height>
								<v-row>
									<v-col cols="12">
										<h1>Login</h1>
									</v-col>
									<v-col>
										<div class="error" v-if="isInvalid">
											{{ invalidMsg }}
										</div>
										<div class="error" v-else-if="isError">
											<p>
												Currently unable to get users.
												Try again later.
											</p>
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
				<v-spacer></v-spacer>
			</v-row>
		</v-container>
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

const isInvalid = computed(() => {
	return apiStore.state.isInvalidInputs
})

const invalidMsg = computed(() => {
	return apiStore.state.isInvalidMsg
})

const isError = computed(() => {
	return apiStore.state.isFailed
})

const login = async () => {
	const result = await apiStore.dispatch('loginUser', { username: username, password: password })

	if (result) {
		router.replace({ path: '/' })
	} else {
		password.value = ''
	}
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
	color: var(--error);
	margin-top: 10px;
	font-size: 0.8em;
	font-weight: bold;
}
</style>
