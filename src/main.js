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
Vue.prototype.$http = 'http://192.168.50.194:8080/';
Vue.prototype.$baseURL = 'http://192.168.50.144:8080/'
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



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')