<template>
    <table>
        <thead>
            <tr>
            <th v-for="column in columns" :key="column.prop" v-if="column.visible">{{column.label}}</th>
            <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in records" :key="record.id">
                <td v-for="column in columns" :key="column.prop">{{record[column.prop]}}</td>
                <td>
                    <btn-link>编辑</btn-link>
                    <btn-link>删除</btn-link>
                </td>
            </tr>
            <tr v-if="adding">

            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        records: {
            type: Array,
            default () {
                return []
            }
        },
        editable: {
            type: Boolean,
            default: false
        },
        addable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return  {
            curId: -1,
            adding: false
        }
    }
}
</script>

