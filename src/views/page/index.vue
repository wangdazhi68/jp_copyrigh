<template>
    <div class="my">
        <div class="body">
            <div class="header">
                <div class="header-cnt">
                    <div class="logo-index">
                        <img src="@/assets/images/logo1.png" alt="联合信任" />
                        <span>信頼できるタイムスタンプの知的財産保護プラットフォーム</span>
                    </div>
                    <div class="userinfo">
                        <span class="apply" @click="applyuse()">使用のお申し込み</span>
                        <span v-if="loginstate"  class="login" @click="$router.push({name:'index'})">{{loginCode}}</span>
                        <span v-else class="login" @click="taglogin()">ログイン</span>
                        <b v-if="loginstate">&nbsp;&nbsp;|&nbsp;&nbsp;</b>
                        <span v-if="loginstate" class="logout" @click="logout()">出口</span>
                    </div>
                </div>
            </div>
            <div class="banner" :style='bannerbg1'>
                <div class="des">
                    <div class="des-cnt" v-show="curactive==1">
                        <h3>トラステッドタイムスタンプ®知的財産保護センター（日本局）</h3>
                        <p>
                            Trusted Timestamp知的財産保護プラットフォームは、Trusted TrustedTimestamp®知的財産保護センターが日本企業の知的財産保護に対する意識を高め、企業の著作権保護能力を高めるために構築された知的財産プラットフォームです。 プリエンプティブプルーフは、便利で高速なサービスを提供します。 このシステムは、著作権保護サービスのオンラインアプリケーションを提供し、知的財産権の効果的、迅速、即時、効果的な保護を目的として、法的に有効な「出生証明書」を提供します。
                        </p>
                    </div>
                    <div class="des-cnt" v-show="curactive==2">
                        <h3>信頼できるタイムスタンプ</h3>
                        <p>
                            信頼できるタイムスタンプ（R）は、Joint Trust Time Stamp Service Centerによって発行されるe-Certであり、ソフトウェアが誰（WHO）でいつ動作するか（WHEN）どんな種類のコード（WHAT）であるかを証明します。法的に有効な電子証明書は、中国の司法省によって広く認められています。
                        </p>
                    </div>
                </div>
                <div class="des-nav">
                    <span @click="tagbtn(1)" :class="curactive==1?'active':''" >可信时间戳知识产权保护平台</span>
                    <span @click="tagbtn(2)" :class="curactive==2?'active':''">信頼できるタイムスタンプ</span>
                </div>
            </div>
            <div class="apply-process">
                <h3>アカウントプロセスに申し込む</h3>
                <p>
                    <img src="@/assets/images/apply-process.png" alt="">
                </p>
            </div>
            <div class="auth-process">
                <h3>認証プロセス</h3>
                <ul>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/auth1.png" alt="">
                                <span class="dassed">
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                </span>
                            </dt>
                            <dd>ログイン/登録</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/auth2.png" alt="">
                                <span class="dassed">
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                </span>
                            </dt>
                            <dd>電子データ/ファイルを選択</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/auth3.png" alt="">
                                <span class="dassed">
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                </span>
                            </dt>
                            <dd>共同信頼タイムスタ<br>
                            ンプサービスセンター</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt><img src="@/assets/images/auth4.png" alt=""></dt>
                            <dd>信頼できるタイムス<br>
                            タンプ証明書を発行する</dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="trait">
                <h3>特徴</h3>
                <ul>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait1.png" alt="">
                            </dt>
                            <dd>
                                <h5>速い</h5>
                                <span>セカンドパス認証，インスタント認証</span>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait2.png" alt="">
                            </dt>
                            <dd>
                                <h5>守秘義務</h5>
                                <span>コンテンツ情報をアップロードしないでください</span>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait3.png" alt="">
                            </dt>
                            <dd>
                                <h5>効果的</h5>
                                <span>直接司法認定</span>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait4.png" alt="">
                            </dt>
                            <dd>
                                <h5>便利な</h5>
                                <span>ウェブページから直接認定を申請する</span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="proof" :style="proofbg">
                <h3>証拠の使用</h3>
                <div class="proof-cnt">
                    <div :class="activeindex==2?'sec blur':'sec'">
                        <h4>権利者から治安判事に提出された証拠には以下が含まれます。</h4>
                        <dl>
                            <dt>
                                1.信頼できるタイムスタンプ認証の元のファイルを申請する<br>
                                2.対応する信頼できるタイムスタンプ証明書（* tsa形式）<br>
                                3.信頼できるタイムスタンプ認証証明書（* pdf形式）;
                            </dt>
                            <dd>
                                <img src="@/assets/images/proofone.png" alt="">
                            </dd>
                        </dl>
                    </div>
                    <div :class="activeindex==1?'sec blur':'sec'">
                        <h4>司法および行政判決：</h4>
                        <dl>
                            <dt>
                                www.tsa.cnの検証センターにログインして、権利所有者か <br>  
                                ら送信された元の文書と、対応する信頼できるタイムスタン<br>
                                プ証明書（* .tsa形式）を検証します。
                            </dt>
                            <dd>
                                <img src="@/assets/images/prooftwo.png" alt="">
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="circle-nav">
                    <b @click="tagcir(1)" :class="activeindex==1?'active':''" ></b>
                    <b @click="tagcir(2)" :class="activeindex==2?'active':''" ></b>
                </div>
            </div>
            <div class="footer">
                版权所有：北京联合信任技术服务有限公司 京IPC备13046264号-2
            </div>
        </div>
        <!-- 登录 -->
        <el-dialog
            title="ログイン"
            :visible.sync="login"
            width="60%"
            top="10vh"
            :modal-append-to-body="false"
        >
            <div class="logo">
                <img src="@/assets/images/logo3.png" alt />
                <p>中国タイムスタンプ知財保護システム</p>
            </div>
            <div class="form1">
                <ul>
                    <li>
                        <input type="text" v-model="username" placeholder="ユーザID/メールアドレスを入力してください" />
                    </li>
                    <li>
                        <input class="pwd" type="password" v-model="password" placeholder="パスワード" />
                        <span class="forget">忘记密码？</span>
                    </li>
                    <li>
                        <input class="pwd" type="text" v-model="yzm" placeholder="グラフィック検証コード" />
                        <span class="yzmpic" @click="refreshCode">
                            <s-identify :identifyCode="identifyCode"></s-identify>
                        </span>
                    </li>
                </ul>
                <div class="btns">
                    <p>
                        <span class="lgbtn" @click="loginto()">ログイン</span>
                    </p>
                    <b @click="applyuse()">アカウント取得はこちら</b>
                </div>
                <div class="error-ts">
                    <p>
                        <b v-show="usererror">正しいメールボックス形式を入力してください</b>
                    </p>
                    <p>
                        <b v-show="passerror">パスワードを入力してください</b>
                    </p>
                    <p>
                        <b v-show="yzmerror">検証コードエラー</b>
                    </p>
                </div>
            </div>
        </el-dialog>
        <!-- 申请使用 -->
        <el-dialog
            title="使用のお申し込み"
            :visible.sync="apply"
            width="60%"
            top="10vh"
            :modal-append-to-body="false"
            >
            <div class="logo">
                <img src="@/assets/images/logo3.png" alt />
                <p>使用のお申し込み</p>
            </div>
            <div class="form2">
                <el-form
                    label-width="220px"
                    class="demo-ruleForm"
                    :model="applyForm"
                    :rules="applyrules"
                    ref="applyForm"
                > 
                    <el-form-item label="申請者名:" prop="applyer">
                        <el-input type="text" v-model="applyForm.applyer"></el-input>
                    </el-form-item>
                    <el-form-item label="申請者の連絡先:" prop="mobile">
                        <el-input type="text" v-model="applyForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="申請者の連絡先メール:" prop="email">
                        <el-input type="text" v-model="applyForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="会社名（オプション）:">
                        <el-input type="text" v-model="applyForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="産業（オプション）:">
                        <el-input type="text" v-model="applyForm.industry"></el-input>
                    </el-form-item>
                </el-form>
                <div class="submit">
                    <span @click="submit('applyForm')">適用する</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import SIdentify from "@/components/identify";
