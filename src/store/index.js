import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage.js'
import router from '../router'

Vue.use(Vuex)

const state = {
    user: ls.getItem('user'),
    auth: ls.getItem('auth')
}

const mutations = {
    SET_USER (state, user) {   // 设置两个地方的user
        state.user = user   // state
        ls.setItem('user', user)    // localStorage
    },
    SET_AUTH(state, auth) {
        state.auth = auth
        ls.setItem('auth', auth)
    }
}

const actions = {
    login({ commit }, user) {
        if(user) commit('SET_USER', user)
        commit('SET_AUTH', true)
        router.push('/')
    },
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
})

export default store