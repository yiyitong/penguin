export default class Column {
    constructor (prop, label, width, adProperties = {sortable: false, visible: true, editable: true}) {
      this.prop = prop
      this.label = label
      this.width = width
      this.visible = typeof adProperties.visible !== 'undefined' ? adProperties.visible : true
      this.sortable = typeof adProperties.sortable !== 'undefined' ? adProperties.sortable : false;
      this.editable = typeof adProperties.editable !== 'undefined' ? adProperties.editable : true;
    }
  }