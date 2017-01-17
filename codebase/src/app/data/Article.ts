export class Article {
  _id: string;
  _rev: string;
  _conflicts: string[];
  timestamp: Date;
  value: string;


  constructor(id: string, value: string) {
    this._id = id;
    this.value = value;
  }
}
