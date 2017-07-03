import ButtonTrigger from './ButtonTrigger';
import NotificationAction from './NotificationAction';

const services = {};

export const loadServices = () => {
  services[1] = new ButtonTrigger();
  services[2] = new NotificationAction();
};

export const getServiceById = (id) => {
  return services[id];
};

