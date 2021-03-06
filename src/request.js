import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from './store'
import router from './router';
// 创建axios实例
const service = axios.create({
    // VUE_APP_BASEURL='http://192.168.50.193:8080'
    // VUE_APP_APIURL='http://192.168.50.144:8080'
        //baseURL: 'http://192.168.50.144:8080',
        baseURL: process.env.VUE_APP_APIURL,
        timeout: 10000, // 请求超时时间
        //data:data,
        // transformRequest: [function (data) {
        //     return qs.stringify(data);
        // }],
        async: false,
        headers: {
            //'token': '',
            //'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            //"Content-Type": "multipart/form-data"
            'content-type': "application/json;charset=UTF-8"
        }

    })
    // request拦截器
service.interceptors.request.use(
    config => {
        let localdata = Vue.prototype.$getlocalStorage('userinfo')
        if (config.url == "/register/sendValidateCode") {
            //console.log('不需要加token')
        }else {
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
        //console.log(response);
        if (response.status == 200) {
            if (response.data.code == -2) {
                store.commit('setuserinfo', '')
                localStorage.removeItem('userinfo')
                if (router.currentRoute.fullPath !== '/page/login') {
                    router.replace({
                        path: '/page/login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                }

            }
            if (response.data.code == -3) {
                store.commit('setuserinfo', '')
                localStorage.removeItem('userinfo')
                if (router.currentRoute.fullPath !== '/page/login') {
                    router.replace({
                        path: '/page/login',
                    })
                }

            }
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default service