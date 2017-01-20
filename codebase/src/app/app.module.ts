import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PouchDbService } from './data/pouch-db.service';
import { GuidService } from './guid/guid.service';
import { LastWinsConflictResolution } from './sync/LastWinsConflictResolution';
import { ConflictResolutionStrategyFactory } from './sync/ConflictResolutionStrategyFactory';
import { MergeConflictResolution } from './sync/MergeConflictResolution';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    {provide: 'IDatabaseService', useClass: PouchDbService},
    {provide: 'IGuidService', useClass: GuidService},
    {provide: "LastWinsConflictResolution", useClass: LastWinsConflictResolution},
    {provide: "MergeConflictResolution", useClass: MergeConflictResolution},
    {provide: "ConflictResolutionStrategyFactory", useClass: ConflictResolutionStrategyFactory},
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
