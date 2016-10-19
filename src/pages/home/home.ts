import {Component, Inject} from "@angular/core";
import {PouchDbService} from "../../app/data/pouchDb.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
//  uses: [
//    PouchDbService
//  ]
})
//@Inject(PouchDbService)
export class HomePage {

  constructor(private pouchDb : PouchDbService) {

  }

  onPut (key : string, value : string) : void {
    this.pouchDb.put(key, value);
  }


  onGetAll () : void {
    console.log('Get all clicked!');
  }

}
