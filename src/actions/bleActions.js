export const ADD_NEW_SCANNED_DEVICE = 'ADD_NEW_SCANNED_DEVICE';
export const CLEAR_SCANNED_DEVICES = 'CLEAR_SCANNED_DEVICES';
export const UPDATE_BLE_SCANNING_START = 'UPDATE_BLE_SCANNING_START';
export const UPDATE_BLE_SCANNING_STOP = 'UPDATE_BLE_SCANNING_STOP';
export const UPDATE_DEVICE_DISCOVERED = 'UPDATE_DEVICE_DISCOVERED';
export const UPDATE_DEVICE_NOT_DISCOVERED = 'UPDATE_DEVICE_NOT_DISCOVERED';

export const addNewScannedDevice = (device) => (dispatch) => {
  dispatch({ type: ADD_NEW_SCANNED_DEVICE, device });
};

export const startBleScan = () => (dispatch) => {
  dispatch({ type: CLEAR_SCANNED_DEVICES });
  dispatch({ type: UPDATE_BLE_SCANNING_START });
};

export const stopBleScan = () => (dispatch) => {
  dispatch({ type: UPDATE_BLE_SCANNING_STOP });
};

export const resetDeviceDiscoveringState = () => (dispatch) => {
  dispatch({ type: UPDATE_DEVICE_NOT_DISCOVERED });
};

export const updateDeviceDiscovered = () => (dispatch) => {
  dispatch({ type: UPDATE_DEVICE_DISCOVERED });
};
