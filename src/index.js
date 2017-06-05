import {
  startMainApp
} from './apps';

import BleManager from 'react-native-ble-manager';

const startBleManager = () => {
  BleManager.start({showAlert: false, allowDuplicates: false});
}

const startApp = () => {
  startBleManager();
  startMainApp();
};

export default startApp;
