import Action from '../Action';
import OAuthAuthorizer from '../OAuthAuthorizer';

class SheetMusicFumerAction extends Action {
  constructor(props) {
    super(props);
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new OAuthAuthorizer(this, 'sheet_music_fumer');
    }
    return this.authorizer;
  }
}

export default SheetMusicFumerAction;
