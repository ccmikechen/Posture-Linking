import Action from '../Action';
import LineNotifyAuthorizer from '../LineNotifyAuthorizer';

class LineNotifyAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    return new LineNotifyAuthorizer(this);
  }
}

export default LineNotifyAction;
