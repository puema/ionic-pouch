import {Article} from "../data/Article";

export class ConflictResolutionResult {

  public _winningArticle: Article;
  public _articlesToDelete: Article[];

  constructor(winningArticle: Article, articlesToDelete: Article[]) {
    this._winningArticle = winningArticle;
    this._articlesToDelete = articlesToDelete;
  }

}
