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
            checkorList: [],
            columns: [
                new Column('id', 'ID', 150, {visible: false}),
                new Column('wxId', '微信号', 150, {sortable: true}),
                new Column('wxName', '微信名', 150, {sortable: true}),
                // new Column('checkCount', '已检票数', 150, {editable: false}),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            emptyItem: {
                id: -1,
                wxId: null,
                wxName: null
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
            checkorAPI.del({id: item.id}).then(({data}) => {
                if (data.result) {
                    let index = this.checkorList.findIndex(el => el.id === item.id);
                    this.checkorList.splice(index, 1);
                }
            })       
        },
        handleAdd(item) {
            console.info('add the checkor: ', item)
            let showId = this.$route.params.id;
            item.showId = showId;
            checkorAPI.add(item).then(({data}) => {
                if (data.result) {
                    let index = this.ticketsList.length - 1;
                    this.checkorList.splice(index, 1, data.data);
                }
            })
        },
        handleEdit(item) {
            console.info('edit the checkor: ', item)
            checkorAPI.update(item).then(({data}) => {
                if (data.result) {
                    let index = this.checkorList.findIndex(el => el.id === item.id);
                    this.checkorList.splice(index, 1, data.data);
                }
            }) 
        },
        updateEmptyShowName (val) {
            this.emptyItem.showName = val;
        }
    },
    mounted () {
        let curShowId = this.$route.params.id;
        checkorAPI.ls({showId: curShowId}).then(({data}) => {
            if (data.result) {
                this.checkorList = data.data;
                if (this.checkorList.length === 0) {
                    this.emptyText = '无相关数据！'
                }
            }
        })
    },
}
</script>
