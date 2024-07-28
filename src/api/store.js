import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state: {
        data: [],
        isLoading: true,
        isError: false
    },
    mutations: {
        setData(state, data) {
            state.data = data
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setIsError(state, isError) {
            state.isError = isError
        }
    },
    actions: {
        async fetchData({ commit }) {
            try {
                console.log('fetching data from the server...')
                const result = await axios.get('http://localhost:3000/data')
                commit('setData', result.data)
                console.log('data fetched.')
                commit('setIsLoading', false)
            } catch (err) {
                commit('setIsError', true)
                console.log(err)
            }
        }
    },
    strict: true // REMARK: strict mode is true only for 'development' and NOT 'production'
})

export default store