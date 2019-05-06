import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        // 用户信息
        user: {
            name: null,
            token: sessionStorage.token,
        },
    },
    mutations: {
        // 设置用户信息
        setUser(state, options) {
            sessionStorage.token = options.token
            state.user = Object.assign(state.user, options)
        },
        // 注销
        signOut(state, options = {token: null}) {
            sessionStorage.removeItem('token')
            state.user = Object.assign(state.user, options)
        },
    },
    actions: { 
    },
    getters: {
    },
}