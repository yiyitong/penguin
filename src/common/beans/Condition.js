export default class Condition {
    constructor (key, conditionType, value) {
      this.prop = key
      this.value = value || ''
      this.type = conditionType || 'equal'
      this.equals = (other) => {
        return this.prop === other.prop
      }
    }
  }