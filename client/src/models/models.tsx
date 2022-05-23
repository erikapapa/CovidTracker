export class Place {
  name: string;
  date: string;
  hours: number;
  isCrowded: boolean;

  constructor(place: any) {
    this.name = place.name;
    this.date = place.date;
    this.hours = place.hours;
    this.isCrowded = place.isCrowded;
  }
}


export class SocInteractions {
  name: string;
  date: string;
  hours: number;
  isSocialDistancing: boolean;

  constructor(social: any) {
    this.name = social.name;
    this.date = social.date;
    this.hours = social.hours;
    this.isSocialDistancing = social.isSocialDistancing;
  }
}

