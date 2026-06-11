export class Location {
  constructor(name, lat, lng, info, date) {
    //this.id = crypto.randomUUID(); // Generuje unikalny identyfikator
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.info = info;
    this.visitedAt = date;
  }
}
