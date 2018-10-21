<template>
  <header>
   <h1>辣浪电音小程序管理后台
   </h1>
         
     <!-- <el-dropdown trigger="click" menu-align="end" id="dropdownMenu1">
          <span :title="username" id="user_name" class="user-info-wrap">
            <i class="iconfont icon-user"></i>
            <span class="user-name">{{username}}</span>
            <span class="iconfont icon-dropdown"></span>
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdownMenu1-ul">
            <el-dropdown-item class="user-header">
              <span class="img-circle" alt="User Image"></span>
              <p><img src="../../assets/who.png"></p>
              <p id="username" class="ng-binding">{{username}}</p>
            </el-dropdown-item>
            <el-dropdown-item><a role="menuitem" tabindex="-1" :href="userInfoUrl">用户信息</a></el-dropdown-item>
            <el-dropdown-item><a class="el-button" role="menuitem" tabindex="-1" href="javaScript:void (0);" @click="showDialog">密码修改</a></el-dropdown-item>
            <el-dropdown-item><a class="el-button" id="logoutbtn" role="menuitem" tabindex="-1" @click="userLogout">退出</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <!-- <userPwdModal ref="userpwddialog" @change="userLogout"></userPwdModal> -->
  </header>
</template>
<script>
import { Dropdown, DropdownMenu, DropdownItem, Tooltip } from 'element-ui'

// import userPwdModal from './userPwdModal'
export default {
  data () {
    return {
      ws: {},
      username: 'admin'
    }
  },
  components: {
    elDropdown: Dropdown,
    elDropdownMenu: DropdownMenu,
    elDropdownItem: DropdownItem,
    elTooltip: Tooltip
  }
}
</script>

<style scoped>
  header {
    height: 50px;
    background-color: #3c8dbc;
    color: #fff;
  }
  h1 {
    margin: 0;
    font-size: 20px;
    line-height: 50px;
    text-align: left;
    padding-left: 20px;
  }
</style>