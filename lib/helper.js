import api from '../src/api/poselink';
import ButtonTrigger from './ButtonTrigger';
import NotificationAction from './NotificationAction';

const SERVICE_MAP = {
  'trigger': {
    'button': ButtonTrigger
  },
  'action': {
    'notification': NotificationAction
  }
};

const services = [];

export const loadServices = async () => {
  loadedServices = await api.getServices();
  loadedServices.forEach(service => {
    let Service = SERVICE_MAP[service.type][service.name];

    services.push(new Service({
      id: service.id,
      type: service.type,
      name: service.name,
      icon: service.icon
    }));
  });
  console.log(services);
};

export const getServiceById = (id) => {
  let filterServices = services.filter(service => (
    service.id == id
  ));
    return filterServices[0] || null;
};

export const getServiceByTypeName = (type, name) => {
  let filterServices = services.filter(service => (
    (service.type == type) && (service.name == name)
  ));
  console.log(services);
  return filterServices[0] || null;
};
