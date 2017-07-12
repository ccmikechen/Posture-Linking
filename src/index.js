import {
  startMainApp
} from './apps';
import { AsyncStorage } from 'react-native';
import BleManager from 'react-native-ble-manager';
import api from './api/poselink';
import { initialSocket, getChannel } from './api/channel';
import {
  loadServices,
  loadServiceConfigs
} from '../lib/helper';
import { getCombinationManager } from '../lib/CombinationManager';

const startBleManager = () => {
  BleManager.start({showAlert: false, allowDuplicates: false});
}

const combinationManager = getCombinationManager();

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

  await loadServices();
  console.log('Loaded services');

  await loadServiceConfigs();
  console.log('Loaded service configs');

  await combinationManager.loadAllCombinaions();
  console.log('Loaded combinations');

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
