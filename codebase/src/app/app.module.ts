import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {PouchDbService} from "./data/pouchDb.service";
import {GuidService} from "./guid/GuidService";
import {LastWinsConflictResolution} from "./sync/LastWinsConflictResolution";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    {provide: "IDatabaseService", useClass: PouchDbService},
    {provide: "IGuidService", useClass: GuidService},
    {provide: "IConflictResolutionStrategy", useClass: LastWinsConflictResolution},
  ]
})
export class AppModule {}
