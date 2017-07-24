import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import styles from './styles';

import {
  startBleScan,
  stopBleScan
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
    this.props.stopBleScan();
  }

  startScan() {
    BleManager.scan([], 0, false).then((results) => {
      this.props.startBleScan();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.isScanning? 'Scanning...' : 'Stoped'}
        </Text>
      </View>
    );
  }
}

export default connect((state) => ({
  isScanning: state.getIn(['ble', 'isScanning'])
}), {
  startBleScan,
  stopBleScan
})(PostureDeviceScanner);
