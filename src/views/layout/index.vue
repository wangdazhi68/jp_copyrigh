<template>
    <div class="wrap">
        <Header />
        <div class="banner">
            <img src="@/assets/images/banner.png" alt="banner">
        </div>
        <div class="section">
            <Sidebar ref="sidebar"/>
            <Content ref="ContentHeight"/>
        </div>
    </div>
</template>

<script>
import Header from "@/views/layout/header.vue";
import Sidebar from "@/views/layout/sidebar.vue";
import Content from "@/views/layout/content.vue";
export default {
    data() {
        return {};
    },

    components: {
        Header,
        Sidebar,
        Content
    },

    computed: {},

    created() {

    },

    mounted() {
        
    },

    methods: {}
};
</script>
<style scoped>
.banner{
    background:#6A91F0;
    min-height: 368px;
    position: relative;
    min-width: 1200px;
}
.banner img{
    width: 100%;
    position: absolute;
    left: 0;
    bottom:0;
    z-index: 1;
    right:0;
    margin:0 auto;
}
.section{
    position: relative;
    z-index: 2;
    width: 1200px;
    margin:0 auto;
    margin-top:-320px;
}
</style>