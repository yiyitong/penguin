<template>
    <section style="height: calc(100% - 70px); position: relative;">
        <datagrid :columns="columns" :records="adminList"
         class="el-table_pagination" editable  @del="handleDel" 
                @add="handleAdd" @edit="handleEdit" :empty-item="emptyItem">
            <div  slot-scope="{item}" slot="role" >
                <el-select v-model="item.role" v-if="item.editing" placeholder="请选择">
                    <el-option
                    v-for="(value, key) in authLevel"
                    :key="key"
                    :label="value"
                    :value="key">
                    </el-option>
                </el-select>
                <span v-else>{{authLevel[item.role]}}</span>
            </div>
            <div  slot="password" slot-scope="{item}"> 
                <el-input type="password" v-model="item.password" v-if="item.editing"/>
                <span v-else>*******</span>
            </div>
        </datagrid>
    </section>
    
</template>
<script>
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
import adminAPI from '@/api/admin.js'
import consts from '@/common/Consts.js'
import {
  mapState
} from 'vuex'
export default {
    data () {
        return {
            adminList: [{
                id: 1,
                name: 'lx',
                password: '12345',
                role: 'SUPER'
            }],
            columns: [
                new Column('id', 'ID', 150, {visible: false}),
                new Column('name', '名称', 150, {sortable: true}),
                new Column('password', '密码', 150),
                new Column('role', '管理员类型', 150),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            emptyItem: {
                id: -1,
                name: null,
                passwd: null,
                auth: null
            },
            authLevel: consts.ADMIN_ANTH_TYPE
        }
    },
    computed: {
        ...mapState({
            curShow: state => state.shows.curShow
        })
    },
    components: {
        Datagrid
    },
    methods: {
        initData () {
            adminAPI.ls().then(({data}) => {
                console.info('admin ls:', data)
                if (data.result) {
                    this.adminList = data.data
                    if (this.adminList.length === 0) {
                        this.emptyText = '无相关数据'
                    }
                } else {
                    this.emptyText = '无相关数据'
                }
            })
        },
        handleDel(item) {
            console.info('del the checkor: ', item)
            this.$confirm(`此操作将永久删除管理员-${item.name}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                adminAPI.del({id: item.id}).then(() => {
                    let index = this.adminList.findIndex(el => el.id === item.id);
                    this.adminList.splice(index, 1);
                });
            });
                  
        },
        handleAdd(item) {
            console.info('add the checkor: ', item)
            adminAPI.add(item).then(({data}) => {
                let index = this.adminList.length;
                this.adminList.splice(index, 1, data.data);
            })
        },
        handleEdit(item) {
            console.info('edit the checkor: ', item)
            adminAPI.update(item).then(() => {
                let index = this.adminList.findIndex(el => el.id === item.id);
                this.adminList.splice(index, 1, item);
            }) 
        },
        updateEmptyShowName (val) {
            this.emptyItem.showName = val;
        }
    },
    mounted () {
        this.initData()
    }
}
</script>
<style>
.datagrid-viewer {
    height: calc(100% - 60px);
}
.el-table {
    height: 100%;
}
.el-table__body-wrapper {
    height: calc(100% - 60px);
    overflow-y: auto;
}
</style>
