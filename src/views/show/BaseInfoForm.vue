<template>
    <el-form :model="showForm" :rules="rules" label-width="100px" ref="showForm">
        <el-form-item label="名称" prop="name">
            <el-input v-model="showForm.name"></el-input>
        </el-form-item>
        <el-form-item label="海报" prop="poster">
            <div v-if="showForm.poster" >
                <img :src="showForm.poster" width="200px"/>
                <span class="el-icon-circle-close" @click="showForm.poster = ''"></span>
            </div>
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
            <el-date-picker type="dates" v-model="showForm.startTime" value-format="timestamp"
                placeholder="选择一个或多个日期" style="width: 100%;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="场次">
            <el-col :span="6">
                <el-time-select v-model="period1" :picker-options="timePickerOption"
                    placeholder="选择时间" style="width: 100%;"></el-time-select>
            </el-col>
            <el-col :span="2"><span>|</span> </el-col>
            <el-col :span="6">
                <el-time-select v-model="period2" :picker-options="timePickerOption"
                    placeholder="选择时间" style="width: 100%;"></el-time-select>
            </el-col>
             <el-col :span="2"><span>|</span> </el-col>
            <el-col :span="6">
                <el-time-select v-model="period3" :picker-options="timePickerOption"
                    placeholder="选择时间" style="width: 100%;"></el-time-select>
            </el-col>
        </el-form-item>
    </el-form>
</template>
<script>
import {TimeSelect, DatePicker} from 'element-ui'
import Datagrid from '@/components/Datagrid.vue'
import Upload from '@/components/Upload.vue'
export default {
    data () {
        return {
            period1: '',
            period2: '',
            period3: '',
            showForm: {
                name: '',
                poster: '',
                startTime: '',
                address: '',
                city: '',
                period: ''
            },
            cities: ['成都', '北京', '上海'],
            rules: {},
            emptyTicket: {
                id: -1,
                name: null,
                dailyPrice: null,
                allPrice: null
            },
            posterVisible: false,
            timePickerOption: {
                start: '00:00',
                step: '00:15',
                end: '23:45'
            }
        }
    },
    components: {
        ElTimeSelect: TimeSelect,
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
    watch: {
        'period1': 'calcPeriods',
        'period2': 'calcPeriods',
        'period3': 'calcPeriods',
        item (val) {
            this.showForm = Object.assign(this.showForm, val)
        },
        'item.period': 'setPeriod'
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
        },
        calcPeriods () {
            let periods = []
            if (this.period1) {
                periods.push(this.period1)
            }
            if (this.period2) {
                periods.push(this.period2)
            }
            if (this.period3) {
                periods.push(this.period3)
            }
            this.showForm.period = periods.length > 0 ? periods.join(',') : ''
        },
        setPeriod (val) {
            if (val) {
                let periods = val.split(',')
                if (periods.length > 0) {
                    this.period1 = periods[0]
                    this.period2 = periods[1] || ''
                    this.period3 = periods[2] || ''
                }
            }
        }
    },
    mounted () {
        console.info('baseinfofrom mouted。。。。', this.item)
        this.showForm = Object.assign(this.showForm, this.item)
        this.setPeriod(this.item.period);
    }
}
</script>
<style>
.el-select {
    width: 100%;
}
</style>
