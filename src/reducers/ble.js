import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const InitialState = Immutable.fromJS({
  scannedDevices: [],
  isScanning: false
});

const updateDevices = (devices, newDevice) => {
  let hasDiscovered = false;

  devices.forEach(device => {
    if (device.id == newDevice.id) {
      hasDiscovered = true;
    }
  });

  if (hasDiscovered) {
    return Immutable.fromJS(devices.map(device => (
      device.id == newDevice.id ? newDevice : device
    )));
  } else {
    return Immutable.fromJS([...devices, newDevice]);
  }
}

const ble = handleActions({
  ADD_NEW_SCANNED_DEVICE: (state, { device }) => (
    state.set('scannedDevices',
      updateDevices(state.get('scannedDevices').toJS(), device))
  ),
  CLEAR_SCANNED_DEVICES: (state) => (
    state.set('scannedDevices', Immutable.fromJS([]))
  ),
  UPDATE_BLE_SCANNING_START: (state) => (
    state.set('isScanning', true)
  ),
  UPDATE_BLE_SCANNING_STOP: (state) => (
    state.set('isScanning', false)
  )
}, InitialState);

export default ble;
