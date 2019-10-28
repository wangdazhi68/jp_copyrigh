<template>
    <div>
        <div class="h3-title">タイムスタンプを認証する</div>
        <div class="form">
            <dl>
                <!-- 选择需要验证的文件 -->
                <dt>認証対象ファイル：</dt>
                <dd>
                    <input type="file" ref="fileone" name="" class="upfile" @change="addone">
                    <input class="lookipt" type="text" disabled="" v-model="name1" placeholder="認証するファイルを選択してください">
                    <span class="choosebtn" @click="$refs.fileone.click()">ファイルを選択する</span>
                </dd>
            </dl>
            <dl>
                <!-- 选择时间戳证书 -->
                <dt>認証証書（*.tsa）：</dt>
                <dd>
                    <input type="file" ref="filetwo" name="" class="upfile" @change="addtwo">
                    <input class="lookipt" type="text" disabled="" v-model="name2" placeholder="認証証書を選択してください">
                    <span class="choosebtn" @click="$refs.filetwo.click()">ファイルを選択する</span>
                </dd>
            </dl>
            <dl>
                <dt>&nbsp;</dt>
                <dd>
                    <p class="btn"><span>検証タイムスタンプ</span></p>
                    <p class="link"><b>タイムスタンプ証明書をダウンロード</b></p>
                </dd>
            </dl>
        </div>
        <div class="section">
            <h4>特别提示</h4>
            <div class="prompt">
                1、已经申请过时间截证书的原文件内容在申请时间戳后不能做任何修改，以保证文件的原始性。文件内容如果发生任何改变(如打开后保存)都无法通过可信时间戳验证。如需查看或修改请将原文件备份并在复制文件上进行。<br>
                2、时间戳证书是由联合信任时间截服务中心签发的具有法律效力的电子凭证，有效证明申请时间器的电子文件自申请时起，内容保持完整未被更改;符合《中华人民共和国电子签名法》所规定的数据电文原件形式的要求，是申请人保护自身权益的有效法律证据。<br>
                3、时间戳认证证书记载了原文件通过时间截验证后的详细内容，主要用于时间翻认证信息的展示。
                        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileName:{},
            tsa:{},
            name1:'',
            name2:''
        };
    },

    components: {},

    computed: {},

    created() {
        this.$alert('モジュール機能はまだ開発されていません。しばらくお待ちください', 'フレンドリーリマインダー', {
          confirmButtonText: 'わかった'
        //   callback: action => {
        //     this.$message({
        //       type: 'info',
        //       message: `action: ${ action }`
        //     });
        //   }
        });
    },

    mounted() {},

    methods: {
        addone(){
            let inputDOM = this.$refs.fileone;
            this.fileName=inputDOM.files;
            let size = Math.floor(this.fileName[0].size / 1024);
            if(size > 10 * 1024 * 1024){
                alert("10M以内のファイルを選択してください！");
                return false;
            }
            this.name1 = inputDOM.files[0].name;
        },
        addtwo(){
            let inputDOM = this.$refs.filetwo;
            this.tsa=inputDOM.files;
            let fname = inputDOM.files[0].name;
            let spl = fname.split(".");
            let suffix=spl[spl.length-1];
            if(suffix!='tsa'){
               alert("拡張子がtsaのファイルを選択してください！");
                return false; 
            }
            let size = Math.floor(this.tsa[0].size / 1024);
            if(size > 10 * 1024 * 1024){
                alert("10M以内のファイルを選択してください！");
                return false;
            }
            this.name2 = inputDOM.files[0].name;
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
}
.upfile{
	width:298px;
	height:38px;
    line-height: 38px;
	background:#fff;
	border: 1px solid #EBEBEB;
    display: none;
    position: absolute;

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
	width: 126px;
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
</style>