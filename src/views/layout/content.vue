<template>
    <div class="wrap" ref="ContentHeight">
        <div class="content">
            <div v-if="day <= 30" class="deadline">
                残り {{day}} 日
            </div>
            <router-view></router-view>
        </div>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            contentHeight:0,
            userinfo:false,
            day:30
        };
    },

    components: {},

    computed: {},

    created() {
        this.uesrdetail();
    },

    mounted() {
        
    },

    methods: {
        uesrdetail(){
            var that=this;
            that.$request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/customer/detail',
            }).then((res) => {
                //console.log(res);
                if(res.data.code==0){
                    that.userinfo=res.data.data;
                    // that.$store.commit('setuserdetail',res.data.data);
                    let expireTime=this.userinfo.expireTime;
                    let index = expireTime.lastIndexOf('(');
                    expireTime=expireTime.substring(0,index)
                    let currentTime=this.userinfo.currentTime;
                    that.timeFn(currentTime,expireTime)
                }else{
                    this.$message.error(res.data.msg);
                    return false;
                }
            }).catch((err) => {
                console.log(err);
                this.$message.error(err);
            })
        },
        timeFn(d1,d2) {//di作为一个变量传进来
            //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
            var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
            var dateEnd = new Date(d2.replace(/-/g, "/"));
            var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
            var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000))//计算出小时数
            //计算相差分钟数
            var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
            //计算相差秒数
            var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000)
            // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
            // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
            //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
            if(dayDiff==0){
                this.day=1;
            }else{
                this.day=dayDiff;
            }
            
        }
    }
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
.deadline{
    padding: 0px 20px;
    background:rgba(255,253,242,.6);
    position: absolute;
    top:-35px;
    right: 0;
    border-radius: 8px;
    color:red;
    font-size: 14px;
}
</style>