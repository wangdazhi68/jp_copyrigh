<template>
    <div class="wrap my">
        <div class="header-wrap">
            <div class="header">
                <div class="logo">
                    <a @click="$router.replace({name:'lgindex'})"><img src="@/assets/images/logo1.png" alt="联合信任" /></a>
                    <a class="ngb" href="https://www.ngb.co.jp/" target="_blank"><img src="@/assets/images/ngb-logo.png" alt="联合信任" /></a>
                </div>
            </div>
        </div>
        <div class="banner">
            <img src="@/assets/images/banner.png" alt="banner">
        </div>
        <div class="login-cnt">
            <div class="loginbody">
                <div class="logo2">
                    <img src="@/assets/images/logo3.png" alt />
                    <p>中国タイムスタンプ知財保護システム</p>
                </div>
                <div class="form1">
                    <ul>
                        <li>
                            <input type="text" v-model="username" placeholder="ユーザーＩＤを入力してください" />
                        </li>
                        <li>
                            <el-input class="pwd2" show-password type="password" v-model="password" placeholder="パスワード">
                            </el-input>
                            <!-- <input class="pwd" show-password type="password" v-model="password" placeholder="パスワード" /> -->
                            <!-- <span class="forget">忘记密码？</span> -->
                        </li>
                        <li>
                            <input class="pwd" type="text" v-model="picyzm" placeholder="検証コード" />
                            <span class="yzmpic" @click="refreshCode">
                                <s-identify :identifyCode="identifyCode"></s-identify>
                            </span>
                        </li>
                    </ul>
                    <div class="forget-wrap"><span class="forget" @click="forgetpwd()">パスワードを忘れた方はこちら</span></div>
                    <div class="btns">
                        <p>
                            <span class="lgbtn" @click="loginto()">ログイン</span>
                        </p>
                        
                    </div>
                    <div class="error-ts">
                        <p>
                            <b v-show="usererror">ユーザーＩＤを入力してください</b>
                        </p>
                        <p>
                            <b v-show="passerror">パスワードを入力してください</b>
                        </p>
                        <p>
                            <b v-show="yzmerror">検証コードが正しくありません</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="パスワードを忘れた方はこちら"
            :visible.sync="forget"
            width="60%"
            top="10vh"
            :modal-append-to-body="false"
        >
            <div class="logo2">
                <img src="@/assets/images/logo3.png" alt />
                <p>中国タイムスタンプ知財保護システム</p>
            </div>
            <div class="form1" v-if="one">
                <ul>
                    <li>
                        <input type="text" v-model="userId" placeholder="ユーザーＩＤを入力してください" />
                    </li>
                    <li>
                        <input type="text" v-model="email" placeholder="メールアドレスを入力してください" />
                    </li>
                    <li>
                        <input type="text" v-model="yzm" placeholder="検証コードを入力してください" />
                    </li>
                </ul>
                <div class="forget-wrap"><span class="forget" :disabled='disabled' @click="getVerificationCode">{{yzmtext}}</span></div>
                <div class="btns">
                    <p>
                        <span class="lgbtn" @click="next()">次へ</span>
                    </p>
                    <b @click="gologin()">ログイン画面に戻る</b>
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
                        <span class="lgbtn" @click="modify()">送信する</span>
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
var interval = null;
export default {
    data() {
        return {
            forget:false,
            one:true,
            identifyCodes: "1234567890",
            identifyCode: "",
            username:'',
            userId:'',
            password:'',
            newpwd:'',
            confirmpwd:'',
            yzm:'',
            yzmtext: "検証コードを取得する",
            currentTime: 61,
            sucyzm: "",
            disabled:false,
            email:'',
            usererror:'',
            passerror:'',
            yzmerror:'',
            picyzm:'',
        };
    },

    components: {SIdentify},

    computed: {},

    created() {},

    mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    },

    methods: {
        gologin(){
            this.forget=false;
            this.one=true;

        },
        next(){
            if(this.userId.trim().length==''){
                this.$message.error('ユーザーＩＤを入力してください');
                return false 
            }
            if(this.email.trim().length==''){
                this.$message.error('ユーザメールアドレスを入力してください');
                return false 
            }
            if(this.yzm==this.sucyzm && this.yzm.length>0){
                var that=this;
                this.$request({
                    method: "post",
                    headers: {
                        "content-type": "application/json;charset=UTF-8"
                    },
                    data:{
                        userId:this.userId,
                        email:this.email,
                        verifyCode:this.yzm
                    },
                    url: "/register/validateEmailAndCode"
                })
                .then(res => {
                    console.log(res);
                    if(res.data.code==0){
                        this.one=false 
                    }else if(res.data.code==-300){
                        this.$message.error('検証コードエラー');
                    }else if(res.data.code==-400){
                        that.$message.error('登録されたメールアドレスを入力してください');
                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    that.$message.error(err);
                    console.log(err);
                });
            }else{
                this.$message.error('検証コードエラー');
                return false 
            } 
        },
        forgetpwd(){
            this.email='',
            this.userId='',
            this.yzm='',
            this.newpwd='',
            this.confirmpwd='',
            clearInterval(interval)
            this.yzmtext="検証コードを取得する",
            this.currentTime= 61,
            this.disabled=false,
            this.forget=true;
            this.one=true;
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
            //     var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            // reg.test(this.username)
            this.username.trim()==''
            if(this.username.trim()==''){
                this.usererror=true
                return false
            }else{
                this.usererror=false;
            }
            if(this.password !== null && this.password.trim().length > 0){
                this.passerror=false;
            }else{
                this.passerror=true;
                return false
            }
            if(this.picyzm!==this.identifyCode){
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
                        that.$router.replace({path:that.$route.query.redirect})  
					}else{
						// setTimeout(function(){
						that.$router.replace({name:"index"})
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
        async getVerificationCode(){
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(!reg.test(this.email)){ 
                this.$message.error('正しいメールボックス形式を入力してください');
                return false;
            }
            var that = this
            // let data=qs.stringify({
            //         loginName:this.email,
            //     });
            var ison=false;
			// await this.$request({
            //     method:'post',
            //     data:data,
            //     headers:{
			// 		'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            //     },
            //     url:'/register/validate',
            // }).then((res) => {
            //     //console.log(res);
            //     if(res.data.code==0){
            //        that.$message.error('このIDは存在しません！');
            //        ison=false;
            //     }
            // }).catch((err) => {
            //     console.log(err);
            // });
            await this.$request({
                    method: "post",
                    headers: {
                        "content-type": "application/json;charset=UTF-8"
                    },
                    data:{
                        userId:this.userId,
                        email:this.email
                    },
                    url: "/register/validateEmail"
                })
                .then(res => {
                    console.log(res);
                    if(res.data.code==0){
                        ison=true
                    }else{
                        ison=false
                        that.$message.error('登録されたメールアドレスを入力してください');
                    }
                })
                .catch(err => {
                    ison=false
                    that.$message.error(err);
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
                "userId":this.userId,
            }
            var signature=getSign(res);
            var json=JSON.stringify({
                    "loginName":this.email,
                    "userId":this.userId,
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
                    that.$message.error('検証コードを送信できませんでした。メールアドレスをご確認ください');
                    clearInterval(interval)
                    that.yzmtext='検証コードを取得する';
                    that.currentTime=61;
                    that.disabled=false;
                    return false
                }
                that.$message({
                    message: '検証コードを送信しました',
                    type: 'success'
                });
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
                that.yzmtext='('+currentTime + 's)検証コードを再取得する'
                if (currentTime <= 0) {
                    clearInterval(interval)
                    that.yzmtext='検証コードを再取得する';
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
                that.$message.error('入力したパスワードが異なります');
                return false
            }
            var that=this;
            this.$request({
                method: "post",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                data:{
                    userId:this.userId,
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
.header-wrap {
    width: 100%;
    min-width: 1200px;
    background: #6a91f0;
    border-bottom: 2px solid #ffffff;
}
.header {
    width: 1200px;
    margin: 0 auto;
    height: 100px;
    line-height: 100px;
}
.logo {
    display: flex;
    height: 100px;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start
}
.logo a{
    display:block;
    cursor: pointer;
}
.logo a.ngb{
    margin-left: 20px;
    height:27px;
    width: 72px;
}
.logo a img{
    display: block;
}
.banner{
    background:#6A91F0;
    min-height: 368px;
    position: relative;
    min-width: 1200px;
    width: 100%;
}
.banner img{
    width: 100%;
    position: absolute;
    left: 0;
    bottom:0;
    z-index: 1;
    right:0;
    margin:0 auto;
}
.login-cnt{
    position: relative;
    z-index: 2;
    width: 1200px;
    margin:0 auto;
    margin-top:-320px;
}


.loginbody{
    width:980px;
    padding: 50px 0;
    margin:0 auto 30px;
    border-radius: 10px;
    background: #fff;
    box-shadow:0px 4px 10px 0px rgba(210,223,255,0.5);
}
.logo2 {
    text-align: center;
    padding-top: 10px;
    margin-bottom: 40px;
}
.logo2 p {
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
.my .pwd2 input{
    border-bottom:none;
    padding: 0;
    font-size: 14px;
    color:#000;
}
.pwd2 input::-webkit-input-placeholder {
    color: #777;
  }
.pwd2 input::-moz-input-placeholder {
    color: #c0c4cc;
  }
.pwd2 input::-ms-input-placeholder {
    color: #c0c4cc;
  }
</style>