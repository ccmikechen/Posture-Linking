import { getServiceById } from './helper';

class Combination {
  constructor(id, name, trigger, action) {
    this.id = id;
    this.name = name;
    this.trigger = this.trigger;
    this.action = this.action;
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  handleTrigger() {
    let actionService = getServiceById(this.action.serviceId);
    actionService.execute();
  }
}

export default Combination;