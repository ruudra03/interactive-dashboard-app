import axios from "axios"
import { createStore } from "vuex"

const apiStore = createStore({
    state: {
        // data
        isLoading: false,
        data: [],
        isError: false,
        // users
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
                commit('gotError')
                console.log('failed.')
            }
        }
    }
})

export default apiStore