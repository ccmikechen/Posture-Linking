import Action from '../Action';
import OAuthAuthorizer from '../authorizers/OAuthAuthorizer';

class CameraAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'camera');
    }
    return this.authorizer;
  }
}

export default CameraAction;