import { Loading } from 'element-ui';
import { hexMD5 } from '@/assets/js/md5';

export default {
    data() {
        var phone = (rule, value, callback) => {
            var phone = this.applyForm.mobile;
            if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                callback(new Error('電話番号の形式が正しくありません'));
            }
            callback();
        };
        var emails = (rule, value, callback) => {
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(!reg.test(this.applyForm.email)){ 
                    callback(new Error('メールボックスの形式が正しくありません')); 
                }  
            callback();
        };
        return {
            loginstate:false,
            loginCode:'',
            curactive:1,
            activeindex:1,
            login: false,
            apply: false,
            identifyCodes: "1234567890",
            identifyCode: "",
            username:'',
            password:'',
            yzm:'',
            usererror:'',
            passerror:'',
            yzmerror:'',
            bannerbg1:{
                backgroundImage:'url(' + require('@/assets/images/banner-index.png') + ')',
                backgroundRepeat:"no-repeat"
            },
            proofbg:{
                backgroundImage:'url(' + require('@/assets/images/proofbg.png') + ')',
                backgroundRepeat:"no-repeat"
            },
            applyForm: {
                applyer: "",
                mobile: "",
                email: "",
                company: "",
                industry: ""
            },
            applyrules: {
                applyer: [
                    {
                        required: true,
                        message: "申請者の名前を入力してください",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 15,
                        message: "3〜15文字の長さ",
                        trigger: "blur"
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: "連絡先を入力してください",
                        trigger: "blur"
                    },
                    {
                        validator: phone,
                        trigger: "blur"
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "連絡先メールアドレスを入力してください",
                        trigger: "blur"
                    },
                    {
                        validator: emails,
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    components: { SIdentify },

    computed: {},

    created() {
        let localdata=this.$getlocalStorage('userinfo')
        if(localdata){
            this.loginCode=localdata.loginCode
            this.loginstate=true;
        }
        
    },

    mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    },

    methods: {
        taglogin(){
            this.login=true;
        },
        applyuse(){
            this.apply=true;
            this.login=false;
        },
        tagcir(n){  
            this.activeindex=n;
        },
        tagbtn(n){
            this.curactive=n;
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
            //console.log(this.identifyCode);
        },
        loginto(){
            var that=this;
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
			reg.test(this.username)
            if(!reg.test(this.username)){
                this.usererror=true
                return false
            }else{
                this.usererror=false;
            }
            if(this.password != null && this.password.trim().length > 0){
                this.passerror=false;
            }else{
                this.passerror=true;
                return false
            }
            if(this.yzm!==this.identifyCode){
                this.yzmerror=true
                return false
            }else{
                this.yzmerror=false
            }
            let loadingInstance = Loading.service();
            this.$request({
                method:'post',
                data:{
                    username:that.username,
                    password:hexMD5(this.password)
                },
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/login/signOn?lang=ja_JP',
            }).then((res) => {
                console.log(res);
                that.$nextTick(() => { 
                    // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                });
                if(res.data.code==0){
					that.$store.commit('setuserinfo',res.data.data);
                    that.$setlocalStorage('userinfo',res.data.data)
					if(that.$route.query.redirect){
						if(that.$route.query.redirect=='/page/index'){
                            that.$router.push({name:"index"})
                        }else{
                            that.$router.replace({path:that.$route.query.redirect})
                        }
					}else{
						// setTimeout(function(){
						that.$router.push({name:"index"})
						// },3000);
					}
                    
                }else if(res.data.code==-200){
                    this.$message.error(res.data.msg)
				}else if(res.data.code==-300){
                    this.$message.error(res.data.msg)
                }else{
                    this.$message.error(res.data.msg);
                }

            }).catch((err) => {
                that.$nextTick(() => { 
                    // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                });
                console.log(err);
            })

        },
        logout(){
            this.$store.commit('setuserinfo', '')
            localStorage.removeItem('userinfo')
            this.loginstate=false;
            var that=this;
            that.$request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/login/logout',
            }).then((res) => {
                return true
            }).catch((err) => {
                console.log(err);
            })
        },
        submit(applyForm){
            this.$refs[applyForm].validate((valid) => {
                if (valid) {
                    let loadingInstance = Loading.service();
                    if(!this.company){
                        delete this.applyForm.company;  
                    }
                    if(!this.industry){
                        delete this.applyForm.industry;
                    }
                    let that=this
                    this.$request({
                        method:'post',
                        data:this.applyForm,
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        url:'/apply/add?lang=ja_JP',
                    }).then((res) => {
                        console.log(res);
                        that.$nextTick(() => { 
                            // 以服务的方式调用的 Loading 需要异步关闭
                            loadingInstance.close();
                        });
                        if(res.data.code==0){
                            //console.log(res.data.data);
                            that.$message({
                                message: '成功したアプリケーション',
                                type: 'success'
                            });
                            this.apply=false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    }).catch((err) => {
                        that.$nextTick(() => { 
                            // 以服务的方式调用的 Loading 需要异步关闭
                            loadingInstance.close();
                        });
                        this.$message.error(err);
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        }
    }
};
</script>
<style scoped>
.header{
    width:100%;
    background:rgba(255,255,255,.3);
    position: absolute;
    top:0;
    left: 0;
    z-index: 3;
}
.header-cnt{
    width: 1200px;
    margin: 0 auto;
    height:100px;
    line-height: 100px;
}
.logo-index{
    width:60%;
    float: left;
    font-size: 20px;
    color:#fff;
}
.logo-index img{
    vertical-align: middle;
    margin-right:25px;
}
.userinfo{
    float:right;
    color:#fff;
    font-size: 20px;
}
.login{
    cursor: pointer;
}
.login:hover,.logout:hover{
    color:blue
}
.apply{
    display: inline-block;
    height:32px;
    width: 174px;
    text-align: center;
    line-height: 32px;
    background:#6a91f0;
    border-radius: 8px;
    margin-right: 32px;
    cursor: pointer;
}
.logout{
    cursor: pointer;
}

.apply:hover{
    opacity: .8;
}
.banner {
    padding-top: 100px;
    width:100%;
    max-width: 1920px;
    height:600px;
    background-size: cover;
    background-position: center;
    position: relative;
}
.des{
    width:910px;
    padding: 55px 78px;
    background:#fff;
    opacity: 0.8;
    font-size: #000;
    margin:0 auto;
    margin-top:60px;
    box-sizing: border-box;
}
.des-cnt h3{
    font-size: 24px;
    text-align: center;
    margin-bottom:46px;
}
.des-cnt p{
    font-size: 16px;
    line-height: 30px;
}
.des-nav{
    position: absolute;
    bottom:-33px;
    width: 100%;
    text-align: center; 
}
.des-nav span{
    display: inline-block;
    width:362px;
    height:75px;
    line-height: 75px;
    text-align: center;
    color:#555;
    background:#fff;
    margin:0 35px;
    cursor: pointer;
    box-shadow:0px 3px 4px 0px rgba(234,234,234,1);
    -moz-user-select: -moz-none; 
    -moz-user-select: none; 
    -o-user-select:none; 
    -khtml-user-select:none; 
    -webkit-user-select:none; 
    -ms-user-select:none; 
    user-select:none;

}
.des-nav span.active{
    background:#6A91F0;
    color:#fff;
    box-shadow:none;
}
.apply-process{
    padding-top: 100px;
    text-align: center;
}
.apply-process h3,.auth-process h3,.trait h3,.proof h3{
    font-size: 24px;
    color:#6A91F0;
    margin-bottom: 67px;
    text-align: center;
}
.auth-process{
    background:#EAEEF8;
    width:100%;
    padding:40px 0;
    margin-top:80px;
}
.auth-process ul{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    text-align: center;
    width:1200px;
    margin:0 auto;
}
.auth-process ul dd{
    font-size: #555;
    margin-top:37px;
}
.auth-process ul dt{
    position: relative;
}
.dassed{
    position: absolute;
    top:65px;
    right:-108px;
    display: block;
    width:100px;
}
.dassed b{
    height:4px;
    width:14px;
    background:#6A91F0;
    display: inline-block;
    margin:0 3px;
}
.trait{
    padding-top:70px;
}
.trait ul{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    text-align: center;
    width:1200px;
    margin:0 auto;
    flex-wrap: wrap;
}
.trait ul li{
    width:50%;
    margin-bottom: 65px;
}
.trait ul dt{
    margin-bottom: 26px;
}
.trait ul dd{
    color:#999;
}
.trait ul dd h5{
    color:#777;
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 20px;
}
.proof{
    padding-top:60px;
    height:606px;
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    position: relative;
}
.sec{
    background:#565656;
    width:938px;
    height:367px;
    margin:0 auto;
    box-sizing: border-box;
    padding:38px 44px;
    color:#fff;
}
.sec h4{
    text-align: center;
    font-size: 18px;
    margin-bottom: 50px;
}
.sec dl{
    overflow: hidden;
}
.sec dt{
    float:left;
    width: 445px;
    line-height: 30px;
    padding-top: 33px;
}
.sec dd{
    float:left;
    margin-left: 40px;
}
.proof-cnt{
    position: relative;
    height:427px;
}
.sec{
    position: absolute;
    left:0;
    right:0;
    top:0;
    margin:auto;
    z-index: 2;
    transition:all 2s
}
.blur{
   top:30px;
   transform:scale(0.95);
   z-index: 1;
   opacity: 0.8;
}
.circle-nav{
    text-align: center;
}
.circle-nav b{
    display: inline-block;
    width:18px;
    height: 18px;
    border-radius: 50%;
    background:#ccc;
    margin:0 15px;
    cursor: pointer;
}
.circle-nav b.active{
    background:#6A91F0
}
.proof h3{
    margin-bottom: 40px;
}
.footer{
    text-align: center;
    line-height: 120px;
    color:#010101;
    font-size: 14px;
    opacity: 0.8;
}








.logo {
    text-align: center;
    padding-top: 10px;
    margin-bottom: 40px;
}
.logo p {
    margin-top: 10px;
    font-size: 18px;
}
.form1 {
    width: 315px;
    margin: 0 auto;
    position: relative;
}
.form1 li {
    border-bottom: 2px solid #f0f0f0;
    width: 100%;
    padding-top: 10px;
}
.form1 li input {
    font-size: 14px;
    width: 100%;
    border: none;
    outline: none;
    height: 40px;
    line-height: 40px;
}
.form1 li .pwd {
    width: 73%;
    cursor: pointer;
}
.forget {
    font-size: 16px;
    color: #7499f5;
    cursor: pointer;
}
.error-ts {
    position: absolute;
    right: -300px;
    top: 0;
    width:295px
}
.error-ts p {
    height: 44px;
    line-height: 44px;
    color: red;
    font-size: 14px;
    padding-top: 10px;
}
.yzmpic {
    display: inline-block;
    vertical-align: middle;
}
.btns {
    text-align: center;
    margin-top: 35px;
    font-size: 18px;
}
.lgbtn {
    display: inline-block;
    width: 100%;
    line-height: 46px;
    background: #6a91f0;
    color: #fff;
    border-radius: 8px;
    margin-bottom: 27px;
    cursor: pointer;
}
.lgbtn:hover {
    opacity: 0.8;
}
.btns b {
    font-size: 16px;
    color: #7499f5;
    cursor: pointer;
}
.form2 {
    width: 500px;
    margin: 0 auto;
}
.submit {
    font-size: 18px;
    text-align: center;
    margin-top: 50px;
}
.submit span {
    display: inline-block;
    width: 50%;
    line-height: 46px;
    background: #6a91f0;
    color: #fff;
    border-radius: 8px;
    margin-bottom: 27px;
    cursor: pointer;
}
.submit span:hover {
    opacity: 0.8;
}
</style>
<style >
.my .el-dialog__header {
    border-radius: 4px;
    height: 54px;
    line-height: 54px;
    padding: 10px;
    box-sizing: border-box;
    opacity: 0.8;
}
.my .el-dialog__title {
    border-bottom: 4px solid #7499f5;
    color: #7499f5;
    display: block;
    padding-bottom: 10px;
}
.my .el-dialog__headerbtn {
    top: 10px;
    font-size: 20px;
}
.my .el-dialog {
    border-radius: 4px;
}
.my .mytext .el-textarea__inner {
    height: 120px;
}
.my .el-input__inner {
    border: none;
    border-bottom: 2px solid #f0f0f0;
    border-radius: 0;
    font-size: 18px;
}
.my .el-form-item__label {
    font-size: 18px;
}
.my .el-form-item__error {
    color: #F56C6C;
    font-size: 16px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 15px;
    right: -305px;
    left:auto;
}

</style>
