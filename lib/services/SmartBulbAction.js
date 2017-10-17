import Action from '../Action';
import OAuthAuthorizer from '../authorizers/OAuthAuthorizer';
import ServiceManager from '../ServiceManager';
import SmartBulbDevice from '../../src/ble/SmartBulbDevice';

class SmartBulbAction extends Action {
  constructor(props) {
    super(props);

    //this._isAvailable = false;
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'smart_bulb');
    }
    return this.authorizer;
  }

  execute(eventId, payload, config) {
    let event = ServiceManager.getEventById(eventId);
    console.log('Smart Bulb action', eventId, event, payload, config);

    switch (event.name) {
      case "turn on":
        // SmartBulbDevice.turnOn();
        // break;
      case "turn off":
        // SmartBulbDevice.turnOff();
        SmartBulbDevice.turnOnOrOff();
        break;
    }
  }
}

export default SmartBulbAction;
