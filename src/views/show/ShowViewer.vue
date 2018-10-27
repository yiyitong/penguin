<template>
    <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
            <el-alert type="info" title="提示："
                close-text="知道了">
                演出的基本信息：海报、名称、票据
            </el-alert>
            <base-info-form :item="curShow" ref="baseinfo"></base-info-form>
            <div>
                <el-button @click="handleReset">取 消</el-button>
                <el-button type="primary" @click="handleEdit">确 定</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="票据">
            <el-alert title="提示：" type="info"
                close-text="知道了">
                管理员可增、删、改票据类型，设定每种票据的价格和容量
            </el-alert>
            <ticket-mg></ticket-mg>
        </el-tab-pane>
        <el-tab-pane label="验票员">
            <el-alert title="提示：" type="info"
                close-text="知道了">
                管理员可增、删、改验票员
            </el-alert>
            <checkor-mg></checkor-mg>
        </el-tab-pane>
        <el-tab-pane label="详细介绍">
            <el-alert type="info" title="提示："
                close-text="知道了">
                编辑演出的详细介绍，支持图文编辑
            </el-alert>
            <show-detail></show-detail>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {Tabs, TabPane} from 'element-ui'
import BaseInfoForm from './BaseInfoForm.vue'
import CheckorMg from './CheckorMg.vue'
import ShowDetail from './ShowDetail.vue'
import TicketMg from './TicketMg.vue'
import showAPI from '@/api/show.js'
import {
  mapState
} from 'vuex'
export default {
    mounted () {
        console.info(this.$route.params)
    },
    components: {
        ElTabs: Tabs,
        ElTabPane: TabPane,
        BaseInfoForm,
        CheckorMg,
        ShowDetail,
        TicketMg
    },
    computed: {
        ...mapState({
        curShow: state => state.shows.curShow
        })
    },
    methods: {
        handleEdit () {
            let newShow = this.$refs['baseinfo'].showForm;
            console.info('edit show base info:', newShow)
            // ajax
            showAPI.update(newShow).then(() => {
                this.$notify({
                    title: '成功',
                    message: '修改成功!',
                    type: 'success'
                    });
            })
        },
        handleReset () {
            console.info('reset show, old show:', this.curShow);
        }
    }
}
</script>
<style scoped>
.el-alert {
    margin-bottom: 10px;
}
</style>

