<template>
    <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
            演出的基本信息：海报、名称、票据
            <base-info-form :item="item"></base-info-form>
        </el-tab-pane>
        <el-tab-pane label="验票员">
            管理员增、删验票员
        </el-tab-pane>
        <el-tab-pane label="详细介绍">
            图文编辑
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {Tabs, TabPane} from 'element-ui'
import BaseInfoForm from './BaseInfoForm.vue'
export default {
    mounted () {
        console.info(this.$route.params)
    },
    components: {
        ElTabs: Tabs,
        ElTabPane: TabPane,
        BaseInfoForm
    },
    props: ['item']
}
</script>

