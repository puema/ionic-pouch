import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {ConflictResolutionStrategyBase} from "./ConflictResolutionStrategyBase";
import {Injectable, Inject} from "@angular/core";
import {IDatabaseService} from "../data/pouch-db.service";
import {ConflictResolutionResult} from "./ConflictResolutionResult";
import {Article} from "../data/article";

@Injectable()
export class MergeConflictResolution extends ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    super(database);
  }

  public getName() : string {
    return "Zusammenführen";
  }

  protected evaluateConflictingArticles(revisions: Article[]): ConflictResolutionResult {

    console.log(revisions);

    let sortedArray : Article[] = revisions.sort((article1, article2) => article1.timestamp.valueOf() - article2.timestamp.valueOf());7

    let resultValue: string = "";
    for (let article of sortedArray) {
      resultValue = resultValue + "/" + article.value;
    }

    // Update WinningArticle, flag all Articles for deletion
    var winningArticle = revisions[0];
    winningArticle.value = resultValue;

    return new ConflictResolutionResult(winningArticle, revisions);
  }
}
