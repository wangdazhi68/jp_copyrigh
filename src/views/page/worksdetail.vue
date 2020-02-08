<template>
    <div>
        <div class="h3-title">資料リスト > 詳細情報</div>
        <div class="section">
            <h4>資料情報</h4>
            <!-- <div class="one">
                <dl>
                    <dt>申請者：</dt>
                    <dd>{{dataobj.realName}}</dd>
                </dl>
                <dl>
                    <dt>識別番号の種別：</dt>
                    <dd>{{identityType}}</dd>
                </dl>
                <dl>
                    <dt>識別番号：</dt>
                    <dd>{{dataobj.identityId}}</dd>
                </dl>
            </div> -->
            
            <div class="two">
                <dl>
                    <dt>申請者：</dt>
                    <dd>{{dataobj.realName}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>識別番号の種別：</dt>
                    <dd>{{identityType}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>識別番号：</dt>
                    <dd>{{dataobj.identityId}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>資料の名称：</dt>
                    <dd>{{dataobj.workName}}</dd>
                </dl>
            </div>
            <!-- <div class="one">
                <dl>
                    <dt>创作性质：</dt>
                    <dd>{{workNature}}</dd>
                </dl>
                <dl>
                    <dt>作品类型：</dt>
                    <dd>{{workType}}</dd>
                </dl>
                <dl>
                    <dt>作品创作类型：</dt>
                    <dd>{{creationType}}</dd>
                </dl>
            </div> -->
            <div class="two">
                <dl>
                    <dt>資料の説明：</dt>
                    <dd>{{dataobj.workSpec}}</dd>
                </dl>
            </div>
        </div>
        <div class="section">
            <h4>資料の権利情報</h4>
            <div class="two">
                <dl>
                    <dt>資料番号：</dt>
                    <dd>{{dataobj.workNo}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>hash値：</dt>
                    <dd>{{dataobj.hashCode}}</dd>
                </dl>
            </div>
            <div class="two">
                <dl>
                    <dt>申請日時：</dt>
                    <dd>{{dataobj.confirmTime}} (UTC+8:00)</dd>
                </dl>
            </div>
        </div>
        <div class="section">
            <h4>タイムスタンプ認証証書</h4>
            <div class="certificate">
                <div class="demo-image__preview">
                    <el-image 
                        style="width: 200px; height: 250px"
                        :src="url" 
                        >
                        <!-- :preview-src-list="srcList" -->
                    </el-image>
                </div>
                <span @click="download" class="download">認証証書をダウンロードする >></span>
                <span style="top:200px;" @click="downloadtsa" class="download">タイムスタンプトークンをダウンロードする >></span>
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
            srcList:[],
            workstype:[
                {
                    value:101,
                    label:'小说'
                },
                {
                    value:107,
                    label:'著作'
                },
                {
                    value:116,
                    label:'音乐'
                },
                {
                    value:121,
                    label:'方案'
                },
                {
                    value:127,
                    label:'美术'
                },
                {
                    value:135,
                    label:'工艺美术品设计'
                },
                {
                    value:140,
                    label:'建筑设计'
                },
                {
                    value:141,
                    label:'工程设计图'
                },
                {
                    value:142,
                    label:'产品设计图'
                },
                {
                    value:145,
                    label:'软件'
                },
                {
                    value:146,
                    label:'商业秘密'
                },
                {
                    value:147,
                    label:'摄影作品'
                },
                {
                    value:150,
                    label:'其他'
                }

            ],
            creationtype:[
                {
                    value:101,
                    text:'独立作品'
                },
                {
                    value:102,
                    text:'合作作品'
                },
                {
                    value:103,
                    text:'职务创作'
                },
                {
                    value:104,
                    text:'委托创作'
                }
            ],
            naturetype:[
                {
                    value:101,
                    text:'原创'
                },
                {
                    value:102,
                    text:'衍生作品' 
                }
            ],
        };
    },

    components: {},

    computed: {
        workNature(){
            for( let item of this.naturetype){
                if(parseInt(this.dataobj.workNature)==item.value){
                    return item.text
                }
            }
        },
        creationType(){
            for( let item of this.creationtype){
                if(parseInt(this.dataobj.creationType)==item.value){
                    return item.text
                }
            }
        },
        workType(){
            for( let item of this.workstype){
                if(parseInt(this.dataobj.workType)==item.value){
                    return item.label
                }
            }
        },
        identityType(){
             switch(this.dataobj.identityType){
                 case '101':
                    return '会社法人等番号'
                    break;
                case '102':
                    return '军官证'
                    break;
                case '103':
                    return '护照'
                    break;
                case '104':
                    return '士兵证'
                    break;
                case '111':
                    return '组织机构代码或统一社会信用代码'
                    break;
                case '999':
                    return 'その他'
                    break;
             }
        }
    },

    created() {
        //console.log(this.$route.params.id)
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
                //console.log(res);
                if (res.data.code == 0) {
                    this.dataobj=res.data.data
                }else if(res.data.code == -2){
                    return false;
                } else {
                    that.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                that.$message.error(err);
                console.log(err);
            });
        },
        download(){
            window.open(this.$baseURL+"personal/download?id="+this.id,'_blank');
        },
        downloadtsa(){
            window.open(this.$baseURL+"/personal/downloadtsa?id="+this.id,'_blank');
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
    width:115px;
}
.one dd{
    height:30px;
}
.two dt{
    width:120px;
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
    top:150px;
    right:0;
    color:#7499F5;
    font-size: 16px;
    cursor: pointer;
}
</style>