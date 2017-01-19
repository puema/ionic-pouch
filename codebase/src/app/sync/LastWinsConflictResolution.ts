import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {ConflictResolutionStrategyBase} from "./ConflictResolutionStrategyBase";
import {Injectable, Inject} from "@angular/core";
import {IDatabaseService} from "../data/pouch-db.service";
import {Article} from "../data/Article";
import {Conflict} from "./Conflict";

@Injectable()
export class LastWinsConflictResolution extends ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    super(database);
  }

  public getName() : string {
    return "Last Wins";
  }

  protected evaluateConflictingArticles(conflict: Conflict): Conflict {

    let conflicts: Article[] = conflict.conflicts.slice(0);

    conflicts.push(conflict.currentWinner);

    console.log(conflicts);
    console.log(conflicts[0].timestamp.valueOf());

    let sortedArray : Article[] = conflicts.sort((article1, article2) => new Date(article2.timestamp).getTime() - new Date(article1.timestamp).getTime());

    let winningArticle: Article = sortedArray.shift();

    conflict.currentWinner.value = winningArticle.value;

    return conflict;
  }
}
