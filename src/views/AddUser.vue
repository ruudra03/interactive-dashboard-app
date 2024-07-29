<template>
	<main class="add-user">
		<v-row justify="center">
			<v-col>
				<v-card>
					<form @submit.prevent="addUser">
						<v-container fill-height>
							<v-row>
								<v-col cols="12">
									<h1>Create new user</h1>
								</v-col>
								<v-col>
									<div class="error" v-if="isInvalid">
										{{ invalidMsg }}
									</div>
									<div class="error" v-else-if="isError">
										<p>
											Currently unable to add users. Try
											again later.
										</p>
									</div>
									<div class="success" v-if="isCreated">
										<p>New user added successfully.</p>
									</div>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<label>Choose Username:</label>
									<input
										type="text"
										required
										v-model="username"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<label>Create Password:</label>
									<input
										type="password"
										required
										v-model="password"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<label>Select Role:</label>
									<select v-model="role">
										<option value="user">User</option>
										<option value="admin">Admin</option>
									</select>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-btn
										class="v-button"
										color="var(--dark-alt)"
										type="submit"
									>
										Add User
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
import { ref } from "vue"
import axios from 'axios'
import { v4 as uuid } from 'uuid'

import { encrypt } from '../cryptoJS/crypto'

const username = ref('')
const password = ref('')
const role = ref('user')

const isInvalid = ref(false)
const invalidMsg = ref('')
const isError = ref(false)
const isCreated = ref(false)

const invalidateInputs = (msg) => {
	isInvalid.value = true
	invalidMsg.value = msg
}

const initialiseNewUser = () => {
	isInvalid.value = false
	invalidMsg.value = ''
	isError.value = false
	isCreated.value = false
}

const isDuplicate = async (username) => {
	const result = await axios.get('http://localhost:3000/users?username=' + username)
		.then((res) => res.data)
	if (result.length) {
		return true
	} else {
		return false
	}
}

const userIsCreated = () => {
	isError.value = false
	isCreated.value = true
	console.log('new user added')
	username.value = ''
	password.value = ''
	role.value = 'user'
}

const addUser = async () => {
	try {
		initialiseNewUser()
		if (username.value.length > 2) {
			if (password.value.length > 4) {
				const hasDuplicate = await isDuplicate(username.value)
				if (!hasDuplicate) {
					const encryptedPassword = encrypt(password.value)

					const newUser = {
						id: uuid(),
						username: username.value,
						password: encryptedPassword,
						role: role.value
					}

					const res = await axios.post('http://localhost:3000/users', newUser, {
						'Content-Type': 'application/json'
					})

					if (res.status === 201) {
						userIsCreated()
					} else {
						isError.value = true
					}
				} else {
					invalidateInputs('Username already exists.')
					username.value = ''
					password.value = ''
					role.value = 'user'
				}
			} else {
				invalidateInputs('Passwords must be at least 5 characters long.')
				password.value = ''
				role.value = 'user'
			}
		} else {
			invalidateInputs('Usernames must be at least 3 characters long.')
			username.value = ''
			role.value = 'user'
		}
	} catch (err) {
		isError.value = true
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

input,
select {
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

.success {
	color: var(--primary);
	margin-top: 10px;
	font-size: 0.8em;
	font-weight: bold;
}
</style>
