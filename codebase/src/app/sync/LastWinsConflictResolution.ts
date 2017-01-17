import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {ConflictResolutionStrategyBase} from "./ConflictResolutionStrategyBase";
import {Injectable, Inject} from "@angular/core";
import {IDatabaseService} from "../data/pouch-db.service";
import {Article} from "../data/Article";
import {ConflictResolutionResult} from "./ConflictResolutionResult";

@Injectable()
export class LastWinsConflictResolution extends ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    super(database);
  }

  protected evaluateConflictingArticles(revisions: Article[]): ConflictResolutionResult {
    let sortedArray : Article[] = revisions.sort((article1, article2) => article1.timestamp.valueOf() - article2.timestamp.valueOf());

    let winningArticle: Article = sortedArray.shift();

    return new ConflictResolutionResult(winningArticle, sortedArray);
  }
}
