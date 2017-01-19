import {Injectable} from '@angular/core';
import {Article} from "./article";
import PouchDB from 'pouchdb-browser';
import Database = PouchDB.Database;
import ChangeEventEmitter = PouchDB.ChangeEventEmitter;
import AllDocsResponse = PouchDB.Core.AllDocsResponse;
import Response = PouchDB.Core.Response;
import SyncEventEmitter = PouchDB.SyncEventEmitter;

export interface IDatabaseService {
  changeEventEmitter: ChangeEventEmitter;
  put(article: Article): Promise<Response>;
  getByRev(id: string, rev: string): Promise<Article>;
  getAll(): Promise<AllDocsResponse<Article>>;
  delete(article: Article): Promise<Response>;
  deleteByRev(id: string, rev: string): Promise<Response>;
  sync(): SyncEventEmitter;
}

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
    article.timestamp = new Date();
    return this.pouchDb.put(article);
  }

  getByRev(id: string, rev: string): Promise<Article> {
    return this.pouchDb.get(id, {rev: rev});
  }

  getAll(): Promise<AllDocsResponse<Article>> {
    return this.pouchDb.allDocs({
      include_docs: true,
      conflicts: true
    });
  }

  delete(article: Article): Promise<Response> {
    return this.pouchDb.remove(article);
  }

  deleteByRev(id: string, rev: string): Promise<Response> {
    return this.pouchDb.remove(id, rev).catch(function (err) {
      console.error(err);
    });
  }

  sync(): SyncEventEmitter {
    return this.pouchDb.sync(this.remoteDb, {retry: true, live: true});
  }
}
