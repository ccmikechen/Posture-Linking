import { AsyncStorage } from 'react-native';
import api from '../src/api/poselink';
import Combination from './Combination';
import { getServiceById } from './helper';

class CombinationManager {
  constructor() {
    this.combinations = [];
  }

  async loadAllCombinaions() {
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
    if(combinationInstance.getCombination().status == 1) {
      combinationInstance.apply();
    }
  }

  applyCombinations() {
    this.combinations.forEach(combination => {
      combination.apply();
    });
  }

  async reloadAllCombinations() {
    await this.combinations.forEach((combination)=> {
      let trigger = getServiceById(combination.getTrigger().serviceId);
      trigger.destroy();
    })
    this.combinations = [];
    await this.loadAllCombinaions();
  }

  removeCombination(combination) {
    this.combinations = this.combinations.filter((_combination) => {
      if(_combination.getId() != combination.id) {
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

const combinationManager = new CombinationManager();

export const getCombinationManager = () => {
  return combinationManager;
};
