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
    closeResult: String;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: NgbModal,
        private ngZone: NgZone) {
        window['uploadDialogRef'] = { component: this, zone: ngZone };
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


    ngOnDestroy(): void {
        window['uploadDialogRef'] = null;
    }
}
