import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { AppRoutes } from "./app.routing";
import { DashboardComponent } from "./Dashboard/dashboard";
import { AddProjectComponent } from './add-project/add-project';
import { MyDatePickerModule } from 'mydatepicker';
import { SendDataService } from './Services/send-data.service';
import { AccesseriesModule } from './add-accesseries/accesseries.module';
import { ViewModule } from '../app/view-project/view-project.module';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
// import { ModalComponent } from './modal/modal.component';



@NgModule({
    declarations: [
        AppComponent, DashboardComponent, AddProjectComponent,
    ],
    imports: [

        BrowserModule, ViewModule, NguiAutoCompleteModule,
        JsonpModule,
        FormsModule,
        HttpModule,
        MyDatePickerModule, AccesseriesModule,
        RouterModule.forRoot(AppRoutes),
    ],
    providers: [SendDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
