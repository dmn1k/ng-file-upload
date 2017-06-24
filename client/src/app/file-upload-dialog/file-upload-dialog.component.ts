import { UploadHostDirective } from './../upload-handler/upload-host.directive';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, ComponentFactoryResolver, ViewChild, NgZone, OnDestroy } from '@angular/core';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'file-upload-dialog',
    templateUrl: 'file-upload-dialog.component.html',
    styleUrls: ['file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent implements OnDestroy {
    @ViewChild('content') contentTemplate: HTMLTemplateElement;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: NgbModal,
        private ngZone: NgZone) {

        const openDialogFunc = (callback) => ngZone.run(() => this.open(this.contentTemplate, callback));

        window['uploadDialogRef'] = {
            component: this,
            zone: ngZone,
            openDialog: openDialogFunc
        };
    }

    open(content, callback?) {
        this.modalService.open(content).result.then((result) => {
            callback();
        }, (reason) => {
            callback();
        });
    }

    ngOnDestroy(): void {
        window['uploadDialogRef'] = null;
    }
}
