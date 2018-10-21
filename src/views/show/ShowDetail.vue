<template>
    <app-edit :contents="contents"></app-edit>
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
            contents: [{
                'text': 'hello'
            },
            {
                'image': ''
            }]
        }
    },
    mounted () {
        let curShowId = this.$route.params.id;
        showAPI.detail({id: curShowId}).then((res) => {
            this.contents = res
        })
    }
}
</script>
