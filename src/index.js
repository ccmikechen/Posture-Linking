import '../res';
import {
  startMainApp
} from './apps';
import { AsyncStorage } from 'react-native';
import BleManager from 'react-native-ble-manager';
import api from './api/poselink';
import { initialSocket, getChannel } from './api/channel';

import ServiceManager from '../lib/ServiceManager';
import CombinationManager from '../lib/CombinationManager';

const startBleManager = () => {
  BleManager.start({showAlert: false, allowDuplicates: false});
};

const defaultUser = {
  username: 'testuser',
  password: 'aaaaaaaa'
};

const login = (user) => {
  return new Promise((resolve, reject) => {
    api.refreshSession()
    .then(() => {
      resolve();
    })
    .catch(error => {
      api.createSession(user).then(() => {
        resolve();
      });
    });
  });
};

const loadBackgroundProcess = async () => {
  await login(defaultUser);
  console.log('Loged in');

  await ServiceManager.loadServices();
  console.log('Loaded services');

  await ServiceManager.loadServiceConfigs();
  console.log('Loaded service configs');

  await CombinationManager.loadAllCombinations();
  console.log('Loaded combinations');

  await CombinationManager.applyCombinations();

  await initialSocket();
  console.log('Initialized socket');
};

const startApp = () => {
  loadBackgroundProcess().then(() => {
    startBleManager();
    startMainApp();
  });
};

export default startApp;
