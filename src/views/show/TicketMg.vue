<template>
    <section>
        <datagrid :columns="columns" :records="ticketsList"
                :empty-item="emptyTicket" editable @del="deleteTicketType" 
                @add="addTicketType" @edit="editTicketType">
            <div  slot="startTime" slot-scope="{item}"> 
                <el-date-picker type="date" v-model="item.startTime" value-format="timestamp" v-if="item.editing"
                    placeholder="选择一个日期" style="width: 100%;">
                </el-date-picker>
                <span v-else>{{formatDate(item.startTime)}}</span>
            </div>
            <div  slot="period" slot-scope="{item}"> 
                <el-time-select v-model="item.period" :picker-options="timePickerOption"
                    placeholder="选择时间" style="width: 100%;"  v-if="item.editing"></el-time-select>
                <span v-else>{{item.period}}</span>
            </div>
            <div  slot="price" slot-scope="{item}"> 
                <el-input
                    placeholder="请输入票价"
                    v-model="item.price"
                    clearable v-if="item.editing">
                    </el-input>
                <span v-else>￥{{item.price}}</span>
            </div>
        </datagrid>
    </section>
    
</template>
<script>
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
import ticketAPI from '@/api/ticket.js'
import {TimeSelect, DatePicker} from 'element-ui'
import methods from '@/common/methods.js'
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
                new Column('name', '种类名称', 100),
                new Column('price', '票价', 50),
                new Column('restCount', '剩余票量', 50),
                new Column('totalCount', '总票量', 50),
                new Column('startTime', '演出日期', 100),
                new Column('period', '场次', 100),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            emptyTicket: {
                id: -1,
                name: null,
                price: 0,
                restCount: 0,
                startTime: '',
                period: '',
                totalCount: 0,
                showName: ''
            },
            timePickerOption: {
                start: '00:00',
                step: '00:15',
                end: '23:45'
            }
        }
    },
    computed: {
        ...mapState({
        curShow: state => state.shows.curShow
        })
    },
    components: {
        Datagrid,
        ElTimeSelect: TimeSelect,
        ElDatePicker: DatePicker
    },
    methods: {
        calcPrice (val) {
            return val / 100;
        },
        formatDate (miliSeconds = '') {
            let dates = (miliSeconds + '').split(',').map(el => methods.formatDate(el))
            return dates.join(',')
        },
        deleteTicketType(item) {
            console.info('del the ticket type: ', item)
            this.$confirm(`此操作将永久删除演出票-${item.name}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ticketAPI.del({id: item.id}).then(({data}) => {
                    if (data.result) {
                    let index = this.ticketsList.findIndex(el => el.id === item.id);
                        this.ticketsList.splice(index, 1); 
                    }
                });
            });
             
        },
        addTicketType(item) {
            console.info('add the ticket type: ', item)
            let showId = this.$route.params.id;
            let patams = Object.assign({}, item)
            patams.showId = showId
            patams.price = patams.price * 100;
            ticketAPI.add(patams).then(({data}) => {
                if (data.result) {
                    this.$message.success("添加成功！") 
                    let index = this.ticketsList.length;
                    data.data.price = data.data.price / 100;
                    this.ticketsList.splice(index, 1, data.data);
                }
            })
        },
        editTicketType(item) {
            console.info('edit the ticket type: ', item)
            let showId = this.$route.params.id;
            let patams = Object.assign({}, item)
            patams.showId = parseInt(showId)
            patams.price = patams.price * 100;
            ticketAPI.update(patams).then(({data}) => {
                if (data.result) {
                    let index = this.ticketsList.findIndex(el => el.id === item.id);
                    patams.price = patams.price / 100;
                    console.info(patams, this.ticketsList[index])
                    this.ticketsList.splice(index, 1, patams);
                }
            }) 
        }
    },
    mounted () {
        let curShowId = this.$route.params.id;
        ticketAPI.ls({showId: curShowId}).then(({data}) => {
            if (data.result) {
                data.data.forEach(el => el.price = el.price / 100);
                this.ticketsList = data.data;
                if (this.ticketsList.length === 0) {
                    this.emptyText = '无相关数据！'
                }
            }
        })
    },
}
</script>
