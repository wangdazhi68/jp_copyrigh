<template>
    <div>
        <div class="h3-title">タイムスタンプを認証する</div>
        <div class="form">
            <dl>
                <!-- 选择需要验证的文件 -->
                <dt>認証対象資料：</dt>
                <dd>
                    <input type="file" ref="fileone" name="" class="upfile" @change="addone"
                    @drop="drop($event)"
                    @dragover="allowDrop($event)"
                    >
                    <input class="lookipt" type="text" disabled="" v-model="name1" placeholder="選択またはドラッグ">
                    <span class="choosebtn" @click="$refs.fileone.click()">選択</span>
                </dd>
            </dl>
            <dl>
                <!-- 选择时间戳证书 -->
                <dt>タイムスタンプトークン(.tsa)：</dt>
                <dd>
                    <input type="file" ref="filetwo" name="" class="upfile" @change="addtwo"
                    @drop="droptwo($event)"
                    @dragover="allowDroptwo($event)"
                    >
                    <input class="lookipt" type="text" disabled="" v-model="name2" placeholder="選択またはドラッグ">
                    <span class="choosebtn" @click="$refs.filetwo.click()">選択</span>
                </dd>
            </dl>
            <dl>
                <dt>&nbsp;</dt>
                <dd>
                    <p class="btn"><span @click="check">認証する</span></p>
                    <!-- <p class="link"><b>タイムスタンプ証明書をダウンロード</b></p> -->
                </dd>
            </dl>
        </div>
        <div class="section">
            <h4>注意事項</h4>
            <div class="prompt">
                <p><b>1.</b>対象資料を厳重に保管し、データの内容に対して如何なる修正もしないでください。データを操作する場合は、あらかじめバックアップを行うことをお勧めいたします。</p>
                <p><b>2.</b>タイムスタンプトークン（*.tsa）は「中華人民共和国電子署名法」に規定する要件を満たしている電子的証拠です。</p>
                <p><b>3.</b>タイムスタンプ認証証書（*.pdf）はタイムスタンプの申請時の詳細情報を示すためのファイルです。</p>        
            </div>
        </div>
        <div class="zhe" v-if="zhe">
            <div class="progress">
                <el-progress type="circle" :percentage="percentage"  ></el-progress>
            </div>
        </div>
    </div>
</template>

