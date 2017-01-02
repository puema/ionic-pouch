import {Component, Inject} from "@angular/core";
import {Article} from "../../app/data/article";
import {IDatabaseService} from "../../app/data/pouch-db.service";
import {IGuidService} from "../../app/guid/guid.service";
import SyncEventEmitter = PouchDB.SyncEventEmitter;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(@Inject("IDatabaseService") private pouchDb: IDatabaseService,
              @Inject("IGuidService") private guidService: IGuidService) {

    this.onGetAll();
    this.pouchDb.changeEventEmitter.on('change', (change) => {
      this.onGetAll();
    }).on('error', (err) => {
      console.log(err);
    });
  }

  public dbEntries: Array<any>;
  public name: string;
  public syncEventEmitter: SyncEventEmitter;

  onPut(): void {
    let guid = this.guidService.generateGuid();
    let article = new Article(guid, this.name);
    this.pouchDb.put(article).then((result) => {
      this.name = "";
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
  }


  onGetAll(): void {
    this.pouchDb.getAll().then((result) => {
      this.dbEntries = result.rows;
    }).catch(function (err) {
      console.log(err);
    });
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
