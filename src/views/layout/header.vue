<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <img @click="$router.push({name:'lgindex'})" src="@/assets/images/logo1.png" alt="联合信任" />
            </div>
            <div class="userinfo">
                <span class="account">{{loginCode}}</span>
                <span class="epwd">パスワードを変更する+</span>
                <b class="sline">|</b>
                <span class="logout" @click="logout()">ログオフ</span>
            </div>
        </div>
        <el-dialog
            title="修改密码"
            :visible.sync="edipwd"
            width="40%"
            :modal-append-to-body="false"
            top="15vh"
        >
            <el-form
                :model="pwdForm"
                status-icon
                :rules="rules"
                ref="pwdForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="输入旧密码" prop="pass">
                    <el-input
                        type="password"
                        v-model="pwdForm.pass"
                        autocomplete="off"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="输入新密码" prop="checkPass">
                    <el-input
                        type="password"
                        v-model="pwdForm.checkPass"
                        autocomplete="off"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPass">
                    <el-input
                        type="password"
                        v-model="pwdForm.checkPass"
                        autocomplete="off"
                        show-password
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("年龄不能为空"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error("请输入数字值"));
                } else {
                    if (value < 18) {
                        callback(new Error("必须年满18岁"));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            edipwd: false,
            loginCode:'',
            pwdForm: {
                pass: "",
                checkPass: "",
                age: ""
            },
            rules: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
                age: [{ validator: checkAge, trigger: "blur" }]
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
            this.$store.commit("setuserinfo", "");
            localStorage.removeItem("userinfo");
            this.$router.replace({ name: "lgindex" });
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
                    return true;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style scoped>
.wrap {
    width: 100%;
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