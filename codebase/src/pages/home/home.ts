import {Component, Inject} from "@angular/core";
import {Article} from "../../app/data/article";
import {IDatabaseService} from "../../app/data/pouch-db.service";
import {IGuidService} from "../../app/guid/guid.service";
import SyncEventEmitter = PouchDB.SyncEventEmitter;
import {ArticleDisplayContainer} from "../../app/data/ArticleDisplayContainer";
import { ToastController } from 'ionic-angular';
import {IConflictResolutionStrategy} from "../../app/sync/IConflictResolutionStrategy";
import {ConflictResolutionStrategyFactory} from "../../app/sync/ConflictResolutionStrategyFactory";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(@Inject("IDatabaseService") private pouchDb: IDatabaseService,
              @Inject("IGuidService") private guidService: IGuidService,
              @Inject("ConflictResolutionStrategyFactory") private conflictResolverFactory: ConflictResolutionStrategyFactory,
              private toastCtrl: ToastController) {

    this.dbEntries = new Array<ArticleDisplayContainer>();
    this.strategies = conflictResolverFactory.strategies;
    this.selectedStrategy = this.strategies[0];

    this.onGetAll();
    this.pouchDb.changeEventEmitter.on('change', (change) => {
      this.onGetAll();
    }).on('error', (err) => {
      console.log(err);
    });
  }

  public dbEntries: Array<ArticleDisplayContainer>;
  public name: string;
  public syncEventEmitter: SyncEventEmitter;

  public editMode: boolean;
  public strategies: IConflictResolutionStrategy[];
  public selectedStrategy: IConflictResolutionStrategy;

  onPut(): void {
    let guid = this.guidService.generateGuid();
    let article = new Article(guid, this.name);
    this.pouchDb.put(article).then((result) => {
      this.name = "";
      this.presentToast("Entry added.");
    }).catch(function (err) {
      console.log(err);
    });
  }

  onUpdate(container: ArticleDisplayContainer): void {
    this.pouchDb.put(container.article).then((result) => {
      this.presentToast("Entry updated.");
      container.editMode = false;
    }).catch(function (err) {
      console.log(err);
    });
  }

  onGetAll(): void {
    this.pouchDb.getAll().then((result) => {
      this.dbEntries = new Array<ArticleDisplayContainer>();
      for (let response of result.rows) {
        var container = new ArticleDisplayContainer(response.doc);
        this.dbEntries.push(container);

        this.selectedStrategy.checkForConflicts(response.doc);
      }
      this.presentToast("Sync successful.");
    }).catch(function (err) {
      console.log(err);
    });
  }

  onEdit(container: ArticleDisplayContainer) {
    container.editMode = true;
  }

  onDelete(article: Article) {
    this.pouchDb.delete(article).then((result) => {
      this.presentToast("Entry deleted.");
    }).catch(function (err) {
      console.log(err);
    });
  }

  onToggleSync(sync: boolean): void {
    if (sync) {
      this.syncEventEmitter = this.pouchDb.sync();
    } else {
      if (this.syncEventEmitter !== undefined) {
        this.syncEventEmitter.cancel();
      } else {
        console.log("Trying to call cancel on undefined syncEventEmitter");
      }
    }
  }

  festSelected(strategy): void {
    console.log(strategy);
  }

  presentToast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
