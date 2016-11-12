import {Injectable} from '@angular/core';
import PouchDB from 'pouchdb-browser';
import Database = PouchDB.Database;
import {Article} from "./Article";
import AllDocsResponse = PouchDB.Core.AllDocsResponse;
import Response = PouchDB.Core.Response;
import {IDatabaseService} from "./IDatabaseServie";

@Injectable()
export class PouchDbService implements IDatabaseService {
  pouchDb: Database<Article>;
  remoteDb: Database<Article>;

  constructor() {
    this.pouchDb = new PouchDB<Article>("test");
    this.remoteDb = new PouchDB<Article>("http://localhost:8100/testdb");
  }

  put(article: Article): Promise<Response> {
    return this.pouchDb.put(article);
  }

  getAll(): Promise<AllDocsResponse<Article>> {
    return this.pouchDb.allDocs({
      include_docs: true
    });
  }

  delete(article: Article): Promise<Response> {
    return this.pouchDb.remove(article);
  }

  sync() {
    //Cast this.pouchDb to any, as there is no support for sync in the recent definition file
    (<any>this.pouchDb).sync(this.remoteDb);
  }
}
