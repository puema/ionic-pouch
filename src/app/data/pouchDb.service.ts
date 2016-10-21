import {Injectable} from '@angular/core';
import PouchDB from 'pouchdb-browser';
import Database = PouchDB.Database;

@Injectable()
export class PouchDbService {
  pouchDb : Database<any>;

  constructor () {
    this.pouchDb = new PouchDB<any>("test");
  }

  put (key : string, value : string) {

    var doc = {
      "_id": "mittens",
      "name": "Mittens",
      "occupation": "kitten",
      "age": 3,
      "hobbies": [
        "playing with balls of yarn",
        "chasing laser pointers",
        "lookin' hella cute"
      ]
    };
    this.pouchDb.put(doc);
  }

  getAll () : any {
    return this.pouchDb.allDocs();
  }

}
