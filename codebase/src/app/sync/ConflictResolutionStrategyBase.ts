import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {Inject} from "@angular/core";
import {IDatabaseService} from "../data/pouch-db.service";
import {Article} from "../data/Article";
import {ConflictResolutionResult} from "./ConflictResolutionResult";

export abstract class ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  protected readonly _database: IDatabaseService;

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    this._database = database;
  }

  private resolveConflict(currentWinningArticle: Article, nextWinningArticle: Article, revisionsToDelete: Article[]) {
    currentWinningArticle.value = nextWinningArticle.value;

    this._database.deleteByRev(nextWinningArticle._id, nextWinningArticle._rev);

    for (let article of revisionsToDelete) {
      this._database.deleteByRev(article._id, article._rev);
    }

    this._database.put(currentWinningArticle);
  }

  private determineWinningRevision(article: Article): ConflictResolutionResult {
    let conflictingDocuments: Article[] = this.getConflictingRevisions(article);
    return this.evaluateConflictingArticles(conflictingDocuments);
  }

  private hasConflicts(article: Article): boolean {
    return article._conflicts.length > 0;
  }

  public checkForConflicts(article: Article) {
    if (this.hasConflicts(article)) {
      let result: ConflictResolutionResult = this.determineWinningRevision(article);

      this.resolveConflict(article, result._winningArticle, result._articlesToDelete);
    }
  }

  protected abstract evaluateConflictingArticles(revisions: Article[]): ConflictResolutionResult;

  public getConflictingRevisions(article: Article): Article[] {

    let conflictRevisions: string[] = article._conflicts;

    var collection: Article[] = [];
    collection.push(article);

    for (let revision of conflictRevisions) {
      this._database.getByRev(article._id, revision).then((result) => {
        collection.push(result);
      });
    }

    return collection;
  }
}
