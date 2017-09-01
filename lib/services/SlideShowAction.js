import Action from '../Action';
import OAuthAuthorizer from '../authorizers/OAuthAuthorizer';
import ServiceManager from '../ServiceManager';
import RemoteController from '../../src/socket/RemoteController';

class SlideShowAction extends Action {
  constructor(props) {
    super(props);
    this.controller = new RemoteController();
    //this._isAvailable = false;
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'slide_show');
    }
    return this.authorizer;
  }

  execute(eventId, payload, config) {
    let event = ServiceManager.getEventById(eventId);
    console.log('Slide Show action', eventId, event, payload, config);

    switch (event.name) {
      case "turn next":
        this.controller.press('RIGHT');
        break;
      case "turn back":
        this.controller.press('LEFT');
        break;
    }
  }
}

export default SlideShowAction;
