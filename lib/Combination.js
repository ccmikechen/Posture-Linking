import ServiceManager from './ServiceManager';
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
    this.registeredCallback = null;
    this.destroy = this.destroy.bind(this);
    this._isApplied = false;
  }

  apply() {
    let trigger = ServiceManager.getServiceById(this.trigger.serviceId);
    let action = ServiceManager.getServiceById(this.action.serviceId);

    if (!trigger.isStarted() || !action.isStarted()) {
      return false;
    }

    this.registeredCallback = trigger.register(
      this.id,
      this.handleTrigger
    );

    this._isApplied = true;
    return true;
  }

  destroy() {
    let trigger = ServiceManager.getServiceById(this.trigger.serviceId);

    trigger.cancelRegistration(this.id, this.registeredCallback);
    this._isApplied = false;
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

  handleTrigger(payload) {
    let triggerEventId = this.trigger.eventId;
    let actionServiceId = this.action.serviceId;
    let actionService = ServiceManager.getServiceById(actionServiceId);

    actionService.execute(payload, this.action.config);

    api.trigger(triggerEventId, {
      combinationId: this.id,
      ...payload
    });
  }
}

export default Combination;
