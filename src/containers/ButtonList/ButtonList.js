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
    this.buttonOnClickEvent = this.buttonTrigger.getEventByName('on click');
    this.connectService = this.connectService.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.state = {
      item: 0
    }
  }

  componentWillMount() {
    this.props.updateCombinationList();
    this.props.getServiceList();
  }

  handleButtonPress(combinationId) {
    this.buttonTrigger.trigger(this.buttonOnClickEvent.id, { combinationId });
  }

  shouldComponentUpdate() {
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');

    return true;
  }

  renderMessage(msg) {
    if (msg.length > 20) {
      return msg.substring(0, 17) + '...';
    } else {
      return msg;
    }
  }

  renderButton(combination) {
    let icon = {};
    let description = R.strings.events[combination.action.eventId].description;
    description += R.strings.events[combination.action.eventId].options;
    let message = combination.action.config.message;
    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return (
      <View style={{width: itemWidth, height: slideHeight, paddingHorizontal: itemHorizontalMargin, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: itemWidth-10, height: slideHeight-10, paddingHorizontal: itemHorizontalMargin, backgroundColor: 'lightgrey', borderRadius: 20, position: 'absolute', top: 10, left: 10}}></View>
        <View style={{width: itemWidth-10, height: slideHeight-10, paddingHorizontal: itemHorizontalMargin, backgroundColor: 'white', borderRadius: 20, position: 'absolute'}}></View>
        <View style={[styles.animatedButtonView, {width: itemWidth-10, height: slideHeight-10, paddingHorizontal: itemHorizontalMargin}]} key={combination.id} >
          <AnimatedButton
            size={150}
            onPress={() => this.handleButtonPress(combination.id)}
            color={icon.color}
            icon={icon.icon}
          />
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.message}>{this.renderMessage(message)}</Text>
        </View>
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
      <TouchableOpacity
        onPress={() => {this.refs.carousel.snapToItem(id)}}
        style={styles.minTouchable}
        key={combination.id}
      >
        <View style={styles.minRenderButtonView}>
          <View style={[{backgroundColor: icon.color, height: size*1.2, width: size*1.2}, styles.minButton, styles.minOuterButton]}></View>
          <View style={[{backgroundColor: icon.color, height: size*1.1, width: size*1.1}, styles.minButton, styles.minMiddleButton]}></View>
          <View style={[{backgroundColor: icon.color, height: size, width: size}, styles.minButton]}>
            <Image source={icon.icon} style={{height: iconSize, width: iconSize}}/>
          </View>
        </View>
      </TouchableOpacity>
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
                  enableSnap={true}
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
