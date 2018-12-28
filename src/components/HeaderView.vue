<template>
  <header>
   <h1>辣浪电音小程序管理后台
   </h1>
     <el-dropdown trigger="click" menu-align="end" id="dropdownMenu1" >
          <span :title="username" id="user_name" class="user-info-wrap">
            <span class="user-name">{{username}}</span>
            <span class="el-icon-caret-bottom"></span>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdownMenu1-ul" style="margin: 0;">
            <!-- <el-dropdown-item class="user-header">
              <a role="menuitem" tabindex="-1" @click="showDialog">密码修改</a>
            </el-dropdown-item> -->
            <el-dropdown-item>
              <a id="logoutbtn" role="menuitem" tabindex="-1" @click="userLogout">退出</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> 
  </header>
</template>
<script>
import { Dropdown, DropdownMenu, DropdownItem, Tooltip } from 'element-ui'
import userAPI from '@/api/user.js'
import storageAPI from '@/common/storageAPI'
// import userPwdModal from './userPwdModal'
export default {
  data () {
    return {
      ws: {},
      username: 'admin',
      userId: -1
    }
  },
  components: {
    elDropdown: Dropdown,
    elDropdownMenu: DropdownMenu,
    elDropdownItem: DropdownItem,
    elTooltip: Tooltip
  },
  methods: {
    showDialog () {

    },
    userLogout () {
      userAPI.logout().then(({data}) => {
        if (data.result) {
          this.$router.push('/');
        }
      })
    }
  },
  mounted () {
    this.username = storageAPI.getValueFromStorage('username');
  }
}
</script>

<style scoped>
  header {
    height: 50px;
    background-color: #3c8dbc;
    color: #fff;
    position: relative;
  }
  h1 {
    margin: 0;
    font-size: 20px;
    line-height: 50px;
    text-align: left;
    padding-left: 20px;
  }
  .user-info-wrap {
    color:#fff;
    background: url('../assets/user.png') left no-repeat;
    display: inline-block;
    padding-left: 35px;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
  }
 .user-info-wrap>span {
    display: inline-block;
  }
  .el-dropdown {
    position: absolute;
    right: 15px;
    bottom: 0;
  }
</style>