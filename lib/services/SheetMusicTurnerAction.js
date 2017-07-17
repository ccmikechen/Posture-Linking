import Action from '../Action';
import OAuthAuthorizer from '../OAuthAuthorizer';

class SheetMusicTurnerAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'sheet_music_turner');
    }
    return this.authorizer;
  }
}

export default SheetMusicTurnerAction;