<script>
import { Loading } from "element-ui";
import CryptoJS from "crypto-js";
import { arrayBufferToWordArray, swapendian32 } from "@/assets/js/buffer";
var pos=0;
var end;
var chunkSize =204800; //409600;//204800;
var lastprogress = 0;
var sha256=CryptoJS.algo.SHA256.create();
var sha1=CryptoJS.algo.SHA1.create();
export default {
    data() {
        return {
            fileName:{},
            tsa:{},
            name1:'',
            name2:'',
            formData: new FormData(),
            zhe:false,
            sha1:'',
            sha256:'',
            zhe:false,
            percentage:0,
        };
    },

    components: {},

    computed: {},

    created() {
        // this.$alert('モジュール機能はまだ開発されていません。しばらくお待ちください', 'フレンドリーリマインダー', {
        //   confirmButtonText: 'わかった'
        // });
    },

    mounted() {},

    methods: {
        addone(){
            let inputDOM = this.$refs.fileone;
            this.fileName=inputDOM.files;
            let size = Math.floor(this.fileName[0].size);
            let name = inputDOM.files[0].name;
            let index = name.lastIndexOf('.');
            let Format=name.substring(index)
            let arry_format=['.zip','.rar','.tar','.gz','.7z','.cab','.lzh']
            if(!(arry_format.indexOf(Format)=='-1')){
                this.$message.error(".zip、.rar、.tar.gz、.7z、.cab、.lzhなど圧縮形式を用いたデータは対象外です。");
                this.$refs.fileone.value=''
                this.fileName={};
                this.$refs.fileone.value=null;
                return false;
            }
            if(size > 4000 * 1024 * 1000){  
                this.$message.error("資料のサイズは４ＧＢ以内を推奨しています。");
                this.$refs.fileone.value=''
                this.fileName={};
                this.$refs.fileone.value=null;
                return false;
            }
            this.name1 = inputDOM.files[0].name;
            this.zhe=true;
            pos=0;
            end;
            chunkSize =204800; //409600;//204800;
            lastprogress = 0;
            sha256=CryptoJS.algo.SHA256.create();
            sha1=CryptoJS.algo.SHA1.create();
            this.progressiveRead(this.fileName[0]);
        },
        drop(e) {
            let that = this;
            e.preventDefault();
            let dt = e.dataTransfer;
            let files = dt.files;
            let size = Math.floor(files[0].size);
            let name = files[0].name;
            let index = name.lastIndexOf('.');
            let Format=name.substring(index)
            let arry_format=['.zip','.rar','.tar','.gz','.7z','.cab','.lzh']
            if(!(arry_format.indexOf(Format)=='-1')){
                this.$message.error(".zip、.rar、.tar.gz、.7z、.cab、.lzhなど圧縮形式を用いたデータは対象外です。");
                this.fileName={};
                return false;
            }
            if(size > 4000 * 1024 * 1000){
                this.$message.error("資料のサイズは４ＧＢ以内を推奨しています。");
                that.fileName={};
                return false;
            }

            this.fileName = files;
            this.name1 =files[0].name;
            this.zhe=true;
            pos=0;
            end;
            chunkSize =204800; //409600;//204800;
            lastprogress = 0;
            sha256=CryptoJS.algo.SHA256.create();
            sha1=CryptoJS.algo.SHA1.create();
            this.progressiveRead(files[0]);
        },
        allowDrop(e) {
            e.preventDefault();
        },
        progressiveReadNext(file, reader) {
            var that = this;
            end = Math.min(pos + chunkSize, file.size);
            if (file.slice) {
                var blob = file.slice(pos, end);
            } else if (file.webkitSlice) {
                var blob = file.webkitSlice(pos, end);
            }
            reader.readAsArrayBuffer(blob);
            reader.onload = function(e) {
                pos = end;
                var wordArray = arrayBufferToWordArray(e.target.result);
                sha256.update(wordArray);
                sha1.update(wordArray);
                var progress = Math.floor((pos / file.size) * 100);
                if (progress > lastprogress) {
                    //console.log(progress)
                    that.percentage = progress;
                    lastprogress = progress;
                }
                if (pos < file.size) {
                    setTimeout(that.progressiveReadNext(file, reader), 0);
                } else {
                    that.sha1=sha1.finalize().toString().toUpperCase();
                    that.sha256=sha256.finalize().toString().toUpperCase();
                    console.log(that.sha1)
                    setTimeout(function(){
                        that.zhe=false;
                        that.percentage=0;
                    },1000)
                }
            };
            
        },
        progressiveRead(file) {
            // 20KiB at a time
            pos=0;
            chunkSize =204800; //409600;//204800;
            lastprogress = 0;
            let reader= new FileReader();
            setTimeout(this.progressiveReadNext(file, reader), 0);
        },
        addtwo(){
            let inputDOM = this.$refs.filetwo;
            this.tsa=inputDOM.files;
            let fname = inputDOM.files[0].name;
            let spl = fname.split(".");
            let suffix=spl[spl.length-1];
            if(suffix!='tsa'){
               this.$message.error("拡張子が.tsaのファイルを選択してください");
               this.$refs.filetwo.value=null;
                return false; 
            }
            let size = Math.floor(this.tsa[0].size);
            if(size > 10 * 1024 * 1000){
                this.$message.error("資料のサイズが10MBを超えています");
                this.tsa={};
                this.$refs.filetwo.value=null;
                return false;
            }
            this.name2 = inputDOM.files[0].name;
        },
        droptwo(e) {
            let that = this;
            e.preventDefault();
            let dt = e.dataTransfer;
            let files = dt.files;
            that.tsa = files;
            let fname = files[0].name;
            let spl = fname.split(".");
            let suffix=spl[spl.length-1];
            if(suffix!='tsa'){
               this.$message.error("拡張子が.tsaのファイルを選択してください");
                return false; 
            }
            let size = Math.floor(this.tsa[0].size);
            if(size > 10 * 1024 * 1000){
                this.$message.error("資料のサイズが10MBを超えています");
                this.tsa={};
                return false;
            }
            this.name2 = files[0].name;
        },
        allowDroptwo(e) {
            e.preventDefault();
        },
        check(){
            this.formData = new FormData();
            //console.log(this.fileName)
            if(!this.fileName[0]){
               this.$message.error('認証する資料を選択してください');
               return false;
            }
            if(!this.tsa[0]){
                this.$message.error('タイムスタンプトークン(.tsa)を選択してください');
                return false;
            }
            // let size1 = Math.floor(this.fileName[0].size);
            // if(size1 > 10 * 1024 * 1024){
            //     this.$message.error("資料のサイズが10MBを超えています");
            //     return false;
            // }
            let that=this;
            this.formData.append('originalFileName', this.fileName[0].name);
            this.formData.append('tsa', this.tsa[0]);
            this.formData.append("hashCode", this.sha1);
            this.formData.append("hashCode256", this.sha256);
            let loadingInstance = Loading.service();
            that.$request({
                method:'post',
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                data:this.formData,
                url:'/personal/timestampVerify',
            }).then((res) => {
                that.$nextTick(() => {
                        loadingInstance.close();
                    });
                console.log(res);
                that.$router.push({
                    name:"verificatresult",
                    params:res
                })
            }).catch((err) => {
                console.log(err);
                that.$nextTick(() => {
                        loadingInstance.close();
                    });
                this.$message.error(err);
            })
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
.form{
    padding-top: 66px;
}
.form dl{
	overflow: hidden;
	color:#7499f5;
	margin-bottom: 18px;
}
.form dt{
	float: left;
	line-height: 38px;
	width: 300px;
	font-size: 16px;
    text-align: right;
}
.form dd{
	float: left;
    position: relative;
}
.upfile{
	width:298px;
	height:38px;
    line-height: 38px;
	background:#fff;
	border: 1px solid #EBEBEB;
    position: absolute;
    opacity: 0;
    top:0;
    left:0;
    z-index: 2;
}
.lookipt{
	width:298px;
	height:38px;
    line-height: 38px;
	background:#fff;
	border: 1px solid #EBEBEB;
    box-sizing: border-box;
    padding: 0 20px;
    opacity: .7;
}
.form-upload{
	margin-top:70px;
}
.choosebtn{
	margin-left: 30px;
	line-height: 38px;
	height:38px;
	text-align: center;
	background:#fff;
	color:#7499F5;
	width: 90px;
	display: inline-block;
	font-size: 14px;
	cursor: pointer;
    border-radius: 4px;
    border:1px solid #6A91F0;
}
.choosebtn:hover{
    color:#fff;
    background:#6A91F0;
}
.btn span{
    width:291px;
    height:39px;
    line-height: 39px;
    background:rgba(106,145,240,1);
    border-radius:8px;
    color:#fff;
    font-size: 16px;
    display: block;
    text-align: center;
    cursor: pointer;
}
.btn span:hover{
    opacity: .8;
}
.btn{
    padding-top: 20px;
}
.link{
    color:#6A91F0;
    font-size: 16px;
    text-align: center;
    margin-top:21px;
    cursor: pointer;
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
.prompt{
    line-height: 30px;
    opacity: 0.6;
    font-size: 14px;
    padding:0 10px;
    padding-top:30px; 
}
.prompt p{
    padding-left:18px; 
    position: relative;
}
.prompt p b{
    position: absolute;
    left:0;
}
.zhe{
    background:rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
}
.zhe .progress{
    position: fixed;
    width:126px;
    height: 126px;
    top:0;
    bottom:0;
    left:0;
    right: 0;
    margin: auto;
    z-index: 999;
}
</style>
<style>
.el-progress__text{
    color:#fff;
    font-weight: bold;
}
</style>