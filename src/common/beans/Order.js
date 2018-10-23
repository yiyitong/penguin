export default class Order {
    static DIREC = {
      ASC: 'ascending',
      DESC: 'descending'
    }
    constructor (key, direction = Order.DIREC.ASC) {
      this.prop = key
      this.order = direction
      this.isEmpty = () => {
        return !this.prop && !this.order
      }
      this.equals = (other) => {
        return this.prop === other.prop &&
          this.order === other.order
      }
    }
  }