import api from '../src/api/poselink';
import serviceMap from './services';

class ServiceManager {

  constructor() {
    this.services = [];
  }

  async loadServices() {
    loadedServices = await api.getServices();
    loadedServices.forEach(service => {
      let Service = serviceMap[service.type][service.name];
      let serviceInstance = new Service({
        classification: service.classification,
        id: service.id,
        type: service.type,
        name: service.name,
        icon: service.icon,
        events: service.events
      });

      if (serviceInstance.isAvailable()) {
        this.services.push(serviceInstance);
      }
    });
  }

  async reloadServices() {
    this.services.forEach(service => {
      if(service.type == 'trigger') {
        service.destroy();
      }
    });
    this.services.length = 0;

    await this.loadServices();
  }

  async reloadService(id) {
    let newServices = this.services.filter(service => {
      if(service.type == 'trigger' && service.id == id) {
        service.destroy();
      }
      return service.id != id;
    });
    this.services = newServices;

    await this.loadService(id);
  }

  async loadService(id) {
    this.loadedServices = await api.getServices();
    this.loadedServices.forEach(service => {
      if (service.id == id) {
        let Service = serviceMap[service.type][service.name];

        this.services.push(new Service({
          classification: service.classification,
          id: service.id,
          type: service.type,
          name: service.name,
          icon: service.icon,
          events: service.events
        }));
      }
    });

    await this.loadServiceConfigs();
  }

  getServices() {
    let newServices = this.services.map(service => {
      return {
        id: service.id,
        name: service.name,
        icon: service.icon,
        classification: service.classification,
        isConnected: service.isConnected()
      };
    });

    return newServices;
  }

  async disconnectAllService() {
    this.services.forEach(service => {
      service.disconnect();
    });
  }

  async clearAllService() {
    await this.disconnectAllService();
    this.services = [];
  }

  async loadServiceConfigs() {
    let configs = await api.getUserServiceConfigs();

    configs.forEach(config => {
      if (config.status == 'connected') {
        let service = this.getServiceById(config.serviceId);

        if (service) {
          service.connect();
          service.start();
        }
      }
    });
  }

  getServiceById(id) {
    return this.services.reduce((acc, service) => {
      if (service.id == id) {
        return service;
      }
      return acc;
    }, null);
  }

  getServiceByTypeName(type, name) {
    let filteredServices = this.services.filter(service => (
      (service.type == type) && (service.name == name)
    ));
    return filteredServices[0] || null;
  }

  getServiceByEventId(id) {
    let filteredServices = this.services.filter(service => (
      service.events.filter(event => event.id == id)
    ));
    return filteredServices[0] || null;
  }

  getEventById(id) {
    let filteredEvent = [];
    let filteredServices = this.services.filter(service => (
      service.events.map(event => {
        if(event.id == id) {
          filteredEvent = event;
        }
        return event;
      })
    ));
    return filteredEvent || null;
  }

  getEventsByServiceId(id) {
    let filteredServices = this.services.filter(service => (
      service.id == id
    ));

    return filteredServices[0].events || null;
  }

  getTriggerService() {
    let filteredServices = this.services.filter(service => (
      service.type == 'trigger'
    ));
    return filteredServices || null;
  }

  getActionService() {
    let filteredServices = this.services.filter(service => (
      service.type == 'action'
    ));
    return filteredServices || null;
  }
}

export default new ServiceManager();
