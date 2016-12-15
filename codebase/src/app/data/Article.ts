export class Article {
  _id: string;
  _rev: string;
  value: string;


  constructor(id: string, value: string) {
    this._id = id;
    this.value = value;
  }
}
