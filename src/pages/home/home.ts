import {Component, Inject} from "@angular/core";
import {PouchDbService} from "../../app/data/pouchDb.service";
import {Article} from "../../app/data/Article";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Inject(PouchDbService)
export class HomePage {

  constructor(private pouchDb: PouchDbService) {

  }

  public dbEntries: any;

  public Key: string;
  public Name: string;

  onPut(): void {
    let article = new Article(this.Key, this.Name);
    this.pouchDb.put(article);
  }


  onGetAll(): void {
    this.pouchDb.getAll().then((result) => {
      this.dbEntries = result.rows;
    }).catch(function (err) {
      console.log(err);
    });
  }

  onSync(): void {
    this.pouchDb.sync();
  }


}
