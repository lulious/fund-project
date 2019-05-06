// 类似methods
// 同步操作使用store.commit(method)更改状态
// 异步操作使用store.dispatch(actions)更改状态
export default {
    loaded(state) {
        state.loaded = true
    },
    setHomeData(state, options) {
        state.homeData = options
    },
    setSelectedDate(state, date) {
        state.selectedDate = date;
    },
    setDrawResult(state, award) {
        state.drawResult = award
    },
    hideDrawComponent(state) {
        state.drawComponentShow = false
    },
    refreshTickets(state, count) {
        state.tickets = count
    }
}