<template>
    <section>
        <datagrid :columns="columns" :records="displayList" :emptyText="emptyText"
         class="el-table_pagination" pagable @refresh="refreshShows" :total="total">
            <div class="td-ops" slot-scope="{item}" slot="ops" >
                <a @click="gotoEdit(item)">编辑</a>
                <a title="删除" name="bin" @click="delOne(item)">删除</a>
            </div>
            <div slot="poster" slot-scope="{item}">
                <img :src="item.poster" height="50px"/>
            </div>
        </datagrid>
        <div style="text-align:left; margin-top: 10px;">
            <el-button  icon="el-icon-plus" @click="beginAdd">添加</el-button>
        </div>
        <el-dialog title="添加演出" :visible.sync="addShowVisible">
            <base-info-form ref='baseinfo' mode="add"></base-info-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleAddCancel">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </section>
    
</template>
<script>
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
import showAPI from '@/api/show.js'
import BaseInfoForm from './BaseInfoForm.vue'
import Query from '@/common/beans/Query.js'
import Order from '@/common/beans/Order.js'
import methods from '@/common/methods.js'
import {
  mapActions
} from 'vuex'
export default {
    data () {
        return {
            displayList: [],
            columns: [
                new Column('id', 'ID', 150, {visible: false}),
                new Column('name', '演出名称', 150, {sortable: true}),
                new Column('poster', '海报', 150, {sortable: true}),
                new Column('city', '城市', 150),
                new Column('address', '演出地点', 150),
                new Column('startTime', '演出时间', 150),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            addShowVisible: false,
            query: new Query(new Order('startTime', Order.DIREC.DESC)),
            total: 0
        }
    },
    components: {
        Datagrid,
        BaseInfoForm
    },
    methods: {
        ...mapActions([
        'setCurShow'
        ]),
        initData () {
            let query = methods.deepCopy({}, this.query)
            showAPI.ls(query).then(({data}) => {
                this.displayList = data.data.records
                this.total = data.data.total
                if (this.displayList.length === 0) {
                    this.emptyText = '无相关数据'
                }
            })
        },
        refreshShows (query) {
            this.query = methods.deepCopy(this.query, query)
            this.initData()
        },
        gotoEdit (item) {
            console.info(item);
            this.setCurShow(item);
            this.$router.push({ name: 'ddetail', params: { id: item.id }});
        },
        delOne(item) {
            this.$confirm(`此操作将永久删除演出${item.name}, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                showAPI.del({id: item.id}).then(() => { 
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    let index = this.displayList.findIndex(el => el.id === item.id);
                    this.displayList.splice(index, 1);
                });
            });
        },
        handleAddCancel () {
            this.$refs['baseinfo'].reset();
            this.addShowVisible = false;
        },
        beginAdd () {
            this.addShowVisible = true;
        },
        handleAdd () {
            let newShow = this.$refs['baseinfo'].showForm;
            console.info('will add new show:', newShow);
            // Ajax
            showAPI.add(newShow).then(({data}) => {
                this.displayList.push(data.data)
            })
        }
    },
    mounted () {
        this.initData()
    }
}
</script>
