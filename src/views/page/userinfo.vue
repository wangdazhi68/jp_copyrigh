<template>
    <div class="layout">
        <div class="h3-title">アカウント照会</div>
        <div class="section">
            <h4>アカウント情報</h4>
            <div class="table">
                <ul>
                    <li>
                        <dl>
                            <dt>有効期間</dt>
                            <dd>{{userinfo.createTime}} 至 {{userinfo.expireTime}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>ユーザID</dt>
                            <dd>{{loginCode}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>アカウント名</dt>
                            <dd>{{userinfo.realName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>識別情報</dt>
                            <dd>{{identityType}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>会社法人等番号</dt>
                            <dd>{{userinfo.identityId}}</dd>
                        </dl>
                    </li>
                    <!-- <li>
                        <dl>
                            <dt>申請者</dt>
                            <dd>{{userinfo.contactName}}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>申請者連絡先アドレス</dt>
                            <dd>{{userinfo.contactEmail}}</dd>
                        </dl>
                    </li> -->
                </ul>
            </div>
        </div>
        <div class="section">
            <h4>アカウント情報</h4>
            <div class="account-num">
                <ul>
                    <li>
                        <p class="font">タイムスタンプ累積使用件数</p>
                        <p class="num">
                            <span>
                                <strong v-if="currentCount">{{currentCount}}</strong>
                                <strong v-else>{{userinfo.currentCount}}</strong>
                                次
                            </span>
                        </p>
                    </li>
                    <li>
                        <p class="font">タイムスタンプ当月使用件数</p>
                        <p class="num">
                            <span>
                                <strong>{{userinfo.monthCount}}</strong>次
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="filter">
                <h5>照会する期間を選択してください:</h5>
                <div class="block">
                    <el-date-picker
                        style="width:150px;"
                        v-model="startTime"
                        @change="dateStart"
                        type="date"
                        placeholder="起算日"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <span class="fenge"></span>
                    <el-date-picker
                        style="width:150px;"
                        v-model="endTime"
                        @change="dateEnd"
                        type="date"
                        placeholder="終結日"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <el-button @click="selectfifter()" type="primary" style="margin-left:50px;">照会</el-button>
                </div>
            </div>
            <div v-show="ishow">
                <div class="table">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="workNo" label="資料番号" width="150"></el-table-column>
                        <el-table-column
                            prop="workName"
                            :show-overflow-tooltip="true"
                            label="資料の名称"
                            width="400"
                        ></el-table-column>
                        <!-- <el-table-column prop="type" label="作品の種類" width="120"></el-table-column> -->
                        <el-table-column prop="confirmTime" label="申請日時" width=""></el-table-column>
                    </el-table>
                </div>
                <div class="page">
                    <el-pagination
                        @current-change="clickpage"
                        :current-page="currentPage"
                        :total="totalCount"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {identityType} from '@/assets/js/statetype'
export default {
    data() {
        return {
            pageSize: 10,
            currentPage: 1,
            totalCount: 10,
            startTime: null,
            endTime: null,
            tableData: [],
            userinfo:false,
            loginCode:'',
            requestdata:{
                page: 1,
                rows: 10
            },
            ishow:false,
            currentCount:null,
        };
    },

    components: {},

    computed: {
        identityType
    },

    created() {
        let localdata=this.$getlocalStorage('userinfo')
        if(localdata){
            this.loginCode=localdata.loginCode
        }
        if(this.$store.state.userdetail){
            this.userinfo=this.$store.state.userdetail;
        }else{
            this.uesrdetail();
        }
        
    },

    mounted() {},

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
                console.log(res);
                if(res.data.code==0){
                    that.userinfo=res.data.data;
                    that.$store.commit('setuserdetail',res.data.data);
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err) => {
                console.log(err);
                this.$message.error(err);
            })
        },
        creatrequest() {
            let that = this;
            this.$request({
                method: "post",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                data:that.requestdata,
                url: "/personal/viewAll"
            })
            .then(res => {
                console.log(res);
                if (res.data.code == 0) {
                    that.tableData = res.data.data,
                    that.totalCount = res.data.totalCount;
                } else {
                    that.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                that.$message.error(err);
                console.log(err);
            });
        },
        dateStart(e) {
            this.startTime = e;
        },
        dateEnd(e) {
            this.endTime = e;
        },
        clickpage(e) {
            this.requestdata={
                page: e,
                rows: this.pageSize,
                startTime:this.startTime,
                endTime:this.endTime,
            }
            if(!this.startTime){
                delete this.requestdata.startTime 
            }
            if(!this.endTime){
                delete this.requestdata.endTime;
            }
            this.creatrequest();
        },
        selectfifter(){
            
            this.requestdata={
                page: 1,
                rows: this.pageSize,
                startTime:this.startTime,
                endTime:this.endTime,
            }
            if(!this.startTime){
                delete this.requestdata.startTime;
            }
            if(!this.endTime){
                delete this.requestdata.endTime;
            }
            this.currentCount=null;
            if(this.startTime || this.endTime){
                this.totalnum();
            }
            this.creatrequest();
            this.ishow=true;
        },
        totalnum(){
            let that = this;
            this.$request({
                method: "post",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                data:{
                    startTime:this.startTime,
                    endTime:this.endTime
                },
                url: "/personal/getTotalCountByTimePeriod"
            })
            .then(res => {
                console.log(res);
                this.currentCount=res.data.totalCount
            })
            .catch(err => {
                that.$message.error(err);
                console.log(err);
            });
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
.section {
    padding-top: 15px;
}
.section h4 {
    box-sizing: border-box;
    padding: 12px 10px;
    background: rgba(116, 153, 245, 0.1);
    font-size: 16px;
    color: #7499f5;
}
.table {
    padding-top: 20px;
}
.table ul {
    width: 795px;
    margin: 0 auto;
    border-top: 1px solid #efefef;
    border-left: 1px solid #efefef;
}
.table ul li {
    border-bottom: 1px solid #efefef;
    border-right: 1px solid #efefef;
    line-height: 32px;
    height: 32px;
}
.table dl {
    overflow: hidden;
}
.table dt,
.table dd {
    float: left;
    color: #000;
    opacity: 0.8;
    font-size: 14px;
}
.table dt {
    text-align: center;
    width: 30%;
    margin-right: 5%;
    opacity: 0.6;
}
.account-num {
    padding-top: 21px;
}
.account-num ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.account-num ul li {
    border: 1px solid #6a91f0;
    border-radius: 8px;
    width: 306px;
    height: 92px;
    font-size: 14px;
    color: #7499f5;
    text-align: center;
}
.font {
    padding: 14px 0;
}
.num strong {
    font-size: 30px;
    font-weight: 600;
}
.fenge {
    color: #dcdfe6;
    display: inline-block;
    height: 2px;
    width: 14px;
    margin: 0 5px;
    background: #dcdfe6;
}
.filter{
    border-bottom: 1px solid #7499f5;
    opacity: 0.8; 
    padding-bottom: 25px;
}
.filter h5 {
    padding-top: 40px;
    padding-bottom: 29px;
    font-size: 16px;
    opacity: 0.6;
}
.page{
    padding-top: 30px;
    text-align: right;
}
</style>
<style>
.el-tooltip__popper {
    max-width: 20%;
}
.el-tooltip__popper,
.el-tooltip__popper.is-dark {
    background: #f5f5f5 !important;
    color: #303133 !important;
    box-shadow:0px 0px 4px 0px rgb(27, 26, 26,.2);
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow::after {
    border-top-color: #f0f0f0;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow {
    border-top-color: #f0f0f0;
}
.mytitle{
    color:#7499f5 !important;
}
</style>