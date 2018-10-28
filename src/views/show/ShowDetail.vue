<template>
    <app-edit :contents="contents" @finish="handleFinished"></app-edit>
</template>
<script>
import AppEdit from '@/components/AppEdit.vue'
import showAPI from '@/api/show.js'
export default {
    components: {
        AppEdit
    },
    data () {
        return {
            contents: []
        }
    },
    mounted () {
        let curShowId = this.$route.params.id;
        showAPI.detail({showId: curShowId}).then(({data}) => {
            this.contents = data.data
        })
    },
    methods: {
        handleFinished (contents) {
            let showId = this.$route.params.id
            showAPI.updateDetail(showId, contents).then(({data}) => {
                if (data.result) {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                }
            })
        }
    }
}
</script>
