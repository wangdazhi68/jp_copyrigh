<template>
    <div>
        <div class="h3-title">タイムスタンプを認証する</div>
        <div class="result" v-if="result">
            <div class="ico-wrap">
                <dl>
                    <dt>
                        <img src="@/assets/images/yan-icon.png" alt />
                    </dt>
                    <dd>
                        <p>認証は成功しました。</p>
                        <p>当該資料の内容はタイムスタンプを申請した日時より変更されておりません。</p>
                    </dd>
                </dl>
            </div>
            <div class="table">
                <ul>
                    <li>
                        <dl>
                            <dt>申請者：</dt>
                            <dd>{{resultdata.realName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>会社法人等番号：</dt>
                            <dd>{{resultdata.identityId}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>資料の名称：</dt>
                            <dd>{{resultdata.originalFileName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>タイムスタンプの申請日時：</dt>
                            <dd>{{resultdata.confirmTime}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>hash値：</dt>
                            <dd>{{resultdata.hashCode}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>タイムスタンプ発行機関（TSA）：</dt>
                            <dd>聯合信任技術服務中心（日本部）</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class="result" v-else>
            <div class="ico-wrap">
                <dl class="dl2">
                    <dt>
                        <img src="@/assets/images/error-icon.png" alt />
                    </dt>
                    <dd>
                        <p>認証に失敗しました.</p>
                        <p>当該資料の内容は変更されている可能性があります。</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="goback">
            <span @click="$router.go(-1)">戻る</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            resultdata:{},
            result:false
        };
    },

    components: {},

    computed: {},

    created() {
        var res=this.$route.params;
        console.log(res)
        if(JSON.stringify(res) == "{}"){
            this.$router.go(-1);
        }else{
            if(res.data.code==0){
                this.resultdata=res.data.data;
                this.result=true;
            }else{
                this.result=false;
            }
        }
        
    },

    mounted() {},

    methods: {}
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
.result {
    padding-top: 50px;
}
.ico-wrap dl {
    overflow: hidden;
    width: 590px;
    margin: 0 auto;
    color:#000;
}
.ico-wrap .dl2{
    width:610px;
}
.ico-wrap dt,
.ico-wrap dd {
    float: left;
}
.ico-wrap dd {
    margin-left: 23px;
}
.ico-wrap dd p {
    padding: 4px 0;
    font-size: 14px;
    opacity: 0.8;
}
.table{
    padding-top: 61px;
}
.table ul{
    width: 705px;
    margin:0 auto;
    border-top:1px solid #EFEFEF;;
    border-left: 1px solid #EFEFEF
}
.table ul li{
    border-bottom:1px solid #EFEFEF;
    border-right: 1px solid #EFEFEF;
    line-height: 32px;
}
.table dl{
    overflow: hidden;
}
.table dt,.table dd{
    float: left;
    color:#000;
    opacity: 0.8;
    font-size: 14px;
}
.table dt{
    text-align: right;
    width: 45%;
    margin-right: 5%;
}
.table dd{
    width:50%;
    word-break:break-all;
}
.goback{
    text-align: center;
    padding-top:70px;
    cursor: pointer;
}

.goback span{
    display:inline-block;
    width:72px;
    height:39px;
    background:rgba(106,145,240,1);
    border-radius:8px;
    color:#fff;
    text-align: center;
    line-height: 39px;
}
</style>