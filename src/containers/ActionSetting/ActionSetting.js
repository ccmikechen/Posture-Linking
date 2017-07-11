import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { setActionConfig, getEvent, setSelectedOption } from '../../actions/combinationActions';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

class ActionSetting extends React.Component {
  constructor(props) {
    super(props);
    this.config={};
  }

  componentWillMount() {
    this.props.getEvent(this.props.selectedActionConfig);
  }

  renderSetting(event) {
    return event.options.map(option=> {
      switch (option.type) {
        case 'option':
          return this.renderOption(option)
        case 'textarea':
          return this.renderTextArea(option)
      };
    });
  };

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  onSelectOption(value, name) {
    this.config[name] = value; 
    console.log(this.config[name])
    this.props.setSelectedOption(value);
  }

  renderOption(option) {
    return(
      <View style={{flex:1}}>
        <Text>{option.name}</Text>
        <View style={styles.optionValueContainer}>
          <Select
            width={250}
            ref={`SELECT:${option.name}`}
            optionListRef={this._getOptionList.bind(this)}
            onSelect={(value) => this.onSelectOption(value, option.name)}
            defaultValue="請選擇時間"
           >
            {option.options.map(ItemOption=>(
              <Option 
                value={ItemOption.toString()}
                key={ItemOption.toString()}>
                  {ItemOption.toString()}
              </Option>
            ))}
          </Select>
           <OptionList ref="OPTIONLIST"/>
        </View>
      </View>
    )
  };

  renderTextArea(option) {
    return (
      <View>
        <Text>{option.name}</Text>
        <TextInput
          style={{height:100, backgroundColor:'#FFF', borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', fontSize:16}}
          multiline = {true}
          numberOfLines = {4}
          maxLength={200}
          autoCapitalize = {'none'}
          onChangeText = {(text) => this.onSelectOption(text, option.name)}
        />
      </View>
    )
  }

  handleOK() {
    let data= {
      ...this.config,
      text: this.props.selectedEvent.description
    };
    console.log(this.config)
    this.props.setActionConfig(data);
    this.props.navigator.popToRoot({
      animationType: 'slide-down'
    });
  };

  render() {
    let event = this.props.selectedEvent;
    return (
      <View style={{flex:1, padding:15}}>
        {this.props.isGettingEvent ? 
        <View style={{flex:1}}>
          <Text style={{fontSize:24}}>{event.name}</Text>
          <Text style={{fontSize:16, marginBottom:10}}>{event.description}</Text>
            {this.renderSetting(event)}
          <TouchableOpacity onPress={() => this.handleOK()}>
            <View style={{alignItems:'center', height:60, borderRadius:5, backgroundColor:'#2aceba', justifyContent:'center', marginTop:20, marginLeft:20, marginRight:20}}>
              <Text style={{fontSize:20, color:'#fff', textAlign:'center'}}>確認</Text>
            </View>
          </TouchableOpacity>
        </View>
        :
        <ActivityIndicator
            animating={true}
            size='large'
            color='grey'
            />
        }
      </View>
    )
  }
}

export default connect((state) =>(
  {
    actionId: state.getIn(['combination', 'actionId']),
    selectedActionConfig: state.getIn(['combination', 'selectedActionConfig']),
    isGettingEvent: state.getIn(['combination', 'isGettingEvent']),
    selectedEvent: state.getIn(['combination', 'selectedEvent']),
    selectedOption: state.getIn(['combination', 'selectedOption']),
  }), {
    setActionConfig,
    getEvent,
    setSelectedOption
  })(ActionSetting);