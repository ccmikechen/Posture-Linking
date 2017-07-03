import ButtonTrigger from './ButtonTirgger';
import NotificationAction from './NotifiactionAction';
import CombinationManager from './CombinationManager';
import Combination from './Combination';

const services = {};
const combination = {};

const loadServices = () => {
  services[1] = new ButtonTirgger();
  services[2] = new NotifiactionAction();
};

const getServiceById = (id) => {
  return services[id];
}

const loadCombinations = () => {
  let combinations = CombinationManager.load();
  combinations = combinations.json();
  combinations.forEach(function(item) {
    combination[item.id] = new Combination(item.id, item.name, item.trigger, item.action);
  }, this);
}

export const loadServices;
export const getServiceById;