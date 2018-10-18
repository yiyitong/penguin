<template>
   <el-table
    :data="records" stripe
    style="width: 100%"
    height="100%"
    :class="{'el-table_pagination': pagable}"
    :default-sort = "defaultSort"
    @sort-change="sortChange"
    @selection-change="selectionChange"
    :empty-text="emptyText">
    <el-table-column v-if="selectAll"
      type="selection"
      :selectable="checkSelectable"
      width="30">
    </el-table-column>
    <el-table-column v-for="(col) in columns" :key="col.prop" :prop="col.prop"
      :label="col.label" :sortable="col.sortable ? 'custom' : false"
      :min-width="col.width">
      <template  slot-scope="scope">
        <slot :name="col.prop" :item="scope.row">
          <div>
            <span>{{scope.row[col.prop]}}</span>
          </div>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {table, tableColumn, popover} from 'element-ui'
export default {
  components: {
    elTable: table,
    elTableColumn: tableColumn,
    elPopover: popover
  },
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
    selectAll: {
      type: Boolean,
      default: false
    },
    sortChange: {
      type: Function,
      default () {
        return () => {}
      }
    },
    defaultSort: {
      type: Object,
      default () {
        return {}
      }
    },
    selectionChange: {
      type: Function,
      default () {
        return () => {}
      }
    },
    disableRow: {
      type: String,
      default: ''
    },
    disableValue: {
      type: String,
      default: ''
    },
    pagable: {
      type: Boolean,
      defalt: false
    },
    emptyText: {
      type: String,
      default: ''
    }
  },
  computed: {
    height () {
      if (this.pagable) {
        return 'calc(100%-250px)'
      } else {
        return 'calc(100%-120px)'
      }
    }
  },
  methods: {
    calcSortable (sort) {
      return sort === true ? 'custom' : ''
    },
    checkSelectable (row) {
      return row[this.disableRow] !== this.disableValue
    }
  }
}
</script>
<style scoped>
 
</style>