<template>
    <div class="wrap">
        <div class="content">
            <router-view></router-view>
        </div>  
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },

    components: {},

    computed: {},

    created() {},

    mounted() {},

    methods: {}
};
</script>
<style scoped>
.wrap{
    float:right;
    width:952px;
    background:#fff;
    box-shadow:0px 4px 10px 0px rgba(210,223,255,0.5);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 23px 26px;
    margin-bottom: 30px;
}

</style>