import { getServiceById } from './helper';
import api from '../src/api/poselink';

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
    let triggerServiceId = this.combination.trigger.serviceId;
    let actionServiceId = this.combination.action.serviceId;
    let actionService = getServiceById(actionServiceId);
    actionService.execute(payload, this.combination.action.config);
    api.trigger(triggerServiceId, {
      combinationId: this.combination.id
    })
  }
}

export default Combination;
