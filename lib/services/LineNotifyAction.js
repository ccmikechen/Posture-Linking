import Action from '../Action';
import LineNotifyAuthorizer from '../LineNotifyAuthorizer';

class LineNotifyAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new LineNotifyAuthorizer(this);
    }
    return this.authorizer;
  }
}

export default LineNotifyAction;
