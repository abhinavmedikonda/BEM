import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AccesseriesComponent } from '../add-accesseries/accesseries';
import { AppRoutes } from '../app.routing';



@NgModule({
  declarations: [AccesseriesComponent

  ],
  imports: [

    BrowserModule,
    FormsModule,
    HttpModule,

    RouterModule.forRoot(AppRoutes),
  ],
  providers: [],

})
export class AccesseriesModule { }
