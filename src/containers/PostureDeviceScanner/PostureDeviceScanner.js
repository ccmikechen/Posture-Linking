import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  NativeModules,
  NativeEventEmitter
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
    this.startScan();
  }

  componentWillUnmount() {
    BleManager.stopScan();
    this.clear();
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'PostureDeviceScannerScreen:back') {
        this.props.navigator.dismissModel({
          animationType: 'slide-down'
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
