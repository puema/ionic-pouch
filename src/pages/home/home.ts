import {Component, Inject} from "@angular/core";
import {Article} from "../../app/data/Article";
import {IDatabaseService} from "../../app/data/IDatabaseServie";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(@Inject("IDatabaseService") private pouchDb: IDatabaseService,
              @Inject("IGuidService") private guidService: IGuidService) {

  }

  public dbEntries: Array<any>;

  public Key: string;
  public Name: string;

  onPut(): void {
    let guid = this.guidService.generateGuid();
    let article = new Article(guid, this.Name);
    this.pouchDb.put(article).then((result) => {
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

  onSync(): void {
    this.pouchDb.sync();
  }


}
