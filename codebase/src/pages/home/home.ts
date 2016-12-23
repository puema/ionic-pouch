import {Component, Inject} from "@angular/core";
import {Article} from "../../app/data/Article";
import {IDatabaseService} from "../../app/data/IDatabaseServie";
import {IGuidService} from "../../app/guid/IGuidService";
import SyncEventEmitter = PouchDB.SyncEventEmitter;
import {ArticleDisplayContainer} from "../../app/data/ArticleDisplayContainer";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(@Inject("IDatabaseService") private pouchDb: IDatabaseService,
              @Inject("IGuidService") private guidService: IGuidService) {

    this.dbEntries = new Array<ArticleDisplayContainer>();

    this.onGetAll();
    this.pouchDb.changeEventEmitter.on('change', (change) => {
      this.onGetAll();
    }).on('error', (err) => {
      console.log(err);
    });
  }

  public dbEntries: Array<ArticleDisplayContainer>;
  public Name: string;
  public syncEventEmitter: SyncEventEmitter;

  public editMode: boolean;

  onPut(): void {
    let guid = this.guidService.generateGuid();
    let article = new Article(guid, this.Name);
    this.pouchDb.put(article).then((result) => {
      this.Name = "";
    }).catch(function (err) {
      console.log(err);
    });
  }

  onUpdate(container: ArticleDisplayContainer): void {
    console.log(container);
    console.log(container.article);
    this.pouchDb.put(container.article).then((result) => {
      console.log(result);
      container.editMode = false;
    }).catch(function (err) {
      console.log(err);
    });
  }

  onGetAll(): void {
    this.pouchDb.getAll().then((result) => {
      this.dbEntries = new Array<ArticleDisplayContainer>();
      console.log(result.rows);
      for (let response of result.rows) {
        var container = new ArticleDisplayContainer(response.doc);
        this.dbEntries.push(container);
      }
    }).catch(function (err) {
      console.log(err);
    });
  }

  onEdit(container: ArticleDisplayContainer) {
    container.editMode = true;
  }

  onDelete(article: Article) {
    this.pouchDb.delete(article).then((result) => {
      console.log(result);
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
}
