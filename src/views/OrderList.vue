<template>
    <section>
        <div style="text-align: left; margin-bottom: 15px;">
            <el-radio-group v-model="curFilterType">
                <el-radio-button v-for="(value, key) in filterTypes"
                    :key="key" :label="key">{{value}}</el-radio-button>
            </el-radio-group>
        </div>
        <datagrid :columns="columns" :records="orderList" :emptyText="emptyText"
            class="el-table_pagination" pagable select-all>
            <div  slot-scope="{item}" slot="status" >
                <span>{{filterTypes[item.status]}}</span>
            </div>
        </datagrid>
    </section>
</template>

<script>
import {RadioGroup, RadioButton} from 'element-ui'
import Column from '@/common/beans/Column' 
import Datagrid from '@/components/Datagrid.vue'
import consts from '@/common/Consts.js'
export default {
    data () {
        return {
            orderList: [
                {id: 1, weName: 'yiyitong', price: 200, showName: '中秋晚会', status: '1'}
            ],
            columns: [
                new Column('id', 'ID', 150, {visible: false}),
                new Column('weName', '用户微信名', 150, {sortable: true}),
                new Column('showName', '演出名称', 150, {sortable: true}),
                new Column('price', '订单金额', 150),
                new Column('status', '订单状态', 150, {sortable: true})
            ],
            emptyText: '正在加载数据...',
            filterTypes: consts.ORDER_FILTER_TYPE,
            curFilterType: '0'
        }
    },
    components: {
        ElRadioGroup: RadioGroup,
        ElRadioButton: RadioButton,
        Datagrid
    }
}
</script>

