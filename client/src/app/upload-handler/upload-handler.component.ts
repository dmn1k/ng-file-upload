import { FileMetadata } from './file-metadata';
import { ProgressHttp } from 'angular-progress-http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id,
    // tslint:disable-next-line:component-selector
    selector: 'upload-handler',
    templateUrl: 'upload-handler.component.html',
    styleUrls: ['upload-handler.component.scss']
})
export class UploadHandlerComponent {
    public progress = 0;
    public showProgressBar = false;

    constructor(private http: ProgressHttp) { }

    upload(file: File) {
        console.log('Upload!');
        this.progress = 0;

        const formData = new FormData();
        formData.append('file', file);

        this.http
            .withUploadProgressListener(p => {
                this.showProgressBar = true;
                this.progress = p.percentage;

            })
            .post('http://localhost:9080/', formData)
            .map(res => <FileMetadata>res.json())
            .subscribe(
            data => console.log(data),
            error => console.log(error),
            () => this.showProgressBar = false
            );
    }
}
