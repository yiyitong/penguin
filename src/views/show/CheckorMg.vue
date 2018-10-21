<template>
    <section>
        <datagrid :columns="columns" :records="checkorList"
         class="el-table_pagination" editable  @del="handleDel" 
                @add="handleAdd" @edit="handleEdit" :empty-item="emptyItem">
        </datagrid>
    </section>
    
</template>
<script>
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
import checkorAPI from '@/api/checkor.js'
import {
  mapState
} from 'vuex'
export default {
    data () {
        return {
            checkorList: [{id: 1, weID: 'yiyitong', weName: 'qqian',
            showName: '中秋晚会', checkCount: 0
            }],
            columns: [
                new Column('id', 'ID', 150, {visible: false}),
                new Column('weID', '微信号', 150, {sortable: true}),
                new Column('weName', '微信名', 150, {sortable: true}),
                new Column('showName', '演出', 150, {editable: false}),
                new Column('checkCount', '已检票数', 150, {editable: false}),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            emptyItem: {
                id: -1,
                weID: null,
                weName: null,
                showName: '',
                checkCount: 0
            }
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
    watch : {
        'curShow.name': 'updateEmptyShowName'
    },
    methods: {
        handleDel(item) {
            console.info('del the checkor: ', item)
            checkorAPI.del(item.id).then((res) => {
                let index = this.checkorList.findIndex(el => el.id === item.id);
                this.checkorList.splice(index, 1);
            })       
        },
        handleAdd(item) {
            console.info('add the checkor: ', item)
            checkorAPI.add(item).then((res) => {
                this.checkorList.push(res) 
            })
        },
        handleEdit(item) {
            console.info('edit the checkor: ', item)
            checkorAPI.update(item).then((res) => {
                let index = this.checkorList.findIndex(el => el.id === item.id);
                this.checkorList.splice(index, 1, item);
            }) 
        },
        updateEmptyShowName (val) {
            this.emptyItem.showName = val;
        }
    },
    mounted () {
        this.emptyItem.showName = this.curShow.name;
    }
}
</script>
