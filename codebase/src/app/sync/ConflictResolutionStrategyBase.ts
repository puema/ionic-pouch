import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {Inject} from "@angular/core";
import {IDatabaseService} from "../data/pouch-db.service";

export abstract class ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  protected readonly _database: IDatabaseService;

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    this._database = database;
  }

  public resolveFor(id: string) {
    this._database.getWithConflicts(id).then((article) => {
      return article;
    });
  }
}
