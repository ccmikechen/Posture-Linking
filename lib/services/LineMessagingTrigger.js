import Trigger from '../Trigger';
import OAuthAuthorizer from '../authorizers/OAuthAuthorizer';

class LineMessagingTrigger extends Trigger {
  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'line_messaging');
    }
    return this.authorizer;
  }
}

export default LineMessagingTrigger;
