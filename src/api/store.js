import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state: {
        data: [],
        activeUser: [],
        isLoading: false,
        isError: false,
        isUserLoggedIn: false,
        isInvalid: false,
        invalidMsg: '',
        isFailed: false
    },
    mutations: {
        setData(state, data) {
            state.data = data
            state.isLoading = false
        },
        setIsError(state, isError) {
            state.isError = isError
            state.isLoading = false
        },
        startLoading(state) {
            state.isLoading = true
        },
        setActiveUser(state, user) {
            state.activeUser = user
        },
        userIsInvalid(state, { isInvalid, msg }) {
            state.isInvalid = isInvalid
            state.invalidMsg = msg
        },
        setIsFailed(state, isFailed) {
            state.isFailed = isFailed
        },
        userHasLoggedIn(state, { username, role }) {
            state.isUserLoggedIn = true
            localStorage.setItem('userLoggedIn', true)
            localStorage.setItem('username', username)
            localStorage.setItem('role', role)
        },
        userHasLoggedOut(state) {
            state.activeUser = []
            state.isUserLoggedIn = false
            localStorage.removeItem('userLoggedIn')
            localStorage.removeItem('username')
            localStorage.removeItem('role')
        }
    },
    actions: {
        async fetchData({ commit }) {
            try {
                commit('startLoading')
                console.log('fetching data from the server...')
                const result = await axios.get('http://localhost:3000/data')
                commit('setData', result.data)
                console.log('data fetched.')
            } catch (err) {
                commit('setIsError', true)
                console.log('unable to fetch data.')
            }
        },
        async loginUser({ commit }, { username, password }) {
            try {

                const result = await axios.get('http://localhost:3000/users?username=' + username.value)

                if (!result.data.length) {
                    commit('userIsInvalid', { isInvalid: true, msg: 'User not found!' })
                } else {
                    const resultUser = result.data[0]

                    if (resultUser.password !== password.value) {
                        commit('userIsInvalid', { isInvalid: true, msg: 'Incorrect password!' })
                    } else {
                        commit('setActiveUser', [resultUser.username, resultUser.role])
                        commit('userIsInvalid', { isInvalid: false, msg: '' })
                        commit('userHasLoggedIn', { username: resultUser.username, role: resultUser.role })
                        console.log(resultUser.username + ' has logged in.')
                    }
                }
            } catch (err) {
                commit('setIsFailed', true)
                console.log(err)
            }
        },
        logoutUser({ commit }) {
            commit('userHasLoggedOut')
            console.log('logged out.')
        },
        getStoredUser({ commit }) {
            if (localStorage.getItem('userLoggedIn')) {
                const username = localStorage.getItem('username')
                const role = localStorage.getItem('role')

                commit('setActiveUser', [username, role])
            }
        }
    },
    strict: true // REMARK: strict mode is true only for 'development' and NOT 'production'
})

export default store