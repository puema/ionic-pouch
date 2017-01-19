import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {ConflictResolutionStrategyBase} from "./ConflictResolutionStrategyBase";
import {Injectable, Inject} from "@angular/core";
import {IDatabaseService} from "../data/pouch-db.service";
import {Conflict} from "./Conflict";

@Injectable()
export class MergeConflictResolution extends ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    super(database);
  }

  public getName(): string {
    return "Zusammenführen";
  }

  protected evaluateConflictingArticles(conflict: Conflict): Conflict {
    let resultValue: string = conflict.currentWinner.value;
    for (let article of conflict.conflicts) {
      resultValue = resultValue + article.value + " / ";
    }

    // Update WinningArticle, flag all Articles for deletion
    conflict.currentWinner.value = resultValue;

    return conflict;
  }
}
