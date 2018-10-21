<template>
    <section>
        <datagrid :columns="columns" :records="displayList" :emptyText="emptyText"
         class="el-table_pagination" pagable>
            <div class="td-ops" slot-scope="{item}" slot="ops" >
                <a @click="gotoEdit(item)">编辑</a>
                <a title="删除" name="bin" @click="delOne(item)">删除</a>
            </div>
        </datagrid>
        <div style="text-align:left; margin-top: 10px;">
            <el-button  icon="el-icon-plus" @click="beginAdd">添加</el-button>
        </div>
        <el-dialog title="添加演出" :visible.sync="addShowVisible">
            <base-info-form ref='baseinfo'></base-info-form>
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
import {
  mapActions
} from 'vuex'
export default {
    data () {
        return {
            displayList: [{id: 1, name: '中秋晚会', adresses: '成都,上海,北京',
            checkers: ['person1'], tickets: {
                normal: 200, level1: 300}
            }],
            columns: [
                new Column('id', 'ID', 150, {visible: false}),
                new Column('name', '演出名称', 150, {sortable: true}),
                new Column('poster', '海报', 150, {sortable: true}),
                new Column('addresses', '演出地点', 150),
                new Column('time', '演出时间', 150),
                new Column('checkers', '验票员', 150),
                new Column('tickets', '票量', 250),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            addShowVisible: false
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
                showAPI.del(item.id).then(() => { 
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
            showAPI.add(newShow).then((res) => {
                this.displayList.push(res)
            })
        }
    }
}
</script>
