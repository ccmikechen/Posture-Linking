import ServiceAuthorizer from './ServiceAuthorizer';
import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';
import { getToken } from '../src/api/server';

class OAuthAuthorizer extends ServiceAuthorizer {
  constructor(service) {
    super(service);
    Linking.addEventListener('url', this.handleUrl);
    DeepLinking.addScheme('posturelinking://');
    DeepLinking.addRoute('/line_notify/:state', ({ scheme, path, state}) => {
      console.log('state', state);
      if (state == 'success') {
        super.handleSuccess();
      } else if (state == 'failed') {
        super.handleFailed();
      };
    });
  }

  authorize() {
    getToken().then((token) => {
      Linking.openURL(`https://t21.bearlab.io/oauth/authorize?serviceId=${this.service.id}&access_token=${token}`);
    })
  }

  handleUrl({ url }) {
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

export default OAuthAuthorizer;