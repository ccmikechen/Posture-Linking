import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  NativeModules,
  NativeEventEmitter,
  Alert
} from 'react-native';
import styles from './styles';
import PostureDeviceScanning from '../../components/PostureDeviceScanning';

import {
  resetDeviceDiscoveringState,
  updateDeviceDiscovered
} from '../../actions/bleActions';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class PostureDeviceScanner extends React.Component {

  constructor(props) {
    super(props);

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.bleSubscriptions = [];
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.resetDeviceDiscoveringState();
  }

  componentDidMount() {
    this.bleSubscriptions = [
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral),
      bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan)
    ];

    BleManager.enableBluetooth()
      .then(() => {
        this.startScan();
      })
      .catch((error) => {
        Alert.alert(R.strings.APP_NAME, R.strings.BLUETOOTH_CANCELED_MESSAGE, [
          {text: 'OK', onPress: () => {
            this.props.navigator.dismissModal({
              animated: false
            });
          }}
        ], {
          cancelable: false
        });
      });
  }

  componentWillUnmount() {
    BleManager.stopScan();
    this.clear();
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'PostureDeviceScannerScreen:back') {
        this.props.navigator.dismissModal({
          animated: false
        });
      }
    }
  }

  clear() {
    this.bleSubscriptions.forEach(subscription => {
      subscription.remove();
    });
    this.bleSubscriptions = [];
  }

  handleDiscoverPeripheral(peripheral) {
    console.log('discovered', peripheral);
  }

  handleStopScan() {
  }

  startScan() {
    BleManager.scan([], 0, false).then((results) => {
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isDiscoveredDevice?
         <Text>Stoped</Text> :
         <PostureDeviceScanning />
        }
      </View>
    );
  }
}

export default connect((state) => ({
  isDiscoveredDevice: state.getIn(['ble', 'isDiscoveredDevice'])
}), {
  resetDeviceDiscoveringState,
  updateDeviceDiscovered
})(PostureDeviceScanner);
