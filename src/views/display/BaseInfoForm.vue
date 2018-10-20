<template>
    <el-form :model="showForm" :rules="rules" label-width="100px" ref="showForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="showForm.name"></el-input>
        </el-form-item>
        <el-form-item label="海报" prop="posterURL">
            <el-input v-model="showForm.posterURL"></el-input>
        </el-form-item>
        <el-form-item label="演出日期">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="开始日期" 
                v-model="showForm.startDate" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker type="date" placeholder="结束日期" 
                v-model="showForm.endDate" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="演出票价" >
            <datagrid :columns="columns" :records="showForm.ticketsList"
                :empty-item="emptyTicket" editable @del="deleteTicketType" 
                @add="addTicketType" @edit="editTicketType">
            </datagrid>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Column from '@/common/beans/Column' 
import {TimePicker, DatePicker} from 'element-ui'
import Datagrid from '@/components/Datagrid.vue'
export default {
    data () {
        return {
            showForm: {
                name: '中秋晚会',
                posterURL: '',
                startDate: '',
                endDate: '',
                ticketsList: [{
                    id: 1,
                    name: '早鸟',
                    dailyPrice: 100,
                    allPrice: 300
                }]
            },
            columns: [
                new Column('id', 'ID', 10, {visible: false}),
                new Column('name', '种类名称', 50),
                new Column('dailyPrice', '单日票票价', 50),
                new Column('allPrice', '通票票价', 50),
                new Column('ops', '操作', 80)
            ],
            rules: {},
            emptyTicket: {
                id: -1,
                name: null,
                dailyPrice: null,
                allPrice: null
            }
        }
    },
    components: {
        ElTimePicker: TimePicker,
        ElDatePicker: DatePicker,
        Datagrid
    },
    props: ['item'],
    methods: {
        deleteTicketType(item) {
            console.info('del the ticket type: ', item)
            let index = this.showForm.ticketsList.findIndex(el => el.id === item.id);
            this.showForm.ticketsList.splice(index, 1);
        },
        addTicketType(item) {
            console.info('add the ticket type: ', item)
            this.showForm.ticketsList.push(item)
        },
        editTicketType(item) {
            console.info('edit the ticket type: ', item)
            let index = this.showForm.ticketsList.findIndex(el => el.id === item.id);
            this.showForm.ticketsList.splice(index, 1, item)
        }
    }
}
</script>
