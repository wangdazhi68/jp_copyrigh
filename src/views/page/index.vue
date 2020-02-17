<template>
    <div class="my-wrap">
        <div class="body">
            <div class="china-time">
                <div class="china-time-cnt">
                    中国科学院国家授時センター標準時間：
                    <span>{{cTime}}(UTC+8:00)</span>
                </div>
            </div>
            <div :class="[headershow ? 'header header-fixed' : 'header']">
                <div class="header-cnt">
                    <div class="logo-index">
                        <img src="@/assets/images/logo1.png" alt="联合信任" />
                        <a href="https://www.ngb.co.jp/" target="_blank"><img src="@/assets/images/ngb-logo.png" alt="联合信任" /></a>
                        <span>トラステッド・タイムスタンプ</span>
                    </div>
                    <div class="userinfo">
                        <span class="apply" @click="applyuse()">アカウント申請</span>
                        <span v-if="loginstate"  class="login logincode" @click="$router.push({name:'index'})">{{loginCode}}様</span>
                        <span v-else class="login" @click="taglogin()">ログイン</span>
                        <b v-if="loginstate">&nbsp;&nbsp;|&nbsp;&nbsp;</b>
                        <span v-if="loginstate" class="logout" @click="logout()">ログアウト</span>
                    </div>
                </div>
            </div>
            <div class="banner" :style='bannerbg1'>
                <div class="des">
                    <div class="des-cnt" v-show="curactive==1">
                        <h3>トラステッド・タイムスタンプ</h3>
                        <p>
                            トラステッド・タイムスタンプは北京聯合信任技術服務有限公司（Beijing UniTrust Tech Service Co., Ltd.）が提供する電子認証型タイムスタンプサービスであり、認証に利用される時間は中国の国家時刻標準機関である中国科学院国家授時センター（NTSC）の付与する中国標準時間を採用し、多くの中国の司法機関において認められた実績があります。
                        </p>
                    </div>
                    <!-- <div class="des-cnt" v-show="curactive==2">
                        <h3>信頼できるタイムスタンプ</h3>
                        <p>
                            信頼できるタイムスタンプ（R）は、Joint Trust Time Stamp Service Centerによって発行されるe-Certであり、ソフトウェアが誰（WHO）でいつ動作するか（WHEN）どんな種類のコード（WHAT）であるかを証明します。法的に有効な電子証明書は、中国の司法省によって広く認められています。
                        </p>
                    </div> -->
                </div>
                <div class="des-nav">
                    <!-- <span @click="tagbtn(1)" :class="curactive==1?'active':''" >トラステッド・タイムスタンプ</span> -->
                    <!-- <span @click="tagbtn(2)" :class="curactive==2?'active':''">信頼できるタイムスタンプ</span> -->
                </div>
            </div>
            <div class="apply-process">
                <h3>トラステッド・タイムスタンプの申請と認証の仕組み</h3>
                <p>
                    <img src="@/assets/images/Principle.png" alt="">
                </p>
            </div>
            <!-- <div class="auth-process">
                <h3>タイムスタンプの申請と認証の流れ</h3>
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
                            <dd>サインイン/ログイン</dd>
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
                            <dd>対象資料の選択</dd>
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
                            <dd>認証証書及びタイムス<br/>タンプトークンのダウンロード
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt><img src="@/assets/images/auth4.png" alt=""></dt>
                            <dd>対象資料及びタイムス<br/>タンプトークンによる認証</dd>
                        </dl>
                    </li>
                </ul>
            </div> -->
            <div class="trait">
                <h3>トラステッド・タイムスタンプの強み</h3>
                <ul>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait1.png" alt="">
                            </dt>
                            <dd>
                                <h5>利便性</h5>
                                <span>ログインして対象資料をドラッグ＆ドロップするだけ！</span>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait2.png" alt="">
                            </dt>
                            <dd>
                                <h5>秘匿性</h5>
                                <span>第三者に資料の内容を開示する必要なし！</span>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait3.png" alt="">
                            </dt>
                            <dd>
                                <h5>有効性</h5>
                                <span>中国の裁判所に認められた実績が多数！</span>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>
                                <img src="@/assets/images/trait4.png" alt="">
                            </dt>
                            <dd>
                                <h5>客観性</h5>
                                <span>中国国家授時センターによる標準時刻情報を採用！</span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="proof" :style="proofbg">
                <h3>トラステッド・スタンプの有効性と実績</h3>
                <div class="proof-cnt">
                    <!-- <div :class="activeindex==2?'sec blur':'sec'">
                        <h4>裁判所に提出する証拠は以下の者が含まれます。</h4>
                        <dl>
                            <dt>
                                1.変更がされていないトラステッド・タイムスタンプを申請した対象資料<br>
                                2.対象資料に対応するタイムスタンプトークン（*.tsa形式）<br>
                                3.タイムスタンプ認証証書（*.pdf形式）;
                            </dt>
                            <dd>
                                <img src="@/assets/images/proofone.png" alt="">
                            </dd>
                        </dl>
                    </div> -->
                    <div :class="activeindex==1?'sec blur':'sec'">
                        <!-- <h4>司法および行政判決：</h4>
                        <dl>
                            <dt>
                                www.tsa.cnの検証センターにログインして、権利所有者か <br>  
                                ら送信された元の文書と、対応する信頼できるタイムスタン<br>
                                プ証明書（* .tsa形式）を検証します。
                            </dt>
                            <dd>
                                <img src="@/assets/images/prooftwo.png" alt="">
                            </dd>
                        </dl> -->
                        <div style="width:678px; margin:0 auto; font-size:18px; padding-top:35px;">
                            <p style="text-indent:1em">
                                2018年6月29日、杭州のインターネット法院が著作権をめぐる裁判において<br>
                            「当事者が提出した電子データは、電子署名、トラステッド・タイムスタンプ、<br>
                            ハッシュツール、ブロックチェーン等証拠収集、固定と改竄防止技術または<br>
                            電子証拠保管プラットホームの認証を通じ、その真実性が証明できるものに<br>
                            ついては、インターネット法院で証拠として認められる。」と表明しました。<br>
                            </p>
                            <p style="text-indent:1em">
                                また、その表明を追認するように2018年9月7日、中国最高人民法院は<br>
                                「インターネット法院による事件審理に係る若干の問題に関する規定」を公布、<br>
                                施行し、トラステッド・タイムスタンプを用いた証拠は法的効力を有すると認めています。<br>
                            </p>

                        </div>
                    </div>
                </div>
                <!-- <div class="circle-nav">
                    <b @click="tagcir(1)" :class="activeindex==1?'active':''" ></b>
                    <b @click="tagcir(2)" :class="activeindex==2?'active':''" ></b>
                </div> -->
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
                        <input type="text" v-model="username" placeholder="ユーザーＩＤを入力してください" />
                    </li>
                    <li>
                        <input class="pwd" type="password" v-model="password" placeholder="パスワード" />
                        <!-- <span class="forget">忘记密码？</span> -->
                    </li>
                    <li>
                        <input class="pwd" type="text" v-model="yzm" placeholder="検証コード" />
                        <span class="yzmpic" @click="refreshCode">
                            <s-identify :identifyCode="identifyCode"></s-identify>
                        </span>
                    </li>
                </ul>
                <div class="forget-wrap"><span class="forget">パスワードを忘れた方はこちら</span></div>
                <div class="btns">
                    <p>
                        <span class="lgbtn" @click="loginto()">ログイン</span>
                    </p>
                    <b @click="applyuse()">アカウント取得はこちら</b>
                </div>
                <div class="error-ts">
                    <p>
                        <b v-show="usererror">メールアドレスの形式が正しくありません</b>
                    </p>
                    <p>
                        <b v-show="passerror">パスワードを入力してください</b>
                    </p>
                    <p>
                        <b v-show="yzmerror">検証コードが正しくありません</b>
                    </p>
                </div>
            </div>
        </el-dialog>
        <!-- 申请使用 -->
        <el-dialog
            title="アカウント申請"
            :visible.sync="apply"
            width="80%"
            top="10vh"
            :modal-append-to-body="false"
            >
            <div class="logo">
                <img src="@/assets/images/logo3.png" alt />
                <p>アカウント申請</p>
            </div>
            <div class="form2">
                <el-form
                    label-width="220px"
                    class="demo-ruleForm"
                    :model="applyForm"
                    :rules="applyrules"
                    ref="applyForm"
                > 
                    <el-form-item label="担当者名:" prop="applyer">
                        <el-input type="text" v-model="applyForm.applyer"></el-input>
                    </el-form-item>
                    <el-form-item label="電話番号:">
                        <el-input type="text" v-model="applyForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="会社名:" prop="company">
                        <el-input type="text" v-model="applyForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="メールアドレス:" prop="email">
                        <el-input type="text" v-model="applyForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="お問い合わせ内容:" prop="inqueryInfo">
                        <el-input class="mytext" show-word-limit maxlength="100" type="textarea" v-model="applyForm.inqueryInfo"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="産業（オプション）:">
                        <el-input type="text" v-model="applyForm.industry"></el-input>
                    </el-form-item> -->
                </el-form>
                <div class="submit">
                    <span @click="preview('applyForm')">送信する</span>
                </div>
            </div>
        </el-dialog>
        <!-- 申请确认 -->
        <el-dialog
            class="confirm-dialog"
            title="申請確認"
            :visible.sync="confirm"
            width="40%"
            top="10vh"
            :modal-append-to-body="false"
            >
            <dl class="dl">
                <dt>担当者名：</dt>
                <dd>{{applyForm.applyer}}</dd>
            </dl>
            <dl class="dl">
                <dt>電話番号：</dt>
                <dd>{{applyForm.mobile}}</dd>
            </dl>
            <dl class="dl">
                <dt>会社名：</dt>
                <dd>{{applyForm.company}}</dd>
            </dl>
            <dl class="dl">
                <dt>メールアドレス：</dt>
                <dd>{{applyForm.email}}</dd>
            </dl>
            <dl class="dl">
                <dt>お問い合わせ内容：</dt>
                <dd>{{applyForm.inqueryInfo}}</dd>
            </dl>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirm = false">キャンセルする</el-button>
                <el-button type="primary" @click="submit()">申請する</el-button>
            </span>
        </el-dialog>
        <!-- 忘记密码 -->
        <el-dialog
            title="ログイン"
            :visible.sync="forget"
            width="60%"
            top="10vh"
            :modal-append-to-body="false"
        >
            <div class="logo">
                <img src="@/assets/images/logo3.png" alt />
                <p>中国タイムスタンプ知財保護システム</p>
            </div>
            <div class="form1" v-if="one">
                <ul>
                    <li>
                        <input type="text" v-model="email" placeholder="メールアカウントを入力してください" />
                    </li>
                    <li>
                        <input type="text" v-model="yzm" placeholder="確認コードを入力してください" />
                    </li>
                </ul>
                <div class="forget-wrap"><span class="forget" :disabled='disabled' @click="getVerificationCode">{{yzmtext}}</span></div>
                <div class="btns">
                    <p>
                        <span class="lgbtn" @click="next()">次のステップ</span>
                    </p>
                    <b @click="gologin()">ログインに戻る</b>
                </div>
            </div>
            <div class="form1" v-else>
                <ul>
                    <li>
                        <input type="password" v-model="newpwd" placeholder="新しいパスワードを入力してください" autocomplete="off"
                        show-password />
                    </li>
                    <li>
                        <input type="password" v-model="confirmpwd" placeholder="新しいパスワードを確認" autocomplete="off"
                        show-password />
                    </li>
                </ul>
                <div class="btns">
                    <p>
                        <span class="lgbtn" @click="modify()">今すぐ送信</span>
                    </p>
                    <b @click="gologin()">ログインに戻る</b>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import SIdentify from "@/components/identify";
