import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: {},
        userdetail: null
    },
    mutations: {
        setuserinfo(state, userinfo) {
            state.userinfo = userinfo
        },
        setuserdetail(state, userdetail) {
            state.userdetail = userdetail
        },

    },

    actions: {

    }
})