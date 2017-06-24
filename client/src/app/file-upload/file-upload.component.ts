import { UploadHostDirective } from './../upload-handler/upload-host.directive';
import { UploadHandlerComponent } from './../upload-handler/upload-handler.component';
import { Component, ElementRef, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import 'rxjs/operator/map';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'file-upload',
    templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
    @Input() multiple = false;
    @ViewChild('fileInput') inputEl: ElementRef;
    @ViewChild(UploadHostDirective) uploadHost: UploadHostDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    upload() {
        const inputEl: HTMLInputElement = this.inputEl.nativeElement;
        const fileCount: number = inputEl.files.length;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UploadHandlerComponent);
        const viewContainer = this.uploadHost.viewContainerRef;
        viewContainer.clear();

        if (fileCount > 0) {
            for (let i = 0; i < fileCount; i++) {
                const uploadHandler = viewContainer.createComponent(componentFactory);
                uploadHandler.instance.upload(inputEl.files.item(i));
            }
        }
    }
}
