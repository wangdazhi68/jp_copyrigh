<template>
    <div>
        <div class="h3-title">資料リスト</div>
        <div class="filter">
            <div class="block">
                <span class="demonstration">申請日：</span>
                <el-date-picker
                    style="width:150px;"
                    v-model="startTime"
                    @change="dateStart"
                    type="date"
                    placeholder="日付を選択"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span class="fenge"></span>
                <el-date-picker
                    style="width:150px;"
                    v-model="endTime"
                    @change="dateEnd"
                    type="date"
                    placeholder="日付を選択"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span class="demonstration" style="margin-left:40px;">資料の名称：</span>
                <el-input style="width:150px;" v-model="worksname" placeholder="資料の名称"></el-input>
                <el-button type="primary" style="margin-left:50px;" @click="selectfifter()">照会</el-button>
            </div>
        </div>
        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="workNo" label="資料番号" width="150"></el-table-column>
                <el-table-column prop="workName" :show-overflow-tooltip="true" label="資料の名称" width="180"></el-table-column>
                <!-- <el-table-column prop="workType" :formatter="formatRole" label="作品の種類" width="130"></el-table-column> -->
                <el-table-column prop="workSpec" :show-overflow-tooltip="true" label="作品の説明" width="280"></el-table-column>
                <el-table-column prop="confirmTime" label="申請日時" width="180"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" content="証書をダウンロード" placement="bottom" popper-class="mytitle">
                            <el-button class="myicon"  type="text"  @click="download(scope.row)" size="medium"><i class="el-icon-download"></i></el-button>
                        </el-tooltip>
                        <b class="sline">|</b>
                        <el-tooltip class="item" effect="light" content="詳細" placement="bottom" popper-class="mytitle">
                            <el-button class="myicon" type="text" size="medium" @click="lookdetail(scope.row)"><i class="el-icon-more"></i></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                @current-change="clickpage"
                :current-page="currentPage"
                :total="totalCount"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
            >
            </el-pagination>
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
            startTime: null,
            endTime: null,
            worksname: null,
            tableData: [],
            requestdata:{
                page: 1,
                rows: 10
            },
            
            
        };
    },

    components: {},

    computed: {
        
    },

    created() {
        this.creatrequest();
    },

    mounted() {
        
    },

    methods: {
        formatRole(row, column){
            switch(row.workType){
                case '101':
                    return '小说'
                    break;
                case '107':
                    return '著作'
                    break;
                case '116':
                    return '音乐'
                    break;
                case '121':
                    return '方案'
                    break;
                case '127':
                    return '美术'
                    break;
                case '135':
                    return '工艺美术品设计'
                    break;
                case '140':
                    return '建筑设计'
                    break;
                case '141':
                    return '工程设计图'
                    break;
                case '142':
                    return '产品设计图'
                    break;
                case '145':
                    return '软件'
                    break;
                case '146':
                    return '商业秘密'
                    break;
                case '147':
                    return '摄影作品'
                    break;
                case '150':
                    return '其他'
                    break;
            }
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
                delete this.requestdata.startTime;  
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
                workName:this.worksname,
                startTime:this.startTime,
                endTime:this.endTime,
            }
            if(!this.startTime){
                delete this.requestdata.startTime;
            }
            if(!this.endTime){
                delete this.requestdata.endTime;
            }
            if(!this.worksname){
                delete this.requestdata.workName;
            }
            this.creatrequest();
        },
        lookdetail(e){
            this.$router.push({
                name:"worksdetail",
                params:{
                    id:e.id
                }
            })
        },

        download(e){
            window.open(this.$baseURL+"personal/download?id="+e.id,'_blank');
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
.fenge {
    color: #dcdfe6;
    display: inline-block;
    height: 2px;
    width: 14px;
    margin: 0 5px;
    background: #dcdfe6;
}
.filter {
    padding: 20px 0;
    border-bottom: 1px solid #7499f5;
    opacity: 0.8;
}
.myicon{
    font-size: 20px;
}
.sline{
    margin:0 10px;
    display: inline-block;
    vertical-align: 4px;
}
.page{
    margin-top:30px;
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
