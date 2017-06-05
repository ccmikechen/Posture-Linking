import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  RefreshControl,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import styles from './styles';

import {
  addNewScannedDevice,
  startBleScan,
  stopBleScan
} from '../../actions/bleActions';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class ScanBle extends React.Component {
  constructor(props) {
    super(props);
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.bleSubscriptions = [
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral),
      bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan)
    ];
    this.startScan();
  }

  componentWillUnmount() {
    this.bleSubscriptions.forEach(subscription => {
      subscription.remove();
    });
  }

  handleDiscoverPeripheral(peripheral) {
    console.log('DiscoverPeripheral', peripheral);
    this.props.addNewScannedDevice(peripheral);
  }

  handleStopScan() {
    this.props.stopBleScan();
  }

  startScan() {
    BleManager.scan([], 5, false).then((results) => {
      this.props.startBleScan();
    });
  }

  onRefresh() {
    this.startScan();
  }

  genDataSource(devices) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    this.dataSource = this.dataSource.cloneWithRows(devices);
    return this.dataSource;
  }

  renderRow(device) {
    console.log('device', device);
    return (
      <View key={device.id} style={styles.listItem}>
        <View style={styles.rssiContainer}>
          <Text style={styles.rssi}>{device.rssi}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{device.name || 'n/a'}</Text>
          <Text style={styles.id}>{device.id}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>

      {console.log(this.props.devices)}
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.props.isScanning}
              onRefresh={this.onRefresh}
            />
          }
          dataSource={this.genDataSource(this.props.devices)}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  devices: state.getIn(['ble', 'scannedDevices']).toJS(),
  isScanning: state.getIn(['ble', 'isScanning'])
}), {
  addNewScannedDevice,
  startBleScan,
  stopBleScan
})(ScanBle);
