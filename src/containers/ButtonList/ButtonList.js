import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
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
const minButtonTouchSize = 70;
const minButtonSize = minButtonTouchSize * 0.9;

class ButtonList extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');
    this.buttonOnClickEvent = this.buttonTrigger.getEventByName('on click');
    this.connectService = this.connectService.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.goToAddCombination = this.goToAddCombination.bind(this);
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
    let message = '';
    if (combination.action.config.message === undefined) {
      message = '';
    } else {
      message += combination.action.config.message;
    }
    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return (
      <View key={combination.id} style={[{width: itemWidth, height: slideHeight, paddingHorizontal: itemHorizontalMargin}, styles.animatedView]}>
        <View style={[{width: itemWidth-10, height: slideHeight-10, paddingHorizontal: itemHorizontalMargin}, styles.animatedShadowView]}></View>
        <View style={[{width: itemWidth-10, height: slideHeight-10, paddingHorizontal: itemHorizontalMargin}, styles.animatedBottomView]}></View>
        <View style={[{width: itemWidth-10, height: slideHeight-10, paddingHorizontal: itemHorizontalMargin}, styles.animatedButtonView]}>
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
    let icon = {}, size = minButtonSize * 0.5, iconSize;

     if(this.state.item == id){
       size = minButtonSize * 0.75;
     }
    iconSize = size * 0.8;
    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return(
      <TouchableOpacity
        onPress={() => {
          this.refs.carousel.snapToItem(id);
        }}
        style={[{width: minButtonTouchSize, height: minButtonTouchSize}, styles.minTouchable]}
      >
        <View style={{width: minButtonSize*1.08, height: minButtonSize*1.06, backgroundColor: 'black', borderRadius: 999, alignItems: 'center', justifyContent: 'center', opacity: 0.04, position: 'absolute'}}></View>
        <View style={{width: minButtonSize*1.06, height: minButtonSize*1.045, backgroundColor: 'black', borderRadius: 999, alignItems: 'center', justifyContent: 'center', opacity: 0.08, position: 'absolute'}}></View>
        <View style={{width: minButtonSize*1.04, height: minButtonSize*1.03, backgroundColor: 'black', borderRadius: 999, alignItems: 'center', justifyContent: 'center', opacity: 0.12, position: 'absolute'}}></View>
        <View style={{width: minButtonSize*1.02, height: minButtonSize*1.015, backgroundColor: 'black', borderRadius: 999, alignItems: 'center', justifyContent: 'center', opacity: 0.16, position: 'absolute'}}></View>
        <View style={[{width: minButtonSize, height: minButtonSize}, styles.minRenderButtonView]}>
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

  goToAddCombination() {
    this.props.navigator.showModal({
      screen: 'AddCombinationScreen',
      title: R.strings.ADD_COMBINATION,
      passProps: {},
      animated: false
    });
  }

  flatList;

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
              buttonData.length === 0 ? (
                <TouchableOpacity style={styles.imgTouch} onPress={() => this.goToAddCombination()}>
                  <ViewIcon name= 'touch-app' size= {150} color= {R.colors.NO_CONBINATION} />
                  <Text style={styles.text} >{R.strings.CLICK_THIS}</Text>
                  <Text style={styles.text} >{R.strings.ADD_COMBINATION}</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.authorized}>
                  <View style={{flex: 16, alignItems: 'center', justifyContent: 'center'}}>
                    <Carousel
                      sliderWidth={width}
                      itemWidth={itemWidth}
                      containerCustomStyle={styles.slider}
                      contentContainerCustomStyle={styles.sliderContainer}
                      inactiveSlideScale={0.9}
                      inactiveSlideOpacity={0.5}
                      snapOnAndroid={true}
                      enableSnap={true}
                      onSnapToItem={item => {
                        this.setState({item: item});
                        this.flatList.scrollToIndex({viewPosition: 0.5, index: item});
                      }}
                      ref={'carousel'}
                    >
                      {buttonData.map(combination => this.renderButton(combination))}
                    </Carousel>
                  </View>
                  <View style={{flex: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF5B5B'}}>
                    <FlatList
                      horizontal={true}
                      renderItem={(item) => this.minRenderButton(item.item, item.index)}
                      data={buttonData}
                      ref={(flatList) => this.flatList = flatList}
                      getItemLayout={(data, index) => (
                        {length: minButtonTouchSize, offset: minButtonTouchSize * index, index: index}
                      )}
                      keyExtractor={(item, index) => index}
                      contentContainerStyle={{alignItems: 'center', justifyContent: 'center',}}
                    />
                  </View>
                </View>
              )
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
