import {
  startMainApp
} from './apps';
import { AsyncStorage } from 'react-native';
import BleManager from 'react-native-ble-manager';
import api from './api/poselink';
import { loadServices } from '../lib/helper';
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
      console.log('is loged in');
      resolve();
    })
    .catch(error => {
      api.createSession(user).then(() => {
        console.log('loged in');
        resolve();
      });
    })
  })
};

const loadBackgroundProcess = async () => {
  await login(defaultUser);
  console.log('login');

  await loadServices();
  console.log('load services');

  await combinationManager.loadAllCombinaions();
  console.log('load combinations');
};

const startApp = () => {
  loadBackgroundProcess().then(() => {
    startBleManager();
    startMainApp();
  });
};

export default startApp;
