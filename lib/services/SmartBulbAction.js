import Action from '../Action';
import OAuthAuthorizer from '../OAuthAuthorizer';

class SmartBulbAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'smart_bulb');
    }
    return this.authorizer;
  }
}

export default SmartBulbAction;
