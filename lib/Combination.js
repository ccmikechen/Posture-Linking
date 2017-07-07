import { getServiceById } from './helper';
import api from '../src/api/poselink';

class Combination {
  constructor(combination) {
    this.combination = combination;
    this.handleTrigger = this.handleTrigger.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  apply() {
    let trigger = getServiceById(this.combination.trigger.serviceId);
    trigger.resgister(
      this.combination.id,
      this.handleTrigger
    );
  }

  setStatus(status) {
    this.combination.status = status;
  }

  getCombination() {
    return this.combination;
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

  destroy() {
    let trigger = getServiceById(this.combination.trigger.serviceId);
    //trigger.cancelResgistion(this.combination.id, this.handleTrigger)
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
