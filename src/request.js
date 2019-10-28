import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from './store'
import router from './router';
// 创建axios实例
const service = axios.create({
        //baseURL: 'http://47.92.138.255:8081/guns-rest/',
        baseURL: 'http://192.168.50.144:8080',
        timeout: 10000, // 请求超时时间
        //data:data,
        // transformRequest: [function (data) {
        //     return qs.stringify(data);
        // }],
        headers: {
            //'token': '',
            //'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            'content-type': "application/json;charset=UTF-8"
        }

    })
    // request拦截器
service.interceptors.request.use(
    config => {
        let localdata = Vue.prototype.$getlocalStorage('userinfo')
        if (config.url == "/register/sendValidateCode") {
            console.log('不需要加token')
        } else {
            if (localdata) {
                config.headers.token = localdata.sessionId;
            }
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            if (response.data.code == -2) {
                store.commit('setuserinfo', '')
                localStorage.removeItem('userinfo')
                router.replace({
                    path: '/page/index',
                    query: { redirect: router.currentRoute.fullPath }
                })
            }
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default service