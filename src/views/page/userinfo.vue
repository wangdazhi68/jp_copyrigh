<template>
    <div>
        <div class="h3-title">账户查询</div>
        <div class="section">
            <h4>账号信息</h4>
            <div class="table">
                <ul>
                    <li>
                        <dl>
                            <dt>有効期間から停止時間</dt>
                            <dd>2019-10-15 11:30:11(UTC+08:00) 至 2020-10-15 11:30:11(UTC+08:00)</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>アカウント</dt>
                            <dd>sdbug@sina.com</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>アカウント名</dt>
                            <dd>某某某公司</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>証明書の種類</dt>
                            <dd>社会机构代码</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>証明書番号</dt>
                            <dd>88222**882</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>申請者</dt>
                            <dd>某某某</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>申込者メール</dt>
                            <dd>dfdw@ds.com</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class="section">
            <h4>账户信息</h4>
            <div class="account-num">
                <ul>
                    <li>
                        <p class="font">信頼されたタイムスタンプの使用回数</p>
                        <p class="num">
                            <span>
                                <strong>35</strong>次
                            </span>
                        </p>
                    </li>
                    <li>
                        <p class="font">今月の信頼できるタイムスタンプの使用回数</p>
                        <p class="num">
                            <span>
                                <strong>12</strong>次
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="filter">
                <h5>请输入需查询使用情况的起始时间：</h5>
                <div class="block">
                    <el-date-picker
                        style="width:150px;"
                        v-model="startTime"
                        @change="dateStart"
                        type="date"
                        placeholder="開始時間"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <span class="fenge"></span>
                    <el-date-picker
                        style="width:150px;"
                        v-model="startTime"
                        @change="dateStart"
                        type="date"
                        placeholder="終了時間"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                    <el-button type="primary" style="margin-left:50px;">クエリー</el-button>
                </div>
            </div>
            <div class="table">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="番号付け" width="150"></el-table-column>
                    <el-table-column
                        prop="name"
                        :show-overflow-tooltip="true"
                        label="作品の概要"
                        width="300"
                    ></el-table-column>
                    <el-table-column prop="type" label="作品の種類" width="120"></el-table-column>
                    <el-table-column prop="time" label="申し込み時間" width=""></el-table-column>
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
</template>

<script>
export default {
    data() {
        return {
            pageSize: 10,
            currentPage: 1,
            totalCount: 10,
            startTime: "",
            endTime: "",
            tableData: [
                {
                    date: "4543114651",
                    name: "杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫",
                    type:"文字",
                    des:"hellow,骄傲十大科技拉升阶段拉萨v成本撒低级卡拉圣诞节是利空打击拉萨的接口卡死了的拉升阶段 ",
                    time:"2019-10-11 12:11:10(UTC+8:00)",    
                },
                {
                    date: "4543114651",
                    name: "杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫",
                    type:"文字",
                    des:"hellow,骄傲十大科技拉升阶段拉萨v成本撒低级卡拉圣诞节是利空打击拉萨的接口卡死了的拉升阶段 ",
                    time:"2019-10-11 12:11:10(UTC+8:00)",    
                },
                {
                    date: "4543114651",
                    name: "杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫",
                    type:"文字",
                    des:"hellow,骄傲十大科技拉升阶段拉萨v成本撒低级卡拉圣诞节是利空打击拉萨的接口卡死了的拉升阶段 ",
                    time:"2019-10-11 12:11:10(UTC+8:00)",    
                },
                {
                    date: "4543114651",
                    name: "杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫杜拉拉升职记沃尔夫",
                    type:"文字",
                    des:"hellow,骄傲十大科技拉升阶段拉萨v成本撒低级卡拉圣诞节是利空打击拉萨的接口卡死了的拉升阶段 ",
                    time:"2019-10-11 12:11:10(UTC+8:00)",    
                },
                
            ]
        };
    },

    components: {},

    computed: {},

    created() {},

    mounted() {},

    methods: {
        dateStart(e) {
            this.startTime = e;
        },
        dateEnd(e) {
            this.endTime = e;
        },
        clickpage(e) {
            
            if(!this.datestart){
                delete this.requestdata.startTime;  
            }
            if(!this.dateend){
                delete this.requestdata.endTime;
            }
        },
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