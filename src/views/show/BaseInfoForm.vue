<template>
    <el-form :model="showForm" :rules="rules" label-width="100px" ref="showForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="showForm.name"></el-input>
        </el-form-item>
        <el-form-item label="海报" prop="posterURL">
            <el-upload class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="uploadedFiles"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="演出日期">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="开始日期" 
                v-model="showForm.startDate" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-date-picker type="date" placeholder="结束日期" 
                v-model="showForm.endDate" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="演出票价" >
            <datagrid :columns="columns" :records="showForm.ticketsList"
                :empty-item="emptyTicket" editable @del="deleteTicketType" 
                @add="addTicketType" @edit="editTicketType">
            </datagrid>
        </el-form-item>
    </el-form>
</template>
<script>
import Column from '@/common/beans/Column' 
import {TimePicker, DatePicker, Upload} from 'element-ui'
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
            },
            posterVisible: false,
            uploadedFiles: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
        }
    },
    components: {
        ElTimePicker: TimePicker,
        ElDatePicker: DatePicker,
        Datagrid,
        ElUpload: Upload
    },
    props: ['item'],
    computed: {
        posterUrl () {
            let url = this.uploadedFiles.length > 0 ? this.uploadedFiles[0].url : '';
            this.showForm.posterURL = url;
            return url;
        }
    },
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
        },
        handlePreview(file) {
            console.info(file)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.uploadedFiles = []
        },
        reset() {
            this.$refs['showForm'].resetFields();
            this.showForm.ticketsList = [];
            this.uploadedFiles = []
            console.info('reset baseinfoform:', this.showForm)
        }
    },
    mounted () {
        console.info('baseinfofrom mouted。。。。')
        this.showForm = Object.assign(this.showForm, this.item)
    }
}
</script>
