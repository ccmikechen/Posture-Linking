class Service {

  constructor({id, type, name, icon, classification}) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.icon = icon;
    this.classification = classification;
  }

  getName() {
    return this.name;
  }

  getIcon() {
    return this.icon;
  }
}


export default Service;