import { Loading } from 'element-ui';
import {getSign} from '@/assets/js/sign';
import { hexMD5 } from '@/assets/js/md5';
import qs from 'qs';
import moment from 'moment'
var interval = null;
var interval2 = null;
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
                    callback(new Error('メールアドレスの形式が正しくありません')); 
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
            forget:false,
            confirm:false,
            one:true,
            identifyCodes: "1234567890",
            identifyCode: "",
            username:'',
            password:'',
            newpwd:'',
            confirmpwd:'',
            yzm:'',
            yzmtext: "確認コードを取得する",
            currentTime: 61,
            sucyzm: "",
            disabled:false,
            email:'',
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
                //industry: "",
                inqueryInfo:"",
            },
            applyrules: {
                applyer: [
                    {
                        required: true,
                        message: "申請者の名前を入力してください",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 15,
                        message: "1〜15文字の長さ",
                        trigger: "blur"
                    }
                ],
                // mobile: [
                //     {
                //         required: true,
                //         message: "連絡先を入力してください",
                //         trigger: "blur"
                //     },
                //     {
                //         validator: phone,
                //         trigger: "blur"
                //     },
                // ],
                email: [
                    {
                        required: true,
                        message: "メールアドレスをご記入ください",
                        trigger: "blur"
                    },
                    {
                        validator: emails,
                        trigger: "blur"
                    }
                ],
                company:[
                    {
                        required: true,
                        message: "会社名をご記入ください",
                        trigger: "blur"
                    },
                    { min: 1, max: 100, message: '入力できる内容は100文字以内となります。', trigger: 'blur' }
                ],
                // inqueryInfo:[
                //     {
                //         required: true,
                //         message: "お問い合わせ内容をご記入ください",
                //         trigger: "blur"
                //     }
                // ]
            },
            headershow:false,
            ntpDate:null, 
            nowDate:null, 
            td:null,
            cTime:null,
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
        this.initTime(); 
        interval2 =window.setInterval(this.getDate, 1);
    },

    mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        let that=this
        window.addEventListener("scroll", function(){
            let winscroll=document.body.scrollTop||document.documentElement.scrollTop;
            if(winscroll>100){
                that.headershow=true;
            }else{
                that.headershow=false;
            }
        });

    },
    destroyed(){
        clearInterval(interval2)
    },
    methods: {
        initTime(){
            let that=this;
            this.$request({
                url:'/register/time',
            }).then((res) => {
                console.log(res);
                that.ntpDate = res.data;
                that.nowDate = new Date().getTime();
                that.td = that.ntpDate - that.nowDate;
                that.nowDate = that.nowDate + that.td;
            }).catch((err) => {
                console.log(err);
            })
        },
        getDate() {
            if (this.ntpDate == null) {
                return;
            } else {
                var now = new Date().getTime() + this.td;
                if (Math.abs(parseInt(now) - parseInt(this.nowDate)) > 1000) {
                    this.ntpDate = null;
                    this.initTime();
                } else {
                    this.nowDate = now;
                    this.cTime = moment(now).format('YYYY-MM-DD HH:mm:ss:SSS');
                }
            }
        },
        taglogin(){
            //this.login=true;
            this.$router.push({name:"login"})
        },
        gologin(){
            this.login=true;
            this.forget=false;
            this.one=true;
        },
        next(){
            if(this.yzm==this.sucyzm && this.yzm.length>0){
                this.one=false 
            }else{
                this.$message.error('検証コードエラー');
                return false 
            } 
        },
        forgetpwd(){
            this.login=false;
            this.forget=true;
            this.one=true;
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
                url:'login/signOn?lang=ja_JP',
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
            this.loginstate=false;
            var that=this;
            that.$request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/login/logout',
            }).then((res) => {
                that.$store.commit('setuserinfo', '')
                localStorage.removeItem('userinfo')
                return true
            }).catch((err) => {
                that.$store.commit('setuserinfo', '')
                localStorage.removeItem('userinfo')
                console.log(err);
            })
            
        },
        preview(applyForm) {
            this.$refs[applyForm].validate(valid => {
                if (valid) {
                    this.confirm = true;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        submit(applyForm){
            let loadingInstance = Loading.service();
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
                        message: 'アカウント申請情報を送信しました。',
                        type: 'success'
                    });
                    this.apply=false;
                    this.confirm=false;
                    this.applyForm={
                        email: "",
                        company: "",
                        inqueryInfo:"",
                    }
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
        },
        async getVerificationCode(){
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(!reg.test(this.email)){ 
                this.$message.error('正しいメールボックス形式を入力してください');
                return false;
            }
            var that = this
            let data=qs.stringify({
                    loginName:this.email,
                });
            var ison=true;
			await this.$request({
                method:'post',
                data:data,
                headers:{
					'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                url:'/register/validate',
            }).then((res) => {
                //console.log(res);
                if(res.data.code==0){
                   that.$message.error('アカウントが存在しません');
                   ison=false;
                }
            }).catch((err) => {
                console.log(err);
            });
            if(!ison){
                return false;
            }
            this.getCode();
            
            that.disabled=true;

            var date = new Date();
            var timestamp = date.getTime();
            var res = {
                "timestamp": timestamp,
                "loginName":this.email,
                "loginType":"2",
            }
            var signature=getSign(res);
            var json=JSON.stringify({
                    "loginName":this.email,
                    "loginType":"2",
                    "signature":signature.toUpperCase(),
                    "timestamp":timestamp.toString()
                });

            this.$request({
                method:'post',
                data:json,
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/register/sendValidateCode',
            }).then((res) => {
                console.log(res);
                if(res.data.code==-1){
                    alert('请求失败')
                    return false
                }
                this.sucyzm=res.data.data.code;
            }).catch((err) => {
                console.log(err);
            })
        },
        getCode: function (options) {
            var that = this;
            var currentTime = that.currentTime
            interval = setInterval(function () {
                currentTime--;
                that.yzmtext='('+currentTime + 's)取り戻す'
                if (currentTime <= 0) {
                    clearInterval(interval)
                    that.yzmtext='取り戻す';
                    that.currentTime=61;
                    that.disabled=false;
                }
            }, 1000)
        },
        modify(){
            var that=this;
            if(this.newpwd.trim()==''){
                that.$message.error('新しいパスワードを入力してください');
                return false
            }
            if(this.confirmpwd!==this.newpwd){
                that.$message.error('一貫性のない2回の入力パスワード!');
                return false
            }
            var that=this;
            this.$request({
                method: "post",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                data:{
                    email:this.email,
                    password:hexMD5(this.newpwd)
                },
                url: "/register/resetPassword"
            })
            .then(res => {
                console.log(res);
                if(res.data.code==0){
                    that.$message({
                        message: 'パスワードは正常に変更されました。もう一度ログインしてください。',
                        type: 'success'
                    });
                    setTimeout(function(){
					    that.one=true;
                        that.forget=false;
                        that.login=true;
					},3000);
                    
                }else{
                    that.$message.error(res.data.msg);
                }
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
.china-time{
    background:#000;
    min-width:1200px;
    color: #fff;
    height: 30px;
    line-height: 30px;
}
.china-time-cnt{
    width: 1200px;
    margin:0 auto;
    font-size: 16px;
}
.header{
    width:100%;
    background:rgba(255,255,255,.3);
    position: absolute;
    top:30px;
    left: 0;
    z-index: 3;
    min-width: 1200px;
}
.header-fixed{
    background:rgba(0,0,0,.6);
	position: fixed;
	top:0;
	left: 0;
}
.header-cnt{
    width: 1200px;
    margin: 0 auto;
    height:100px;
    line-height: 100px;
}
.logo-index{
    width:50%;
    float: left;
    font-size: 22px;
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
.logincode{
    font-size: 16px;
    width:145px;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    margin-right: 30px;
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
    min-width:1200px;
    margin:0 auto;
    height:600px;
    background-size: cover;
    background-position: center;
    position: relative;
    margin:0 auto;
}
.des{
    width:910px;
    padding: 55px 78px;
    background:#fff;
    opacity: 0.8;
    font-size: #000;
    margin:0 auto;
    margin-top:110px;
    box-sizing: border-box;
}
.des-cnt h3{
    font-size: 24px;
    text-align: center;
    margin-bottom:46px;
}
.des-cnt p{
    font-size: 18px;
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
    padding-top: 60px;
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
    min-width: 1200px;
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
    width:100%;
    min-width: 1200px;
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
    width: 100%;
    min-width: 1200px;
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
.forget-wrap{
    text-align: right;
    padding: 10px 0;
}
.forget {
    font-size: 16px;
    color: #7499f5;
    cursor: pointer;
    user-select:none;
}
.forget[disabled]{
    color:#999;
    pointer-events: none;
    cursor: inherit;
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
    user-select: none;
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
/* 申请确认 */
.dl {
    overflow: hidden;
    width: 100%;
    font-size: 16px;
    color: #010101;
}
.dl dt {
    float: left;
    width: 38%;
    text-align: right;
    margin-bottom: 20px;
    opacity: 0.6;
}
.dl dd {
    float: right;
    width: 60%;
    text-align: left;
    opacity: 0.8;
}
</style>
<style >
.my-wrap .el-dialog__header {
    border-radius: 4px;
    height: 54px;
    line-height: 54px;
    padding: 10px;
    box-sizing: border-box;
    opacity: 0.8;
}
.my-wrap .el-dialog__title {
    border-bottom: 4px solid #7499f5;
    color: #7499f5;
    display: block;
    padding-bottom: 10px;
}
.my-wrap .el-dialog__headerbtn {
    top: 10px;
    font-size: 20px;
}
.my-wrap .el-dialog {
    border-radius: 4px;
}
.my-wrap .mytext .el-textarea__inner {
    height: 120px;
}
/* 

 */
.my-wrap .el-form-item__label {
    font-size: 18px;
}
/* .my .el-form-item__error {
    color: #F56C6C;
    font-size: 16px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 15px;
    right: -305px;
    left:auto;
} */

</style>
