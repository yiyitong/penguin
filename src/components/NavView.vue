<template>
<div>
<nav>
<ul class="nav nav-menu">
<li v-for="item in routes" :title="item.title" :key="item.name">
<router-link :to="'/' + item.name">
<i class="iconfont" :class="createClass(item.name)"></i>{{item.title}}
</router-link>
</li>
</ul>
</nav>
</div>
</template>
<script>
export default {
    data () {
        return {
            routes: [{
                title: '演出管理',
                name: 'display'
            }, {
                title: '订单管理',
                name: 'order'
            }, {
                title: '管理员管理',
                name: 'user'
            }]
        }
    },
    methods: {
        createClass (name) {
            return 'icon-' + name
        }
    }
}
</script>

<style scoped>
/*左侧界面样式 begin*/

.nav {
    margin: 0;
    padding: 0;
}
.nav li {
    margin: 0;
    padding: 0;
    position: relative;
    display: block;
    height: 44px;
}
.nav li a {
    padding: 8px;
    margin: 0;
    position: relative;
    display: block;
    text-decoration: none;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    color: #333;
    text-align: left;
    padding: 15px;
}
.nav li a:hover {
    background: #eee;
}
.nav li a.router-link-exact-active {
    background: #eee;
}
/*左侧界面样式 end*/


</style>