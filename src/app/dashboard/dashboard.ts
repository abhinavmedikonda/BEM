import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../Services/send-data.service';
import { ViewProjectComponent} from '../view-project/view-project';
@Component({
    templateUrl: './dashboard.html',

})
export class DashboardComponent implements OnInit {

    constructor(private SendDataService: SendDataService) { }

    ngOnInit() {
        this.SendDataService.onReadData();

    }

}
