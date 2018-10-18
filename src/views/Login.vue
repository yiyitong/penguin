<template>
    <section>
        <h1>登录</h1>
        <el-form :model="loginForm" :rules="rules" label-width="100px" ref="loginForm">
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="passwd">
                <el-input v-model="loginForm.passwd"></el-input>
            </el-form-item>
            <el-form-item>
            <el-checkbox label="记住密码"  v-model="remember"></el-checkbox>
            <a @click="forgerPasswdVisible=true">忘记密码？</a>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="重置密码" :visible.sync="forgerPasswdVisible">
            <forget-passwd ref="forgetForm" @ok="forgerPasswdVisible = false"></forget-passwd>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelReset">取 消</el-button>
                <el-button type="primary" @click="handleReset">确 定</el-button>
            </div>
            </el-dialog>
    </section>
</template>

<script>
import ForgetPasswd from '@/components/ForgetPasswd.vue'
export default {
    data () {
        return {
            loginForm: {
                name: '',
                passwd: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            remember: false,
            forgerPasswdVisible: false
        };
    },
    components: {
        ForgetPasswd
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/home');
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancelReset() {
        this.$refs['forgetForm'].reset();
        this.forgerPasswdVisible = false;
      },
      handleReset() {
        this.$refs['forgetForm'].submitForm();
      }
    }
}
</script>

<style scoped>
    section {
        width: 400px;
        margin: 0 auto;
    }
</style>
