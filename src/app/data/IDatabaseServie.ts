import Response = PouchDB.Core.Response;
import {Article} from "./Article";
import AllDocsResponse = PouchDB.Core.AllDocsResponse;

export interface IDatabaseService {
  put(article: Article): Promise<Response>;
  getAll(): Promise<AllDocsResponse<Article>>;
  sync();
}

