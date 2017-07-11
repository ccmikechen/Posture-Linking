class Service {

  constructor({id, type, name, icon, classification, events}) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.icon = icon;
    this.classification = classification;
    this.events = events;
  }

  getName() {
    return this.name;
  }

  getIcon() {
    return this.icon;
  }

  getEvents() {
    return this.events;
  }
}


export default Service;
