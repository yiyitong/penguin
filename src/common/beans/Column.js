export default class Column {
    constructor (prop, label, width, adProperties = {sortable: false, visible: true}) {
      this.prop = prop
      this.label = label
      this.width = width
      this.visible = adProperties.visible
      this.sortable = adProperties.sortable || false
    }
  }