import { getServiceById } from './helper';

class Combination {
  constructor(combination) {
    this.combination = combination;
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  apply() {
    let trigger = getServiceById(this.combination.trigger.serviceId);
    trigger.resgister(
      this.handleTrigger,
      this.combination.trigger.config,
      this.combination.id
    );
  }

  getId() {
    return this.combination.id;
  }

  getDescription() {
    return this.combination.description;
  }

  getTrigger() {
    return this.combination.trigger;
  }

  getAction() {
    return this.combintion.action;
  }

  handleTrigger(payload) {
    let actionService = getServiceById(this.combination.action.serviceId);
    actionService.execute(payload, this.combination.action.config);
  }
}

export default Combination;
