import Response = PouchDB.Core.Response;
import {Article} from "./Article";
import AllDocsResponse = PouchDB.Core.AllDocsResponse;
import ChangeEventEmitter = PouchDB.ChangeEventEmitter;
import SyncEventEmitter = PouchDB.SyncEventEmitter;

export interface IDatabaseService {
  changeEventEmitter: ChangeEventEmitter;
  put(article: Article): Promise<Response>;
  getAll(): Promise<AllDocsResponse<Article>>;
  delete(article: Article): Promise<Response>
  sync(): SyncEventEmitter;
}

