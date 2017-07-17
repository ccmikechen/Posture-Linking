import Action from '../Action';
import OAuthAuthorizer from '../OAuthAuthorizer';

class SlideShowAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'slide_show');
    }
    return this.authorizer;
  }
}

export default SlideShowAction;
