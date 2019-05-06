/*
*1. 应用层级的状态应该集中到单个 store 对象中；
*2. 同步操作使用，提交 mutation 更改状态；
*3. 异步操作通过分发 action 更改状态。
*4. 参考：https://vuex.vuejs.org/zh/api/#vuex-store
**/
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
// 模块
import login from './modules/login'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        login
    },
    // data
    strict: true,
    state,
    // computed
    getters,
    // 同步/通过store.commit(methodName, {options})调用
    mutations,
    // 异步/通过store.dispatch('increment', {options})调用
    // actions,
})