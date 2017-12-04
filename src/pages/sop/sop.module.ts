import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SopPage } from './sop';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SopPage,
  ],
  imports: [
    IonicPageModule.forChild(SopPage),
    TranslateModule.forChild()
  ],
})
export class SopPageModule {}
