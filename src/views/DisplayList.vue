<template>
    <section>
        <h2>演出</h2>
        <datagrid :columns="columns" :records="displayList" :emptyText="emptyText"
         class="el-table_pagination">
            <div class="td-ops" slot-scope="{item}" slot="ops" >
            <a title="编辑" name="edit" @click="editDetail(item)">编辑</a>
            <a title="删除" name="bin" @click="delOne(item)">删除</a>
            </div>
        </datagrid>
    </section>
    
</template>
<script>
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
export default {
    data () {
        return {
            displayList: [{name: '中秋晚会'}],
            columns: [
                new Column('name', '演出名称', 150, true),
                new Column('addresses', '演出地点', 150),
                new Column('checkers', '验票员', 150),
                new Column('', '票量', 250),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...'
        }
    },
    components: {
        Datagrid
    },
    methods: {
        editDetail (item) {
            console.info(item)
        }
    }
}
</script>
