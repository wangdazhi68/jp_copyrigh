<template>
    <div class="">
        <div class="h3-title">申请时间戳</div>
        <div class="form">
            <el-form
                :model="applyForm"
                :rules="applyrules"
                ref="applyForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="上传作品：" prop="fileName" label-width="130px">
                    <el-input style="display:none" type="hidden" v-model="applyForm.fileName"></el-input>
                    <div class="">
                        <div :class="uploadborder?'uploadwrap uploadborder':'uploadwrap'" v-if="!filename">
                            
                            <input
                                type="file"
                                class="uploadfile"
                                @change="addfile()"
                                ref="inputer" 
                            />
                            <div class="add">
                                <img src="@/assets/images/uploadbtn.png" alt />
                            </div>
                            <p>
                                点击或者拖拽上传作品
                            </p>
                        </div>
                        <div class="uploadwrap" v-else>
                            <div class="add">
                                <img src="@/assets/images/file-icon.png" alt />
                                <a class="close" title="删除" @click="delfile()">×</a>
                            </div>
                            <p>
                               {{filename}}
                            </p>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="申请人："  label-width="130px">
                    <el-input disabled v-model="applyPerson"></el-input>
                </el-form-item>
                <el-form-item label="证件类型：" label-width="130px">
                    <el-input disabled v-model="certificateType"></el-input>
                </el-form-item>
                <el-form-item label="证件号：" label-width="130px">
                    <el-input disabled v-model="certificateNo"></el-input>
                </el-form-item>
                <el-form-item label="作品名称：" prop="workName" label-width="130px">
                    <el-input type="textarea" v-model="applyForm.workName"></el-input>
                </el-form-item>
                <el-form-item label="创作性质：" prop="workNature" label-width="130px">
                    <el-radio-group v-model="applyForm.workNature">
                        <el-radio v-for="item in naturetype" :key="item.value" :label="item.value">{{item.text}}</el-radio>
                        
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="作品创作类型：" label-width="130px">
                    <el-radio-group v-model="applyForm.creationType">
                        <el-radio v-for="item in creationtype" :key="item.value" :label="item.value">{{item.text}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="作品类型：" label-width="130px">
                    <el-select v-model="applyForm.workType" placeholder="请选择作品类型">
                        <el-option v-for="item in workstype" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="作品说明：" prop="workSpec" label-width="130px">
                    <el-input class="mytext" type="textarea" v-model="applyForm.workSpec"></el-input>
                    <span class="looktem" @click="choosetemplate()">选择模板</span>    
                </el-form-item>
            
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="preview('applyForm')">立即提交</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog
            title="预览确权信息"
            :visible.sync="confirm"
            width="35%"
            top="10vh"
            :modal-append-to-body='false'
            >
            <dl class="dl">
                <dt>上传作品：</dt>
                <dd>{{filename}}</dd>
            </dl>
            <dl class="dl">
                <dt>申请人：</dt>
                <dd>{{applyPerson}}</dd>
            </dl>
            <dl class="dl">
                <dt>证件类型：</dt>
                <dd>{{certificateType}}</dd>
            </dl>
            <dl class="dl">
                <dt>证件号：</dt>
                <dd>{{certificateNo}}</dd>
            </dl>
            <dl class="dl">
                <dt>作品名称：</dt>
                <dd>{{applyForm.workName}}</dd>
            </dl>
            <dl class="dl">
                <dt>创作性质：</dt>
                <dd>{{workNature}}</dd>
            </dl>
            <dl class="dl">
                <dt>作品创作类型：</dt>
                <dd>{{creationType}}</dd>
            </dl>
            <dl class="dl">
                <dt>作品类型：</dt>
                <dd>{{workType}}</dd>
            </dl>
            <dl class="dl">
                <dt>作品说明：</dt>
                <dd>{{applyForm.workSpec}}</dd>
            </dl>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirm = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="作品说明模板"
            :visible.sync="template"
            width="60%"
            :modal-append-to-body='false'
            top="6vh"
            >
            <ul class="mobanul">
                <li :class="item.index-1==copycur?'active':''" v-for="item in mobanfont" :key="item.index" @click='choose(item.index)'>
                    <h3><span>{{item.blue}}</span>{{item.title}}</h3>
                    <p>{{item.cnt}}</p>
                </li>
                
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button class="copybtn" type="primary" @click="copy()" :data-clipboard-text="copycnt">复制选中内容</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
    data() {
        return {
            fil:{},
            uploadborder:false,
            filename:null,
            confirm:false,
            template:false,
            copycur:0,
            copycnt:'',
            applyPerson:'吴亦凡',
            certificateType:'身份证',
            certificateNo:'210654199001236547',
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
            mobanfont:[
                {
                    index:1,
                    blue:'通用作品',
                    title:'描述模板',
                    cnt:'本作品已申请TSA可信时间戳数字版权保护,版权均属于作者（权利人名称）所有，身份证号码（），未经本人授权,任何单位及个人不得转载、摘编或以其它方式使用本作品。',
                   
                },
                {
                    index:2,
                    blue:'文字作品',
                    title:'描述（小说、剧本等）模板',
                    cnt:'本作品（作品名称）由（权利人名称）独立创作完成，本作品（故事梗概）。声明：（权利人名称），身份证号码（）版权所有，未经授权不得翻印、改编、演出或作其他用途！'
                },
                {
                    index:3,
                    blue:'音乐作品',
                    title:'描述（歌词、歌曲）模板',
                    cnt:'歌曲名/歌词名》是（权利人名称）独自作曲/作词，原唱者（）。（权利人名称），身份证号码（）享有本词/曲版权，任何单位和个人，不得对本词/曲进行抄袭。未经本人授权，严禁用于任何商业用途，否则将追究非法使用本词/曲的法律及相关问题责任!'
                },
                {
                    index:4,
                    blue:'设计创意作品',
                    title:'描述模板',
                    cnt:'（作品名称）设计，设计者（权利人名称），独立完成，本作品为原模设计稿。本设计已申请TSA可信时间戳数字版权保护，权利人名称），身份证号码（）版权所有，未经过本人授权不得利用本设计，进行图形设计、动画制作、产品形象代言或利用其它方式使用本设计作品。'
                },
                {
                    index:5,
                    blue:'摄影作品',
                    title:'描述模板',
                    cnt:'本组摄影图片均系（权利人名称），身份证号码（）原创摄影作品，未经其本人许可，任何人不得用于商业或其他经济用途。如确需转载，请务必注明原作者姓名！否则，一切法律后果自负！'
                },
            ],
            applyForm: {
                fileName:'',
                workName: '',
                workNature: '',
                creationType: '',
                workType: '',
                workSpec: '',
            },
            applyrules: {
                fileName:[
                    { required: true, message: '请上传作品', trigger: 'change' }
                ],
                workName: [
                    { required: true, message: '请输入作品名称', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                workNature: [
                    { required: true, message: '请选择创作性质', trigger: 'change' }
                ],
                workSpec: [
                    { required: true, message: '请输入或选择作品说明', trigger: 'blur' },
                    { min: 3, max: 350, message: '长度在 3 到 350 个字符', trigger: 'blur' }
                ]
               
            },
            formData: new FormData(),
      };
    },

    components: {},

    computed: {
        workNature(){
            for( let item of this.naturetype){
                if(parseInt(this.applyForm.workNature)==item.value){
                    return item.text
                }
            }
        },
        creationType(){
            for( let item of this.creationtype){
                if(parseInt(this.applyForm.creationType)==item.value){
                    return item.text
                }
            }
        },
        workType(){
            for( let item of this.workstype){
                if(parseInt(this.applyForm.workType)==item.value){
                    return item.label
                }
            }
        }
    },

    created() {},

    mounted() {},

    methods: {
        addfile(){
            let inputDOM = this.$refs.inputer;
            this.fil=inputDOM.files
            let size = Math.floor(this.fil[0].size / 1024);
            if(size > 10 * 1024 * 1024){
                alert("请选择10M以内的图片！");
                return false;
            }
            this.filename = inputDOM.files[0].name;
            this.applyForm.fileName=inputDOM.files[0].name;
            //console.log(inputDOM.files);
        },
        delfile(){
           this.filename=null;
           this.applyForm.fileName='';
        },
        choosetemplate(){
            this.template=true;
        },
        choose(index){
           // console.log(index);
            this.copycur=index-1;
        },
        preview(applyForm){
            this.$refs[applyForm].validate((valid) => {
                if(this.applyForm.fileName==''){
                    this.uploadborder=true;
                }else{
                    this.uploadborder=false;
                }
                if (valid) {
                    this.confirm = true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        copy(){ 
            console.log(this.mobanfont[this.copycur].cnt)
            this.copycnt=this.mobanfont[this.copycur].cnt
            var clipboard = new this.Clipboard('.copybtn')
            var that=this;
	        clipboard.on('success', e => {
	          // 释放内存
                that.$message({
                    message: '复制成功',
                    type: 'success'
                });
                setTimeout(function(){
                    that.template=false;
                },2000);
                clipboard.destroy()
	        })
	        clipboard.on('error', e => {
                // 不支持复制
                //console.log('该浏览器不支持自动复制')
                that.$message.error('该浏览器不支持自动复制');
                // 释放内存
                clipboard.destroy()
	        })
        },
        
        submit(){
            //console.log(this.fil);
            this.formData.append('fileName', this.fil[0]);
            this.formData.append('workName', this.applyForm.workName);
            this.formData.append('workNature', this.applyForm.workNature);
            this.formData.append('creationType', this.applyForm.creationType);
            this.formData.append('workType', this.applyForm.workType);
            this.formData.append('workSpec', this.applyForm.workSpec);
            let loadingInstance = Loading.service();
            var that=this;
            this.$request({
                method:'post',
                data:this.formData,
                headers:{
                    'Content-Type': 'multipart/form-data'
                    //'content-type': "application/json;charset=UTF-8"
                },
                url:'/personal/timestampApply',
            }).then((res) => {
                console.log(res);
                that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                });
                if(res.data.code==0){
                    console.log(res.data.data);
                    that.$router.replace({
                        name:"applysuccess",
                        params:{
                            id:res.data.data
                        }
                    })
                }else{
                    this.$message.error('提交失败，请刷新重试');
                }
            }).catch((err) => {
                this.$message.error('提交失败，请刷新重试');
                console.log(err);
            })
        }
    }
};
</script>

<style  scoped>
.wrap {
    width: 100%;
}
.h3-title {
    width: 100%;
    border-bottom: 4px solid #7499f5;
    color: #7499f5;
    font-size: 18px;
    padding-bottom: 12px;
    opacity: 0.8;
}
.form{
    width:60%;
    margin:0 auto;
    padding-top:34px; 
}
.looktem{
    color:#6A91F0;
    cursor: pointer;
}
.uploadwrap{
    height: 144px;
    width: 243px;
    text-align: center;
    position: relative;
    background: #fff;
    border: 1px dashed #ccc;
}
.uploadborder{
    border-color: red;
}
.uploadfile {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 144px;
    width: 243px;
    z-index: 999;
    cursor: pointer;
}
.uploadwrap .add{
    margin-top:20px;
}
.uploadwrap p{
    font-size: 16px;
    color:#999;
}
.close {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 30px;
    z-index: 9999;
    color: #333;
}
.uploadwrap:hover .close {
    display: block;
}
.dl{
    overflow: hidden;
    width:100%;
    font-size: 16px;
    color:#010101;
}
.dl dt{
    float: left;
    width:35%;
    text-align: right;
    margin-bottom: 20px;
    opacity: 0.6;
}
.dl dd{
    float: right;
    width:60%;
    text-align: left;
    opacity: 0.8;
}
.mobanul li{
    box-sizing: border-box;
    padding:9px 22px;
    font-size: 14px;
    color:#010101;
    line-height: 25px;
    cursor: pointer;
    margin-bottom: 10px;
}
.mobanul h3{
    font-size: 16px;
    margin-bottom: 12px;
    opacity: 0.8;
}
.mobanul h3 span{
    color:#6A91F0;
}
.mobanul li p{
    opacity: 0.6;
}
.mobanul li.active{
    background:#6A91F0;
    border:1px solid #6A91F0;
    border-radius:4px;
    background:rgba(106,145,240,.1);
}
</style>
<style>
.el-dialog__header {
    border-radius: 4px;
    padding: 10px;
    padding-bottom: 10px;
    background:#F2F2F2;
}
.el-dialog__title{
    color:#7499f5;
}
.el-dialog__headerbtn {
    top: 10px;
    font-size: 20px;
}
.el-dialog{
    border-radius: 4px;
}
.mytext .el-textarea__inner{
    height:120px;
}
</style>