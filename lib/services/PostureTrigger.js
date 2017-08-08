import Trigger from '../Trigger';
import PostureAuthorizer from '../authorizers/PostureAuthorizer';

class PostureTrigger extends Trigger {

  createAuthorizer(navigator) {
    if (this.authorizer == undefined) {
      this.authorizer = new PostureAuthorizer(this, navigator);
    }
    return this.authorizer;
  }
}

export default PostureTrigger;
