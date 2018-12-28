<template>
    <el-form slot="body" ref="form" :model="userinfo" :rules="rules" label-width="100px">
      <div class="user-header">
          <img src="../../assets/user.png">
      </div>
        <el-form-item label="原密码" prop="oldPwd">
        <el-input type="password" placeholder="请输入原密码" v-model.trim="userinfo.oldPwd"></el-input>
      </el-form-item>            
      <el-form-item label="用户密码" prop="password">
        <el-input type="password" autosize placeholder="新密码为8 到 32个字符" v-model.trim="userinfo.password"></el-input>
      </el-form-item>
    </el-form>
</template>
<script>
import { userApi } from '@/api/user.js'
export default {
  components: {
    modal
  },
  data () {
    return {
      show: false,
      userinfo: {
        id: null,
        oldPwd: '',
        password: ''
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.userinfo.id = localStorage.getItem('id');
      }
    }
  },
  methods: {
    submitForm() {
        this.$refs['resetForm'].validate((valid) => {
            if (valid) {
                this.modPasswd();
            } else {
                return false;
            }
        });
    },
    modPasswd () {
      userApi.updateUser({id: this.userinfo.id, password: this.userinfo.password}).then(({data}) => {
        this.$alert('修改密码成功,请重新登陆', '', {
          confirmButtonText: '确定',
          type: 'info'
        })
        this.timeOutId = setTimeout(() => {
          this.$emit('change', data)
          this.resetForm()
          this.hideConfig()
        }, 3000)
      });
    },
    resetForm () {
      this.$refs.form.resetFields()
      this.user.id = null
      this.user.name = ''
      this.user.password = ''
      this.oldPwd = ''
    }
  }
}
</script>
<style scoped>
.el-dialog--small {
  width: 30%;
}
</style>