import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SopEditorPage } from './sop-editor';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SopEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(SopEditorPage),
    TranslateModule.forChild()
  ],
})
export class SopEditorPageModule {}
