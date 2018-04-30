import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppRoutes } from "../app.routing";
import { ViewProjectComponent } from './view-project'
import { MyDatePickerModule } from 'mydatepicker';

import { SendDataService } from '../Services/send-data.service';


@NgModule({
    declarations: [ViewProjectComponent

    ],
    imports: [

        BrowserModule,
        JsonpModule,
        FormsModule,
        HttpModule,
        MyDatePickerModule,
        RouterModule,
    ],
    providers: [SendDataService],

})
export class ViewModule { }
