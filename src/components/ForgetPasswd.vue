<template>
<el-form :model="resetForm" :rules="rules" ref="resetForm" label-width="100px">
    <el-form-item label="用户名" prop="name">
        <el-input v-model="resetForm.name"></el-input>
    </el-form-item>
    <el-form-item v-if="superAdmin" label="邮箱地址" prop="email">
        <el-input type="email" v-model="resetForm.email"></el-input>
    </el-form-item>
    <el-form-item v-else prop="email">
        点击“开始重置”将通知超级管理员重设您的密码，请与超级管理员联系获知新密码。
    </el-form-item>
    <el-form-item>
        <div class="form-error"> {{error}}</div>
    </el-form-item>
</el-form>
</template>
<script>
export default {
    data() {
        return {
            resetForm: {
                name: '',
                email: ''
            },
            rules: {
                name: [{
                    required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passwd: [{
                    required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            superAdmin: true,
            error: ''
        };
    },
    methods: {
        submitForm() {
            this.$refs['resetForm'].validate((valid) => {
                if (valid) {
                    this.reserPasswd();
                } else {
                    return false;
                }
            });
        },
        reserPasswd() {
            this.error = '';
            this.$axios.post('sandy/user/reset', this.resetForm).then((data) => {
                this.$emit('ok', data);
            }).catch((err) => {this.error = err;})
        },
        reset() {
            this.$refs['resetForm'].resetFields();
            this.error = '';
        }
    }
}
</script>