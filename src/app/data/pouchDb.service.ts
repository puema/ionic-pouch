import {Injectable} from '@angular/core';
import PouchDB from 'pouchdb-browser';
import Database = PouchDB.Database;

@Injectable()
export class PouchDbService {
  pouchDb: Database<any>;

  constructor() {
    this.pouchDb = new PouchDB<any>("test");
  }

  put(key: string, value: string) {

    var doc = {
      "_id": key,
      "value": value
    };

    this.pouchDb.put(doc);
  }

  getAll(): any {
    return this.pouchDb.allDocs({
      include_docs: true,
      attachments: true
    });

  }
}
