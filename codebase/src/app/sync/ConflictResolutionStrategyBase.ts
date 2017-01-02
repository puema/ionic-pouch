import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {Inject} from "@angular/core";
import {IDatabaseService} from "../data/IDatabaseServie";
import {Article} from "../data/Article";

export abstract class ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  protected readonly _database: IDatabaseService;

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    this._database = database;
  }

  public resolveFor(id: string) {
    var article: Article;
    article = this._database.getWithConflicts(id).then((article) => {
      return article;
    });
  }
}
