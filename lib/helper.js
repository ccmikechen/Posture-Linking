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
      icon: service.icon,
      events: service.events
    }));
  });
  console.log(services);
};

export const reloadServices = async () => {
  services.forEach(service => {
    if(service.type=='trigger') {
      service.destroy();
    }
  })
  services.splice(0, services.length);
  await loadServices();
};

export const getServices = () => {
  let newServices= services.map(service=>{
    return {
      id: service.id,
      name: service.name,
      icon: service.icon,
      classification: service.classification
    }
  });

  return newServices;
};

export const getServiceById = (id) => {
  let filterServices = services.filter(service => (
    service.id == id
  ));
  console.log(filterServices[0])
    return filterServices[0] || null;
};

export const getServiceByTypeName = (type, name) => {
  let filterServices = services.filter(service => (
    (service.type == type) && (service.name == name)
  ));
  return filterServices[0] || null;
};

export const getServiceByEventId = (id) => {
  let filterServices = services.filter(service => (
    service.events.filter(event => event.id == id) 
  ));
  return filterServices[0] || null;
};

export const getEventById = (id) => {
  let filterEvent = [];
  let filterServices = services.filter(service => (
    service.events.map(event => {
      if(event.id == id) {
        filterEvent = event;
      }
       return event;
    }) 
  ));
  return filterEvent || null;
}

export const getEventsByServiceId = (id) => {
  let filterServices = services.filter(service => (
    service.id == id
  ));

  return filterServices[0].events || null;
}

export const getTriggerService = () => {
  let filterServices = services.filter(service => (
    service.type == 'trigger'
  ));
  return filterServices || null;
};

export const getActionService = () => {
  let filterServices = services.filter(service => (
    service.type == 'action'
  ));
  return filterServices || null;
};
