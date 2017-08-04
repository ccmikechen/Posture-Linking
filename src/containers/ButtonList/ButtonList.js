import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';

import AnimatedButton from '../../components/AnimatedButton';
import ViewIcon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import {
  updateCombinationList
} from '../../actions/combinationActions';

import {
  selectService,
  getServiceList
} from '../../actions/serviceActions';

import ServiceManager from '../../../lib/ServiceManager';

const { width, height } = Dimensions.get('window');

const slideHeight = height * 0.5;
const slideWidth = Math.round( width * 0.75 );
const itemHorizontalMargin = Math.round( width * 0.02 );
const itemWidth = slideWidth + itemHorizontalMargin * 2;

class ButtonList extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');
    this.connectService = this.connectService.bind(this);
    this.state = {
      item: 0
    }
  }

  componentWillMount() {
    this.props.updateCombinationList();
    this.props.getServiceList();
  }

  handleButtonPress(combinationId) {
    console.log(this, combinationId);
    this.buttonTrigger.trigger({ combinationId });
  }

  shouldComponentUpdate() {
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');

    return true;
  }

  renderButton(combination) {
    let icon = {};
    let description = R.strings.events[combination.action.eventId].description;
    description += R.strings.events[combination.action.eventId].options;

    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return (
      <View style={[styles.animatedButtonView, {width: itemWidth, height: slideHeight, paddingHorizontal: itemHorizontalMargin}]} key={combination.id} >
        <AnimatedButton
          size={150}
          onPress={() => this.handleButtonPress(combination.id)}
          color={icon.color}
          icon={icon.icon}
        />
        <Text style={styles.description} >{description}</Text>
      </View>
    );
  }

  minRenderButton(combination, id) {
    let icon = {}, size = 30, iconSize;

    if(this.state.item == id){
      size = 50;
    }
    iconSize = size * 0.8;
    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return(
      <View key={combination.id} style={{height: 60, width: 60, borderRadius: 999, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginLeft: 6, marginRight: 6}}>
        <TouchableOpacity onPress={() => {
          this.refs.carousel.snapToItem(id);
        }} style={styles.minTouchable}>
          <View style={[{backgroundColor: icon.color, height: size*1.2, width: size*1.2}, styles.minButton, styles.minOuterButton]}></View>
          <View style={[{backgroundColor: icon.color, height: size*1.1, width: size*1.1}, styles.minButton, styles.minMiddleButton]}></View>
          <View style={[{backgroundColor: icon.color, height: size, width: size}, styles.minButton]}>
            <Image source={icon.icon} style={[
              {
                height: iconSize,
                width: iconSize
              }
            ]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  connectService() {
    this.props.selectService(this.buttonTrigger.id);
    this.props.navigator.push({
      screen: 'ServiceConnectScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  render() {
    let buttonData = [];
    this.props.combinations.forEach(combination => {
      if((combination.trigger.serviceId == this.buttonTrigger.id) && (combination.status == 1)){
        buttonData.push(combination);
      }
    });

    return (
        <View style={styles.content} >
        {
          this.buttonTrigger? (
            this.buttonTrigger.isConnected() == false?
              <View style= {styles.noAuthorized} >
                <TouchableOpacity style={styles.imgTouch} onPress={() => this.connectService()}> 
                  <ViewIcon name= 'touch-app' size= {150} color= {R.colors.NO_CONBINATION} />
                    <Text style={styles.text} >{R.strings.CLICK_THIS}</Text>
                    <Text style={styles.text} >{R.strings.AUTHORIZING}</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.authorized}>
                <Carousel
                  sliderWidth={width}
                  itemWidth={itemWidth}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContainer}
                  inactiveSlideScale={0.9}
                  inactiveSlideOpacity={0.5}
                  snapOnAndroid={true}
                  onSnapToItem={item => this.setState({item: item})}
                  ref={'carousel'}
                >
                  {buttonData.map(combination => this.renderButton(combination))}
                </Carousel>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {buttonData.map((combination, id) => this.minRenderButton(combination, id))}
                </ScrollView>
              </View>
          ) : null
          }
        </View>
    );
  }
}

export default connect((state) => ({
  combinations: state.getIn(['combination', 'combinations']).toJS()
}), {
  updateCombinationList,
  selectService,
  getServiceList
})(ButtonList);
