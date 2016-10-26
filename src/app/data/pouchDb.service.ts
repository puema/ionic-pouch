import {Injectable} from '@angular/core';
import PouchDB from 'pouchdb-browser';
import Database = PouchDB.Database;

@Injectable()
export class PouchDbService {
  pouchDb: any;
  remoteDb: Database<any>;

  constructor() {
    this.pouchDb = new PouchDB<any>("test");
    this.remoteDb = new PouchDB<any>("http://localhost:8100/testdb");
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
      include_docs: true
    });

  }

  sync(){
    this.pouchDb.sync(this.remoteDb);
  }
}
