import { AsyncStorage } from 'react-native';

import { getChannel } from '../src/api/channel';
import api from '../src/api/poselink';
import Combination from './Combination';
import ServiceManager from './ServiceManager';

class CombinationManager {

  constructor() {
    this.combinations = [];
    this.handleChannel = this.handleChannel.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  handleChannel(channel) {
    console.log('join trigger');
    channel.join()
      .receive('ok', res => {
        console.log('Successed to join trigger channel');
        channel.on('trigger', this.handleTrigger);
      })
      .receive('error', res => {
        console.log('Failed to join trigger channel');
      });
  }

  handleTrigger(data) {
    let combination = this.getCombinationById(data.combination_id);
    combination.executeAction(data.payload);
  }

  async connectToSocket() {
    let user = await api.getCurrentUser();
    let channel = await getChannel(`trigger:${user.id}`);
    this.handleChannel(channel);
  }

  async loadAllCombinations() {
    try {
      let combinations = await api.getCombinations();
      await combinations.forEach((combination) => {
        this.loadCombination(combination);
      });
    } catch (error) {
      console.log(error);
    }
  }

  loadCombination(combination) {
    let combinationInstance = new Combination(combination);
    this.combinations.push(combinationInstance);
  }

  createCombination(combination) {
    let combinationInstance = new Combination(combination);
    this.combinations.push(combinationInstance);
    combinationInstance.apply();
  }

  applyCombinations() {
    this.combinations.forEach(combination => {
      if (combination.status == 1) {
        combination.apply();
      }
    });
  }

  async reloadAllCombinations() {
    await this.unloadAllCombinations();
    await this.loadAllCombinaions();
  }

  async unloadAllCombinations() {
    await this.combinations.forEach((combination)=> {
      let trigger = ServiceManager.getServiceById(combination.getTrigger().serviceId);
      trigger.destroy();
    })

    this.combinations = [];
  }

  removeCombination(combination) {
    this.combinations = this.combinations.filter((_combination) => {
      if (_combination.getId() != combination.id) {
        return _combination.getId() != combination.id;
      } else {
        _combination.destroy();
      }
    });
  }

  getCombinations() {
    return this.combinations;
  }

  getCombinationById(id) {
    let combinations = this.combinations.filter((combination) => {
      return combination.getId() == id;
    });
    return combinations[0];
  }
}

export default new CombinationManager();
