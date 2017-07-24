import Trigger from '../Trigger';
import PostureAuthorizer from '../authorizers/PostureAuthorizer';

class PostureTrigger extends Trigger {

  register(combinationId, callback) {
    let newCallback = (payload) => {
      if(combinationId == payload.combinationId) {
        callback();
      }
    };

    super.register(combinationId, newCallback);

    return newCallback;
  }

  createAuthorizer(navigator) {
    if (this.authorizer == undefined) {
      this.authorizer = new PostureAuthorizer(this, navigator);
    }
    return this.authorizer;
  }
}

export default PostureTrigger;
