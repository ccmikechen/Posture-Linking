import ServiceAuthorizer from './ServiceAuthorizer';
import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';
import { getToken } from '../src/api/server';

const OAUTH_URL = 'https://t21.bearlab.io/oauth/authorize';

class OAuthAuthorizer extends ServiceAuthorizer {

  constructor(service, name) {
    super(service);

    DeepLinking.addScheme('posturelinking://');
    DeepLinking.addRoute(`/${name}/:state'`, ({ scheme, path, state}) => {
      console.log('state', state);
      if (state == 'success') {
        this.handleSuccess();
      } else if (state == 'failed') {
        this.handleFailed();
      };
    });
  }

  init() {
    Linking.addEventListener('url', this.handleUrl);
  }

  authorize() {
    getToken().then((token) => {
      Linking.openURL(`${OAUTH_URL}?serviceId=${this.service.id}&access_token=${token}`);
    });
  }

  handleUrl({ url }) {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }

  removeListener() {
    super.removeListener();
    Linking.removeEventListener('url', this.handleUrl);
  }
}

export default OAuthAuthorizer;
