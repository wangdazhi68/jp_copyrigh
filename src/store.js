import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: {},
        status: null
    },
    mutations: {
        setuserinfo(state, userinfo) {
            state.userinfo = userinfo
        },
        setstatus(state, status) {
            state.status = status
        },

    },

    actions: {

    }
})