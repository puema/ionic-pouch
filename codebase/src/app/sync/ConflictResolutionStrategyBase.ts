import {IConflictResolutionStrategy} from "./IConflictResolutionStrategy";
import {Inject} from "@angular/core";
import {IDatabaseService} from "../data/pouch-db.service";
import {Article} from "../data/Article";
import {Conflict} from "./Conflict";

export abstract class ConflictResolutionStrategyBase implements IConflictResolutionStrategy {

  private _syncing: boolean = false;

  protected readonly _database: IDatabaseService;

  constructor(@Inject("IDatabaseService") database: IDatabaseService) {
    this._database = database;
  }

  public abstract getName(): string;

  private resolveConflict(conflict: Conflict) {

    for (let article of conflict.conflicts) {
      this._database.deleteByRev(article._id, article._rev);
    }

    this._database.put(conflict.currentWinner);
  }

  private hasConflicts(article: Article): boolean {
    return article._conflicts.length > 0;
  }

  public checkForConflicts(article: Article) {
    if (this._syncing) {
      return;
    }

    if (this.hasConflicts(article)) {

      this._syncing = true;

      this.getConflictingRevisions(article).then((result) => {
        let conflict: Conflict = this.evaluateConflictingArticles(result);
        this.resolveConflict(conflict);
        this._syncing = false;
      });

    }
  }

  protected abstract evaluateConflictingArticles(conflict: Conflict): Conflict;

  public getConflictingRevisions(article: Article): Promise<Conflict> {
    //
    // var promise =  this._database.getByRev(article._id, article._conflicts).then((result) => { // !!!!!!!
    //   let collection: Article[] = [];
    //   for (let art of result.rows) {
    //
    //     if (art.value.rev == article._rev) {
    //       continue;
    //     }
    //
    //     collection.push(art.doc);
    //   }
    //   return new Conflict(article, collection);
    // });
    //
    // Promise.resolve(promise);
    //
    // return promise;


    var conflicts: string[] = article._conflicts;
    let promises: Promise<Article>[] = [];

    for (let conflict of conflicts) {
      let promise: Promise<Article> = this._database.getByRev(article._id, conflict);

      promises.push(promise);
    }

    return Promise.all(promises).then((result) => {
      console.log(result);
      return new Conflict(article, result);
    });
  }
}
