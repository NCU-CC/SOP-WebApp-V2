import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySopPage } from './my-sop';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MySopPage,
  ],
  imports: [
    IonicPageModule.forChild(MySopPage),
    TranslateModule.forChild()
  ],
})
export class MySopPageModule {}
