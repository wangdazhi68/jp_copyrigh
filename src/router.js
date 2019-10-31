import Vue from 'vue'
import Router from 'vue-router'
import index from './views/layout/index.vue'

Vue.use(Router)
    //解决警示报错，不影响页面使用
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/page/index',
        },
        {
            name: 'lgindex',
            path: '/page/index',
            meta: {
                name: '时间戳',
            },
            component: () =>
                import ('./views/page/index.vue')
        },
        {
            path: '/layout/index',
            name: 'index',
            meta: {
                requiresAuth: true,
            },
            redirect: '/page/applytime',
            component: index,
            children: [{
                    path: '/page/applytime',
                    name: 'applytime',
                    meta: {
                        name: '申请时间戳',
                        requiresAuth: true,
                    },
                    component: () =>
                        import ('./views/page/applytime.vue')
                },
                {
                    path: '/page/applysuccess',
                    name: 'applysuccess',
                    meta: {
                        name: '申请时间戳',
                        requiresAuth: true,
                    },
                    component: () =>
                        import ('./views/page/applysuccess.vue')
                },
                {
                    path: '/page/workslist',
                    name: 'workslist',
                    meta: {
                        name: '作品列表',
                        requiresAuth: true,
                    },
                    component: () =>
                        import ('./views/page/workslist.vue')
                },
                {
                    path: '/page/worksdetail',
                    name: 'worksdetail',
                    meta: {
                        name: '作品详情',
                        requiresAuth: true,
                    },
                    component: () =>
                        import ('./views/page/worksdetail.vue')
                },
                {
                    path: '/page/verification',
                    name: 'verification',
                    meta: {
                        name: '验证时间戳',
                        requiresAuth: true,
                    },
                    component: () =>
                        import ('./views/page/verification.vue')
                },
                {
                    path: '/page/verificatresult',
                    name: 'verificatresult',
                    meta: {
                        name: '验证时间戳',
                        requiresAuth: true,
                    },
                    component: () =>
                        import ('./views/page/verificatresult.vue')
                },
                {
                    path: '/page/userinfo',
                    name: 'userinfo',
                    meta: {
                        name: '验证时间戳',
                        requiresAuth: true,
                    },
                    component: () =>
                        import ('./views/page/userinfo.vue')
                },
            ]
        }
    ]
})