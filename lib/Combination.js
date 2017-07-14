import { getServiceById } from './helper';
import api from '../src/api/poselink';

class Combination {

  constructor(combination) {
    this.getCombination = this.getCombination.bind(this);
    this.id = combination.id;
    this.description = combination.description;
    this.status = combination.status;
    this.trigger = combination.trigger;
    this.action = combination.action;
    this.handleTrigger = this.handleTrigger.bind(this);
    this.destroy = this.destroy.bind(this);
    this._isApplied = false;
  }

  apply() {
    let trigger = getServiceById(this.trigger.serviceId);
    let action = getServiceById(this.action.serviceId);

    if (!trigger.isStarted() || !action.isStarted()) {
      return false;
    }

    this.handleTrigger = trigger.register(
      this.id,
      this.handleTrigger
    );

    this._isApplied = true;
    return true;
  }

  isApplied() {
    return this._isApplied;
  }

  setStatus(status) {
    this.status = status;
  }

  getCombination() {
    return this;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getTrigger() {
    return this.trigger;
  }

  getAction() {
    return this.action;
  }

  destroy() {
    let trigger = getServiceById(this.trigger.serviceId);

    trigger.cancelRegistration(this.id, this.handleTrigger);
  }

  handleTrigger(payload) {
    let triggerServiceId = this.trigger.serviceId;
    let actionServiceId = this.action.serviceId;
    let actionService = getServiceById(actionServiceId);

    actionService.execute(payload, this.action.config);

    api.trigger(triggerServiceId, {
      combinationId: this.id
    });
  }
}

export default Combination;
