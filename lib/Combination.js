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

    this.coolingDown = false;
  }

  apply() {
    let trigger = ServiceManager.getServiceById(this.trigger.serviceId);
    let action = ServiceManager.getServiceById(this.action.serviceId);

    if (!trigger.isStarted() || !action.isStarted()) {
      return false;
    }
    console.log(trigger.register);
    this.registeredCallback = trigger.register(
      this.id,
      this.trigger.eventId,
      this.handleTrigger
    );

    this._isApplied = true;
    return true;
  }

  destroy() {
    let trigger = ServiceManager.getServiceById(this.trigger.serviceId);

    trigger.cancelRegistration(
      this.id,
      this.trigger.evnetId,
      this.registeredCallback
    );
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
    api.trigger(this.trigger.eventId, {
      combinationId: this.id,
      ...payload
    });
  }

  executeAction(payload) {
    if (this.coolingDown) {
      return;
    }
    this.coolingDown = true;
    setTimeout(() => {
      this.coolingDown = false;
    }, 500);
    
    let actionService = ServiceManager.getServiceById(this.action.serviceId);
    actionService.execute(this.action.eventId, payload, this.action.config);
  }
}

export default Combination;
