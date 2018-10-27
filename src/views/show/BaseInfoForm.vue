<template>
    <el-form :model="showForm" :rules="rules" label-width="100px" ref="showForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="showForm.name"></el-input>
        </el-form-item>
        <el-form-item label="海报" prop="poster">
            <img :src="showForm.poster" v-if="showForm.poster" width="200px"/>
            <upload @finish="handlePicUploaded" v-else>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </upload>
        </el-form-item>
        <el-form-item label="城市" prop="city">
            <el-select v-model="showForm.city" filterable placeholder="请选择">
            <el-option
                v-for="item in cities"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
            <el-input v-model="showForm.address"></el-input>
        </el-form-item>
        <el-form-item label="演出日期">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="开始日期" 
                v-model="showForm.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-date-picker type="date" placeholder="结束日期" 
                v-model="showForm.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
    </el-form>
</template>
<script>
import Column from '@/common/beans/Column' 
import {TimePicker, DatePicker} from 'element-ui'
import Datagrid from '@/components/Datagrid.vue'
import Upload from '@/components/Upload.vue'
export default {
    data () {
        return {
            showForm: {
                name: '中秋晚会',
                poster: '',
                startTime: '',
                endTime: '',
                address: '',
                city: ''
            },
            cities: ['成都', '北京', '上海'],
            rules: {},
            emptyTicket: {
                id: -1,
                name: null,
                dailyPrice: null,
                allPrice: null
            },
            posterVisible: false
        }
    },
    components: {
        ElTimePicker: TimePicker,
        ElDatePicker: DatePicker,
        Datagrid,
        Upload
    },
    props: ['item', 'mode'],
    computed: {
        posterUrl () {
            let url = this.uploadedFiles.length > 0 ? this.uploadedFiles[0].url : '';
            this.showForm.posterURL = url;
            return url;
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.uploadedFiles = []
        },
        handlePicUploaded(res) {
            this.showForm.poster = 'http://' + res.Location;
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
<style>
.el-select {
    width: 100%;
}
</style>
