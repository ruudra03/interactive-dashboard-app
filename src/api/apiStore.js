import axios from "axios"
import { createStore } from "vuex"
import { decrypt } from '../cryptoJS/crypto'

const apiStore = createStore({
    state: {
        // data
        isLoading: false,
        data: [],
        isError: false,
        // users
        isUserLoggedIn: false,
        activeUser: [],
        isInvalidInputs: false,
        isInvalidMsg: '',
        isFailed: false
    },
    mutations: {
        startLoading(state) {
            state.isLoading = true
            state.isError = false
        },
        finishLoading(state) {
            state.isLoading = false
        },
        storeData(state, data) {
            state.data = data
        },
        gotError(state) {
            state.isError = true
        },
        initialiseLogin(state) {
            state.isInvalidInputs = false
            state.isInvalidMsg = ''
            state.isFailed = false
        },
        userNotFound(state) {
            state.isInvalidInputs = true
            state.isInvalidMsg = 'User not found.'
        },
        incorrectPwd(state) {
            state.isInvalidInputs = true
            state.isInvalidMsg = 'Incorrect password.'
        },
        loginUser(state, user) {
            state.isUserLoggedIn = true
            state.activeUser = user
        },
        userHasLoggedIn(state, user) {
            state.isInvalidInputs = false
            state.isInvalidMsg = ''

            // store user login locally
            localStorage.setItem('isUserLoggedIn', true)
            localStorage.setItem('username', user[0])
            localStorage.setItem('role', user[1])
        },
        failedToGetUsers(state) {
            state.isFailed = true
        },
        logoutUser(state) {
            state.isUserLoggedIn = false
            state.activeUser = []
            localStorage.removeItem('isUserLoggedIn')
            localStorage.removeItem('username')
            localStorage.removeItem('role')
        }

    },
    actions: {
        async fetchData({ commit }) {
            try {
                commit('startLoading')
                console.log('fetching data...')

                const result = await axios.get('http://localhost:3000/data')
                    .then((res) => { return res.data })

                commit('storeData', result)
                commit('finishLoading')

                console.log('data stored.')
            } catch (err) {
                commit('finishLoading')
                commit('gotError')
                console.log('failed.')
            }
        },
        async loginUser({ commit }, { username, password }) {
            try {
                commit('initialiseLogin')
                console.log('logging in...')
                const result = await axios.get('http://localhost:3000/users?username=' + username.value)
                    .then((res) => res.data)

                if (result.length) {
                    const matchedUser = result[0]

                    if (decrypt(matchedUser.password) === password.value) {
                        commit('loginUser', [matchedUser.username, matchedUser.role])
                        commit('userHasLoggedIn', [matchedUser.username, matchedUser.role])
                        console.log("\'" + matchedUser.username + '\' has logged in.')
                        return true
                    } else {
                        commit('incorrectPwd')
                        console.log('incorrect password.')
                    }
                } else {
                    commit('userNotFound')
                    console.log('user not found.')
                }
                return false
            } catch (err) {
                commit('failedToGetUsers')
                console.log('failed.')
                console.log(err)
                return false
            }
        },
        loadStoredUser({ commit }) {
            const username = localStorage.getItem('username')
            const role = localStorage.getItem('role')

            if (username && role) {
                commit('loginUser', [username, role])

                console.log('user \'' + username + '\' loaded.')
            } else {
                localStorage.removeItem('isUserLoggedIn')
            }
        },
        logoutUser({ commit }) {
            commit('logoutUser')
            console.log('user logged out.')
        }
    },
    strict: true
})

export default apiStore