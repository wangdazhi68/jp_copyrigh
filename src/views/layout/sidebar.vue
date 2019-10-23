<template>
    <div class="wrap">
        <div class="nav">
            <div class="nav-header">
                <img src="@/assets/images/nav-header.png" alt="">
            </div>
            <ul>
                <template v-for="(item, index) in nav" >
                <li v-if="item.child" @click="routerLink(index, item.path)" :key="index" :class="activeNav === item.path || activeNav=== item.child[0].path?'active':''">{{ item.title }}</li>

                <li v-else @click="routerLink(index, item.path)" :key="index" :class="activeNav === item.path?'active':''">{{ item.title }}</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nav:[
                {
                    title:"申请时间戳",
                    path:"/page/applytime",
                    child:[
                        {
                            title:"申请时间戳",
                            path:"/page/applysuccess" 
                        }
                    ]
                },
                {
                    title:"作品列表",
                    path:"/page/workslist",
                    child:[
                        {
                            title:"作品详情",
                            path:"/page/worksdetail" 
                        }
                    ]
                },
                {
                    title:"验证时间戳",
                    path:"/page/verification",
                    child:[
                        {
                            title:"验证时间戳",
                            path:"/page/verificatresult" 
                        }
                    ]
                },
                {
                    title:"查询账户",
                    path:"/page/userinfo"
                }
            ],
        };
    },

    components: {},

    computed: {
        activeNav () {
            return this.$route.path
        }
    },

    created() {},

    mounted() {},

    methods: {
        routerLink(index, path) {
            // 路由跳转
            this.$router.push(path)
        },
    },
    watch:{
        
    }
};
</script>
<style scoped>
.wrap,.nav{
    width:230px;
}
.wrap{
    float: left;
}
.nav-header{
    height:89px;
}
.nav ul{
    box-shadow:0px 4px 10px 0px rgba(210,223,255,0.5);
    border-radius:8px;
    min-height: 712px;
}
.nav li{
    width: 100%;
    height: 77px;
    line-height: 77px;
    text-align: center;
    background:#fff;
    cursor: pointer;
}
.nav li:hover{
    color:#7499F5;
}
.nav .active{
    background:#F1F5FE;
    color:#6A91F0;
}
</style>