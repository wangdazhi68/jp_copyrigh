<template>
    <div>
        <div class="h3-title">作品列表 > 作品详情</div>
        <div class="section">
            <h4>作品信息</h4>
            <div class="one">
                <dl>
                    <dt>申请人：</dt>
                    <dd>{{dataobj.realName}}</dd>
                </dl>
                <dl>
                    <dt>证件类型：</dt>
                    <dd>{{dataobj.identityType}}</dd>
                </dl>
                <dl>
                    <dt>证件号：</dt>
                    <dd>{{dataobj.identityId}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>作品名称：</dt>
                    <dd>{{dataobj.workName}}</dd>
                </dl>
            </div>
            <div class="one">
                <dl>
                    <dt>创作性质：</dt>
                    <dd>{{dataobj.workNature}}</dd>
                </dl>
                <dl>
                    <dt>作品类型：</dt>
                    <dd>{{dataobj.workType}}</dd>
                </dl>
                <dl>
                    <dt>作品创作类型：</dt>
                    <dd>{{dataobj.creationType}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>作品说明：</dt>
                    <dd>{{dataobj.workSpec}}</dd>
                </dl>
            </div>
        </div>
        <div class="section">
            <h4>作品确权信息</h4>
            <div class="two">
                <dl>
                    <dt>作品编号：</dt>
                    <dd>{{dataobj.workNo}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>文件hash值：</dt>
                    <dd>{{dataobj.hashCode}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>申请确权时间：</dt>
                    <dd>{{dataobj.confirmTime}}</dd>
                </dl>
            </div>
        </div>
        <div class="section">
            <h4>可信时间戳认证证书</h4>
            <div class="certificate">
                <div class="demo-image__preview">
                    <el-image 
                        style="width: 200px; height: 250px"
                        :src="url" 
                        :preview-src-list="srcList">
                    </el-image>
                </div>
                <span @click="download" class="download">下载证书 >></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:'',
            dataobj:{},
            url:'',
            srcList:[]
        };
    },

    components: {},

    computed: {},

    created() {
        console.log(this.$route.params.id)
        if(this.$route.params.id){
            this.id=this.$route.params.id;
            this.url=this.$baseURL+"/personal/thumbnail?id="+this.id
            this.srcList=[this.$baseURL+"/personal/thumbnail?id="+this.id]
            this.creatrequest();
        }else{
            this.$router.go(-1);
        }
          
    },

    mounted() {},

    methods: {
       creatrequest() {
            let that = this;
            this.$request({
                method: "get",
                url: "personal/viewOne?id="+this.id
            })
            .then(res => {
                console.log(res);
                if (res.data.code == 0) {
                    this.dataobj=res.data.data
                } else {
                    that.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                that.$message.error("请求数据出错，请刷新重试");
                console.log(err);
            });
        },
        download(){
            window.open(this.$baseURL+"personal/download?id="+this.id,'_blank');
        }
    }
};
</script>
<style scoped>
.h3-title {
    width: 100%;
    border-bottom: 4px solid #7499f5;
    color: #7499f5;
    font-size: 18px;
    padding-bottom: 12px;
    opacity: 0.8;
}
.section{
    padding-top: 15px;
}
.section h4{
    box-sizing: border-box;
    padding:12px 10px;
    background:rgba(116,153,245,.1);
    font-size: 16px;
    color:#7499F5;
}
.one{
    overflow: hidden;
}
.section dl{
    overflow: hidden;
    padding:0 10px;
}
.section dt,.section dd{
    float: left;
    font-size: 14px;
    color:#000;
    line-height: 30px;
}
.section dt{
    opacity:0.6;
}
.section dd{
    opacity:0.8;
}
.one,.two{
    margin-top:15px;
}
.one dl{
    width:30%;
    float: left;
}
.one dt{
    width:105px;
}
.one dd{
    height:30px;
}
.two dt{
    width:105px;
}
.two dl{
    display: flex;
    flex-direction: row;
}
.two dd{
    flex: 1;
}
.certificate{
    text-align: center;
    position: relative;
    margin-top:30px;
}
.download{
    position: absolute;
    top:20px;
    right:25%;
    color:#7499F5;
    font-size: 16px;
    cursor: pointer;
}
</style>