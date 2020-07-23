import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage.js'
import router from '../router'
import * as moreAction from './articles'
Vue.use(Vuex)

const state = {
    user: ls.getItem('user'),
    auth: ls.getItem('auth'),
    articles: ls.getItem('articles'),
}

const getters = {
    getArticlesById: (state) => (id) => {
        let articles = state.articles

        if(Array.isArray(articles)) {
            let article = articles.filter((item) => parseInt(item.articleId) === parseInt(id))
            console.log('article.length', !article)
            return article.length ? article[0] : null
        }
        return null
    }
}

const mutations = {
    SET_USER (state, user) {   // 设置两个地方的user
        state.user = user   // state
        ls.setItem('user', user)    // localStorage
    },
    SET_AUTH(state, auth) {
        state.auth = auth
        ls.setItem('auth', auth)
    },
    SET_ARTICLE(state, article) {
        state.articles = article    // localStorage是存储地方 与 state 是一个状态
        ls.setItem('articles', article)
    }
}

const actions = {
    login({ commit }, user) {
        if(user) commit('SET_USER', user)
        commit('SET_AUTH', true)
        router.push('/')
    },
    logout({commit}, user) {
        commit('SET_AUTH', false)
        router.push('/login')
    },
    updateUser({commit}, user) {
        console.log('updateUser111')
        const stateUser = state.user

        if(stateUser && typeof stateUser === 'object') {
            user = {...stateUser, ...user}
        }

        commit('SET_USER', user)
    },
    ...moreAction
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})

export default store