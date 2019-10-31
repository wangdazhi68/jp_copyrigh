import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import request from './request'
import './assets/css/common.css'
import './plugins/element.js'
import Clipboard from 'clipboard';
import ElementUI from 'element-ui';


Vue.prototype.Clipboard = Clipboard;
Vue.prototype.$request = request;
Vue.prototype.$http = process.env.VUE_APP_BASEURL;
Vue.prototype.$baseURL = process.env.VUE_APP_APIURL + '/' //'http://192.168.50.144:8080/'
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$setlocalStorage = function set(key, value) {
    var curTime = new Date().getTime();
    window.localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
}
Vue.prototype.$getlocalStorage = function get(key, exp = 86400000) {
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if (dataObj) {
        if (new Date().getTime() - dataObj.time > exp) {
            console.log('信息已过期');
            store.commit('setuserinfo', '')
            localStorage.removeItem('userinfo')
            router.replace({ name: "login" })
        } else {
            var dataObjDatatoJson = dataObj.data;
            return dataObjDatatoJson;
        }
    } else {
        return null
    }

}


router.beforeEach((to, from, next) => {
    if (to.meta.name) {
        document.title = to.meta.name
    }
    if (to.matched.length === 0) {
        //如果未匹配到路由
        from.name ? next({ name: from.name }) : next('/');
        //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    }
    //带token开发
    if (to.meta.requiresAuth) {
        if (!Vue.prototype.$getlocalStorage('userinfo')) {
            if (to.fullPath == "/page/index") {
                next()
            } else {
                next({
                    path: '/page/index',
                    query: { redirect: to.fullPath }
                })
            }

        }
    }
    next()
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')