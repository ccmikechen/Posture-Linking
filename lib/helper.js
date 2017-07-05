import api from '../src/api/poselink';
import serviceMap from './services';

const services = [];

export const loadServices = async () => {
  loadedServices = await api.getServices();
  loadedServices.forEach(service => {
    let Service = serviceMap[service.type][service.name];
    services.push(new Service({
      classification: service.classification,
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

export const getTriggerService = () => {
  let filterServices = services.filter(service => (
    (service.type == 'trigger')
  ));
  console.log(services);
  return filterServices || null;
}

export const getActionService = () => {
  let filterServices = services.filter(service => (
    (service.type == 'action')
  ));
  console.log(services);
  return filterServices || null;
}