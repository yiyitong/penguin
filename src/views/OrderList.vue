<template>
    <section style="height: calc(100% - 70px); position: relative; overflow-y: auto;">
        <div style="text-align: left; ">
            <el-radio-group v-model="curFilterType" style="margin-right: 30px;">
                <el-radio-button v-for="(value, key) in filterTypes"
                    :key="key" :label="key">{{value}}</el-radio-button>
            </el-radio-group>
            <fieldset style="margin:20px 0;">
                <legend>过滤条件：</legend>
                <el-date-picker
                    v-model="times" style="margin-right: 20px;" 
                    type="daterange"
                    align="right"
                    unlink-panels value-format="timestamp"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                </el-date-picker>
                <el-select v-model="showId" 
                style="width: 250px; margin-right: 20px;" clearable label="演出名：" filterable placeholder="请输入或选择演出名称">
                    <el-option
                    v-for="item in shows"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-input v-model="wxName" placeholder="请输入微信名" 
                    style="width: 250px; margin-right:20px;" clearable></el-input>
                <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
            </fieldset>
        </div>
        <div style="position: relative;">
            <div style="height:  30px; line-height: 30px;text-align:left; margin-bottom: 20px;">
                总收入：￥{{totalFee/100}}</div>
            <datagrid :columns="columns" :records="orderList" :emptyText="emptyText"
                class="el-table_pagination" pagable select-all :total="total" @refresh="initData">
                <div  slot-scope="{item}" slot="status" >
                    <span>{{filterTypes[item.status]}}</span>
                </div>
                <div slot-scope="{item}" slot="createTime" >
                    {{formatDate(item.createTime)}}
                </div>
                <div slot-scope="{item}" slot="totalFee" >
                    ￥{{item.totalFee / 100}}
                </div>
                <div class="td-ops" slot-scope="{item}" slot="ops" >
                    <a v-if="item.status === 'Paid'" @click="check(item)">核销</a>
                    <!-- <a title="删除" name="bin" @click="delOne(item)">删除</a> -->
                </div>
            </datagrid>
        </div>
    </section>
</template>

<script>
import {RadioGroup, RadioButton, DatePicker} from 'element-ui'
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
import consts from '@/common/Consts.js'
import Query from '@/common/beans/Query.js'
import Order from '@/common/beans/Order.js'
import Condition from '@/common/beans/Condition.js'
import orderAPI from '@/api/order.js'
import showAPI from '@/api/show.js'
import methods from '@/common/methods.js'

export default {
    data () {
        return {
            orderList: [
            ],
            columns: [
                new Column('id', 'ID', 50),
                new Column('wxName', '用户微信名', 100),
                new Column('showName', '演出名称', 150),
                new Column('totalFee', '订单金额', 50),
                new Column('createTime', '创建时间', 60),
                new Column('status', '订单状态', 60, {sortable: true}),
                new Column('ops', '操作', 80)
            ],
            emptyText: '正在加载数据...',
            filterTypes: consts.ORDER_FILTER_TYPE,
            curFilterType: 'All',
            times: [],
            total: 0,
            totalFee: 0,
            shows: [],
            showId: null,
            wxName: '',
            query: new Query(new Order('createTime', Order.DIREC.DESC)),
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    components: {
        ElRadioGroup: RadioGroup,
        ElRadioButton: RadioButton,
        ElDatePicker: DatePicker,
        Datagrid
    },
    watch: {
        'curFilterType': 'initData'
    },
    methods: {
        initData () {
            this.orderList = []
            let curFilterStatus = this.curFilterType === 'All' ? '' : this.curFilterType;
            this.query.setCondition(new Condition('status', 'equal', curFilterStatus));
            if (this.times && this.times.length === 2) {
                this.query.time = this.times.map(el => el = Math.floor(el/1000)).join(',');
            } else {
                this.query.time = ''
            }
            this.query.showId = this.showId;
            this.query.wxName = this.wxName;
            console.info(this.query)
            let query = JSON.parse(JSON.stringify(this.query))
            // let query = methods.deepCopy({}, this.query);
            orderAPI.ls(query).then(({data}) => {
                if (data.result) {
                    this.orderList = data.data.records; 
                    this.total = data.data.total;
                    if (this.total === 0) {
                        this.emptyText = '无相关数据';
                    }
                    this.totalFee = data.data.totalFee;
                } else {
                    this.emptyText = '获取数据失败！';
                }
            }, () => {
                this.emptyText = '获取数据失败！';
            });
        },
        formatDate (miliSeconds = '') {
            let dates = (miliSeconds + '').split(',').map(el => methods.formatDate(el))
            return dates.join(',')
        },
        lsShowNames () {
            showAPI.lsNames({showName: this.showName}).then(({data}) => {
                if (data.result) {
                    this.shows = data.data;
                }
            })
        },
        doSearch () {
            this.initData();
        },
        check (item) {
            this.$confirm(`此操作将对订单【${item.id}，${item.wxName}，${item.showName}，${item.totalFee}】进行核销, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                orderAPI.check({id: item.id}).then(({data}) => {
                    if (data.result) {
                        this.$message.success("核销成功！")
                        let curOrder = this.orderList.find(el => item.id === el.id)
                        if (curOrder) {
                            curOrder.status = 'Used';
                        }
                    }
                })
            })
            
        },
        delOne (item) {
            this.$confirm(`此操作将永久删除订单-${item.id}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                orderAPI.del({ids: [item.id]}).then(({data}) => {
                    if (data.result) {
                        this.$message.success("删除成功！")
                        this.initData();
                    }
                })
            });
        }
    },
    mounted () {
        this.lsShowNames();
        this.initData();
    }
}
</script>
<style>
 .el-pagination {
    position: absolute;
    top: 0;
    right: 0;
}
.datagrid-viewer {
    height: calc(100% - 120px);
}
.el-table {
    height: 100%;
}
.el-table__body-wrapper {
    height: calc(100% - 120px);
    overflow-y: auto;
}
</style>

