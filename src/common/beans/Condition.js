export default class Condition {
    constructor (key, conditionType, value) {
      this.key = key
      this.value = value || ''
      this.type = conditionType ? conditionType.value : conditionType
      this.equals = (other) => {
        return this.key === other.key
      }
    }
  }