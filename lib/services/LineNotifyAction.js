import Action from '../Action';
import OAuthAuthorizer from '../OAuthAuthorizer';

class LineNotifyAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'line_notify');
    }
    return this.authorizer;
  }
}

export default LineNotifyAction;
