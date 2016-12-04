import {Injectable} from '@angular/core';
import {Article} from "./Article";
import {IDatabaseService} from "./IDatabaseServie";
import PouchDB from 'pouchdb-browser';
import Database = PouchDB.Database;
import ChangeEventEmitter = PouchDB.ChangeEventEmitter;
import AllDocsResponse = PouchDB.Core.AllDocsResponse;
import Response = PouchDB.Core.Response;


@Injectable()
export class PouchDbService implements IDatabaseService {
  pouchDb: Database<Article>;
  remoteDb: Database<Article>;
  changeEventEmitter: ChangeEventEmitter;

  constructor() {
    this.pouchDb = new PouchDB<Article>("test");
    this.remoteDb = new PouchDB<Article>("http://localhost:8100/testdb");
    this.changeEventEmitter = this.pouchDb.changes({
      since: 'now',
      live: true,
      include_docs: true
    });
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
    this.pouchDb.sync(this.remoteDb, {retry: true, live: true});
  }
}
