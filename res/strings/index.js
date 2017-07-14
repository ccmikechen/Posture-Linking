import DeviceInfo from 'react-native-device-info';
import defaultStrings from './strings';
import enUSStrings from './strings.enUS';
import zhTWStrings from './strings.zhTW';
import jaStrings from './strings.ja';

const getLocalizedStrings = () => {
  let deviceLocale = DeviceInfo.getDeviceLocale();
  console.log(deviceLocale);
  switch (deviceLocale) {
  case 'en-US':
    return enUSStrings;
  case 'zh-TW':
    return zhTWStrings;
  case 'zh-Hant-TW':
    return zhTWStrings;
  case 'ja':
    return jaStrings;
  default:
    return {};
  }
};

const localizedStrings = getLocalizedStrings();

export default {
  ...defaultStrings,
  ...localizedStrings
};
