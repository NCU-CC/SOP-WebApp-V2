import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedSopPage } from './saved-sop';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SavedSopPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedSopPage),
    TranslateModule.forChild()
  ],
})
export class SavedSopPageModule {}
