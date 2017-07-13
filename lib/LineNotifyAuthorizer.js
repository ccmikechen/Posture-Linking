import ServiceAuthorizer from './ServiceAuthorizer';
import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

class LineNotifyAuthorizer extends ServiceAuthorizer {
  constructor(service) {
    super(service);
    Linking.addEventListener('url', this.handleUrl);
    this.url = 'https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=p2NJpZH0R3d9HJFVfpuyAq&redirect_uri=https://t21.bearlab.io/redirect/line_notify/callback&scope=notify&state=AAAA&response_mode=form_post';
    DeepLinking.addScheme('posturelinking://');
    DeepLinking.addRoute('/line/:code', ({ scheme, path, code }) => {
      console.log('code', code);
      super.handleSuccess('success');
    });
  }

  authorize() {
    Linking.openURL(this.url);
  }

  handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }

  removeListener() {
    Linking.removeEventListener('url', this.handleUrl);
    super.removeListener();
  }

}

export default LineNotifyAuthorizer;