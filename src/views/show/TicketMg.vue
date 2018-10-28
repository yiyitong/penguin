<template>
    <section>
        <datagrid :columns="columns" :records="ticketsList"
                :empty-item="emptyTicket" editable @del="deleteTicketType" 
                @add="addTicketType" @edit="editTicketType">
        </datagrid>
    </section>
    
</template>
<script>
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
import ticketAPI from '@/api/ticket.js'
import {
  mapState
} from 'vuex'
export default {
    data () {
        return {
            ticketsList: [{
                id: 1,
                name: '早鸟',
                price: 100,
                restCount: 300,
                totalCount: 2000
            }],
            columns: [
                new Column('id', 'ID', 10, {visible: false}),
                new Column('name', '种类名称', 50),
                new Column('price', '票价', 50),
                new Column('restCount', '剩余票量', 50, {editable: false}),
                new Column('totalCount', '总票量', 50),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            emptyTicket: {
                id: -1,
                name: null,
                price: 0,
                restCount: 0,
                totalCount: 0,
                showName: ''
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
    methods: {
        deleteTicketType(item) {
            console.info('del the ticket type: ', item)
            ticketAPI.del({id: item.id}).then(({data}) => {
                if (data.result) {
                   let index = this.ticketsList.findIndex(el => el.id === item.id);
                    this.ticketsList.splice(index, 1); 
                }
            }) 
        },
        addTicketType(item) {
            console.info('add the ticket type: ', item)
            let showId = this.$route.params.id
            item.showId = showId
            ticketAPI.add(item).then(({data}) => {
                if (data.result) {
                    this.$message.success("添加成功！") 
                    let index = this.ticketsList.length - 1;
                    this.ticketsList.splice(index, 1, data.data);
                }
            })
            this.ticketsList.push(item)
        },
        editTicketType(item) {
            console.info('edit the ticket type: ', item)
            ticketAPI.update(item).then(({data}) => {
                if (data.result) {
                    let index = this.ticketsList.findIndex(el => el.id === item.id);
                    this.ticketsList.splice(index, 1, item);
                }
            }) 
        }
    },
    mounted () {
        let curShowId = this.$route.params.id;
        ticketAPI.ls({showId: curShowId}).then(({data}) => {
            if (data.result) {
                this.ticketsList = data.data;
                if (this.ticketsList.length === 0) {
                    this.emptyText = '无相关数据！'
                }
            }
        })
    },
}
</script>
