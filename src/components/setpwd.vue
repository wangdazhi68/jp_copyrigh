<template>
    <div class="setpwd">
        <el-dialog
            title="パスワード変更"
            :visible.sync="edipwd"
            width="50%"
            :modal-append-to-body="false"
            top="15vh"
            :showClose="false"
            :close-on-click-modal="false"
        >
            <el-form
                :model="pwdForm"
                status-icon
                :rules="rules"
                ref="pwdForm"
                label-width="180px"
                class="demo-ruleForm"
            >
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
                <el-button @click="childMethod">取消</el-button>
                <el-button type="primary" @click="confimpwd('pwdForm')">進 む</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { hexMD5 } from '@/assets/js/md5';
export default {
    name: "Setpwd",
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
            edipwd:false,
            pwdForm: {
                password: "",
                checkPass: ""
            },
            rules: {
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
    props: ["show3","fatherMethod"],
    components: {},
    watch: {
        'show3': function (n, o) {
            this.updata()
        }
    },
    computed: {},

    created() {},

    mounted() {},

    methods: {
        childMethod(){
            if (this.fatherMethod) {
                this.fatherMethod();
            }
        },
        updata(){
            if (this.show3) {
                this.edipwd = true;
            }
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
                            password:hexMD5(this.pwdForm.password)
                        },
                        url: "/register/updatePasswordFistTime"
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
                            }, 2000);
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
        },
        logout() {
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
                    that.$router.replace({ name: "login" });
                    return true;
                })
                .catch(err => {
                    console.log(err);
                    that.$store.commit("setuserinfo", "");
                    localStorage.removeItem("userinfo");
                    that.$router.replace({ name: "login" });
                });
            
        },
    }
};
</script>
<style lang="scss" scoped></style>
