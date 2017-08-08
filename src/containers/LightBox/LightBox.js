import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import ShareDialog from '../../components/ShareDialog';

class LightBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let scr = Dimensions.get('window');
    let data = {
      description: '安安測試假資料',
      trigger: {name: 'button'},
      action: {name: 'notification'}
    };

    return (
      <View style={{ backgroundColor:'white', height: 300, width: 300 }} >
        <ShareDialog data={data} />
        <Button
          title= {'Close'}
          onPress= {() => {
            this.props.onClose();
          }}
        />
      </View>
    );
  }
}

export default LightBox;
