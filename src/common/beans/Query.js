import Order from "./Order";
import Page from "./Page";
import Condition from "./Condition";

export default class Query {
  static CONDITION_TYPE = Condition.TYPE;
  static ORDER_DIREC = Order.DIREC;
  constructor(order = new Order("id"), page = new Page(), conditions = []) {
    this.page = page;
    this.order = order;
    this.conditions = conditions;

    this.updateOrder = order => {
      if (!order) {
        return;
      }
      order = new Order(order.prop, order.direction);
      if (order.isEmpty()) {
        this.order = new Order("id");
      } else {
        this.order = order;
      }
    };
    this.orderBy = key => {
      // 目前仅支持单列排序， 默认使用升序
      let order = this.order;
      if (order.prop === key) {
        //当前排序项则切换排序方向
        order.direction =
          order.direction === Order.DIREC.ASC
            ? Order.DIREC.ASC
            : Order.DIREC.ASC;
      } else {
        //非当前排序则新建一个排序并替换
        order = new Order(key, Order.DIREC.ASC);
      }
      this.order = order;
    };
    this.orderDirec = key => {
      let direction;
      if (order.prop === key) {
        direction = order.direction;
      }
      return direction;
    };
    this.hasCondition = key => {
      let condition = conditions.find(item => {
        return item.key === key;
      });
      return typeof condition !== "undefined";
    };
    this.addCondition = condition => {
      let index = this.conditions.findIndex(item => {
        return item.equals(condition);
      });
      if (index === -1) {
        this.conditions.push(condition);
      } else {
        Object.assign(this.conditions[index], condition);
      }
    };
    this.removeCondition = condition => {
      let index = this.conditions.findIndex(item => {
        return item.equals(condition);
      });
      if (index >= 0) {
        this.conditions.splice(index, 1);
      }
    };
  }
}