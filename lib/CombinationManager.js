import { AsyncStorage } from 'react-native';
import api from '../src/api/poselink';
import Combination from './Combination';

class CombinationManager {
  constructor() {
    this.combinations = [];
  }

  async load() {
    try {
      let combinations = await api.getCombinations();
      combinations.forEach((combination) => {
        let combinationInstance = new Combination(combination);
        this.combinations.push(combinationInstance);
        combinationInstance.apply();
      });
    } catch (error) {
      console.log(error);
    }
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
