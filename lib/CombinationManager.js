import { AsyncStorage } from 'react-native';
import api from '../src/api/poselink';
import Combination from './Combination';

class CombinationManager {
  constructor() {
    this.combinations = [];
  }

  async loadAllCombinaions() {
    try {
      let combinations = await api.getCombinations();
      combinations.forEach((combination) => {
        this.loadCombination(combination);
      });
    } catch (error) {
      console.log(error);
    }
  }

  loadCombination(combination) {
    let combinationInstance = new Combination(combination);
    this.combinations.push(combinationInstance);
    combinationInstance.apply();
  }

  async reload() {
    this.combinations =[];
    await load();
  }

  removeCombination(combination) {
    combination.destroy();
    this.combinations = this.combinations.filter((_combination) => {
      return _combination.id != combination.id
    })
  }

  async save(combinations) {
    let json = JSON.stringify(combinations);
    try {
      await AsyncStorage.setItem('@combinations', json);
    } catch (error) {
      console.log(error);
    }
  }

  getCombinations() {
    return this.combinations;
  }
}

const combinationManager = new CombinationManager();

export const getCombinationManager = () => {
  return combinationManager;
};
