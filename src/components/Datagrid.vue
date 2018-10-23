<template>
  <div class="datagrid-viewer">
   <el-table
    :data="displayRec" stripe
    style="width: 100%"
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
      :label="col.label" :sortable="col.sortable ? 'custom' : false" v-if="col.visible"
      :min-width="col.width">
      <template  slot-scope="scope">
        <slot v-if="col.prop === 'ops'" :name="col.prop" :item="scope.row">
          <div class="td-ops" v-if="scope.row.editing || curIndex === scope.$index">
              <a @click="handleSure(scope.row)">确定</a>
              <a @click="handleCancel(scope.$index, scope.row)">取消</a>
          </div>
          <div class="td-ops" v-else>
              <a @click="editOne(scope.row, scope.$index)">编辑</a>
              <a @click="delOne(scope.row)">删除</a>
          </div>
        </slot>
        <slot v-else :name="col.prop" :item="scope.row">
          <div>
            <el-input v-if="col.editable && (scope.row.editing || curIndex === scope.$index)"
              v-model="scope.row[col.prop]" required></el-input>
            <span v-else>{{scope.row[col.prop]}}</span>
          </div>
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="pagable" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page.index"
      :page-sizes="[10, 20, 100]"
      :page-size="query.page.size" :total="total"
      layout="sizes, prev, pager, next, jumper, total">
    </el-pagination>
  <div style="text-align:left; margin-top: 10px;">
    <el-button v-if="addable && mode !=='add'" 
      icon="el-icon-plus" @click="beginAdd">添加</el-button>
  </div>
  </div>
</template>
<script>
import {table, tableColumn, popover, pagination} from 'element-ui'
import BtnLink from '@/components/BtnLink.vue'
import Query from '@/common/beans/Query.js'
export default {
  components: {
    elTable: table,
    elTableColumn: tableColumn,
    elPopover: popover,
    elPagination: pagination,
    BtnLink
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
    },
    editable: {
      type: Boolean,
      default: false
    },
    uniqKey: {
      type: String, // eg: 'id'
      default: ''
    },
    emptyItem: {
      type: Object,
      default () {
        return {}
      }
    },
    query: {
      type: Object,
      default () {
        return new Query();
      }
    }
  },
  data () {
    return {
      curIndex: -1, //编辑时使用,
      mode: 'list',
      curOrigin: {},
      total: 0
    }
  },
  computed: {
    height () {
      if (this.pagable) {
        return 'calc(100%-250px)'
      } else {
        return 'calc(100%-120px)'
      }
    },
    addable () { // 不分页可编辑的列表支持添加
      return !this.pagable && this.editable;
    },
    displayRec () {
      return this.records.map(el => {el.editing = false; return el;});
    }
  },
  methods: {
    calcSortable (sort) {
      return sort === true ? 'custom' : ''
    },
    checkSelectable (row) {
      return row[this.disableRow] !== this.disableValue
    },
    beginAdd () {
      this.mode = 'add'
      let newItem = Object.assign({}, this.emptyItem)
      newItem.editing = true
      this.displayRec.push(newItem)
      this.curIndex = this.displayRec.length - 1
    },
    delOne (item) {
      this.$emit('del', item)
    },
    handleSure (item) {
      item.editint = false
      this.$emit(this.mode, item)
      this.mode = 'list'
      this.curIndex = -1
    },
    handleCancel (index, item) {
      if (this.mode === 'add') {
        this.displayRec.splice(index, 1)
      } else if (this.mode === 'edit'){
        this.displayRec.splice(index, 1, this.curOrigin)
      }
      this.mode = 'list'
      this.curIndex = -1
      item.editing = false
    },
    editOne (item, index) {
      item.editing = true
      this.curOrigin = Object.assign(item) // 暫存正在編輯的記錄原值cue
      this.curIndex = index
      this.mode = 'edit'
    },
    handleSizeChange (val) {
      this.query.page.size = val
      this.$emit('refresh', this.query)
    },
    handleCurrentChange (val) {
      this.query.page.index = val
      this.$emit('refresh', this.query)
    }
  }
}
</script>
<style scoped>
 .el-pagination {
   text-align: right;
 }
 .el-pagination__jump::after{
    content: '，';
 }
</style>