import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[upload-host]'
})
export class UploadHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
