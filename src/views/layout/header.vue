<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <img src="@/assets/images/logo1.png" alt="联合信任" />
            </div>
            <div class="userinfo">
                <span class="account">{{loginCode}}</span>
                <span class="epwd" @click="epwd()">パスワードを変更する+</span>
                <b class="sline">|</b>
                <span class="logout" @click="logout()">ログオフ</span>
            </div>
        </div>
        <el-dialog
            title="パスワード変更"
            :visible.sync="edipwd"
            width="50%"
            :modal-append-to-body="false"
            top="15vh"
        >
            <el-form
                :model="pwdForm"
                status-icon
                :rules="rules"
                ref="pwdForm"
                label-width="180px"
                class="demo-ruleForm"
            >
                <el-form-item label="現行パスワード:" prop="oldPassword">
                    <el-input
                        type="password"
                        v-model="pwdForm.oldPassword"
                        autocomplete="off"
                        show-password
                        placeholder="現行パスワードを入力してください"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新しいパスワード:" prop="password">
                    <el-input
                        type="password"
                        v-model="pwdForm.password"
                        autocomplete="off"
                        show-password
                        placeholder="新しいパスワードを入力してください"
                    ></el-input>
                </el-form-item>
                <el-form-item label="パスワードを確認:" prop="checkPass">
                    <el-input
                        type="password"
                        v-model="pwdForm.checkPass"
                        autocomplete="off"
                        show-password
                        placeholder="新しいパスワードを再度入力してください"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="edipwd = false">戻 る</el-button>
                <el-button type="primary" @click="confimpwd('pwdForm')">進 む</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { hexMD5 } from '@/assets/js/md5';
export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.pwdForm.password) {
                callback(new Error("一貫性のない2回の入力パスワード!"));
            } else {
                callback();
            }
        };
        var space= (rule, value, callback) => {
            if (value.trim().length==0) {
                callback(new Error('新しいパスワードを入力してください'));
            } 
            callback();
        };
        return {
            edipwd: false,
            loginCode:'',
            pwdForm: {
                oldPassword: "",
                password: "",
                checkPass: ""
            },
            rules: {
                oldPassword: [
                    { required: true, message: '古いパスワードを入力してください', trigger: 'blur' },
                ],
                checkPass: [
                    { required: true, message: 'パスワードを確認してください', trigger: 'blur' },
                    { validator: validatePass2, trigger: "blur" }
                ],
                password: [
                    { required: true, message: '新しいパスワードを入力してください', trigger: 'blur' },
                    {
                        validator:space,
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    components: {},

    computed: {},

    created() {
        let localdata = this.$getlocalStorage("userinfo");
        if (localdata) {
            this.loginCode = localdata.loginCode;
            this.loginstate = true;
        }
    },

    mounted() {},

    methods: {
        logout() {
            this.loginstate = false;
            var that = this;
            that.$request({
                method: "get",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                url: "/login/logout"
            })
                .then(res => {
                    that.$store.commit("setuserinfo", "");
                    localStorage.removeItem("userinfo");
                    that.$router.replace({ name: "lgindex" });
                    return true;
                })
                .catch(err => {
                    console.log(err);
                    that.$store.commit("setuserinfo", "");
                    localStorage.removeItem("userinfo");
                    that.$router.replace({ name: "lgindex" });
                });
            
        },
        epwd(){
            this.edipwd=true;
        },
        confimpwd(pwdForm){
            this.$refs[pwdForm].validate((valid) => {
                if (valid) {
                    var that=this;
                    this.$request({
                        method: "post",
                        headers: {
                            "content-type": "application/json;charset=UTF-8"
                        },
                        data:{
                            oldPassword:hexMD5(this.pwdForm.oldPassword),
                            password:hexMD5(this.pwdForm.password)
                        },
                        url: "/register/updatePassword"
                    })
                    .then(res => {
                        console.log(res);
                        if(res.data.code==0){
                            that.$message({
                                message: 'パスワードは正常に変更されました。もう一度ログインしてください。',
                                type: 'success'
                            });
                            this.edipwd=false;
                            setTimeout(() => {
                                this.logout();
                            }, 3000);
                        }else{
                            that.$message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        that.$message.error(err);
                        console.log(err);
                    });
                }else{
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
};
</script>
<style scoped>
.wrap {
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
    float: left;
    height: 47px;
}
.logo img {
    margin-top: 26px;
    cursor: pointer;
}
.userinfo {
    float: right;
    color: #fff;
    font-size: 18px;
}
.epwd {
    font-size: 14px;
    border: 1px solid #fff;
    padding: 2px 4px;
    vertical-align: 2px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 4px;
}
.sline {
    margin: 0 10px;
}
.logout {
    cursor: pointer;
}
.epwd:hover,
.logout:hover {
    color: blue;
}
.epwd:hover {
    border-color: blue;
}
</style>