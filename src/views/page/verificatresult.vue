<template>
    <div>
        <div class="h3-title">验证时间戳</div>
        <div class="result">
            <div class="ico-wrap">
                <dl>
                    <dt>
                        <img src="@/assets/images/yan-icon.png" alt />
                    </dt>
                    <dd>
                        <p>このファイルは検証されました。</p>
                        <p>当該証憑は申請時間スタンプから、内容が完全に維持され、変更されていない。</p>
                    </dd>
                </dl>
            </div>
            <div class="table">
                <ul>
                    <li>
                        <dl>
                            <dt>申请人：</dt>
                            <dd>小可爱</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>申请人证件号：</dt>
                            <dd>273627363773***234</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>文件/证据名称：</dt>
                            <dd>小可爱</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>可信时间戳认证时间：</dt>
                            <dd>2019-10-11 12:11:10(UTC+8:00)</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>时间戳认证码（数字指纹）：</dt>
                            <dd>AFFSDSDFHDGHUIWGGBNDSDS</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>时间戳颁发机构（TSA）：</dt>
                            <dd>联合信任时间戳服务中心</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class="result">
            <div class="ico-wrap">
                <dl class="dl2">
                    <dt>
                        <img src="@/assets/images/error-icon.png" alt />
                    </dt>
                    <dd>
                        <p>このファイルは検証されていません。本当のリスクがあります。</p>
                        <p>エラーメッセージ：元のファイルはタイムスタンプファイルと一致していません。</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="goback">
            <span>戻る</span>
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
    height: 32px;
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
.goback{
    text-align: center;
    padding-top:70px;
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