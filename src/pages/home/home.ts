import {Component, Inject} from "@angular/core";
import {PouchDbService} from "../../app/data/pouchDb.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Inject(PouchDbService)
export class HomePage {

  constructor(private pouchDb: PouchDbService) {

  }

  public dbEntries: any;

  onPut(key: string, value: string): void {
    this.pouchDb.put(key, value);
  }


  onGetAll(): void {
    this.pouchDb.getAll().then((result) => {
      this.dbEntries = result.rows;
    }).catch(function (err) {
      console.log(err);
    });
  }
}
