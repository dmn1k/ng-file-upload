import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProgressHttp } from 'angular-progress-http';

import 'rxjs/operator/map';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'file-upload',
    templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
    @Input() multiple = false;
    @ViewChild('fileInput') inputEl: ElementRef;

    public progress = 0;
    public showProgressBar = false;

    constructor(private http: ProgressHttp) { }

    upload() {
        console.log('Upload!');
        this.progress = 0;

        const inputEl: HTMLInputElement = this.inputEl.nativeElement;
        const fileCount: number = inputEl.files.length;
        const formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('file[]', inputEl.files.item(i));
            }
            this.http
                .withUploadProgressListener(p => {
                    this.showProgressBar = true;
                    console.log(p.percentage);
                    this.progress = p.percentage;

                })
                .post('http://localhost:9080/upload', formData)
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error),
                    () => this.showProgressBar = false
                );

            // do whatever you do...
            // subscribe to observable to listen for response
        }
    }
}