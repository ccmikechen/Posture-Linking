import Trigger from '../Trigger';

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

  createAuthorizer() {
    if (this.authorizer == undefined) {
      
    }
    return this.authorizer;
  }
}

export default PostureTrigger;
