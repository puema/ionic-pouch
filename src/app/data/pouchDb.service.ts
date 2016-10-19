import {Injectable} from '@angular/core';

@Injectable()
export class PouchDbService {
  pouchDb : PouchDB.Database<{propertyName: 'hallo'}>;

  constructor () {
    this.pouchDb = new PouchDB('TestBase');
  }

  put (key : string, value : string) : void {
    this.pouchDb.put(new PouchDB.Core.Document('TestDocument'));
  }

  getAll () : any {
    return this.pouchDb.allDocs();
  }

}
