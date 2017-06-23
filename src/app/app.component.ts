import { Component } from '@angular/core';
import { SendDataService } from './Services/send-data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.comp.html',



})
export class AppComponent {
    _mapProjectData1
    constructor(private SendDataService: SendDataService) {
        this.SendDataService.read('/Projects').subscribe((response) => {

            this._mapProjectData1 = response;
})

    }
    projectSelected(f) {
        console.log(f.innerText);
        this.SendDataService.emitProjectSelected(f.innerText);
    }
}
