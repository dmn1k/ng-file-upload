import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { UploadHandlerComponent } from './upload-handler/upload-handler.component';
import { HttpModule } from '@angular/http';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProgressHttpModule } from 'angular-progress-http';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { UploadHostDirective } from './upload-handler/upload-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    UploadHostDirective,
    UploadHandlerComponent,
    FileUploadDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ProgressHttpModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UploadHandlerComponent]
})
export class AppModule { }
