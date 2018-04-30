import { Component,OnInit } from '@angular/core';
import { SendDataService } from './Services/send-data.service';
import { Router } from '@angular/router';
import { AuthorizationService } from './authorizedUser';
import { Role } from './role';

@Component({
  selector: 'app-root',
  templateUrl: './app.comp.html'
})
export class AppComponent implements OnInit {
  ngOnInit(){
    AuthorizationService.getUserDetails(this._service);
    this._service.onReadData();
  }
  _mapProjectData1
  constructor(private _service: SendDataService, private _route:Router) {
    this._service.read('/Projects').subscribe((response) => {

      this._mapProjectData1 = response;
 })

  }
  projectSelected(f) {
    this._service.emitProjectSelected(f.innerText);
  }
  getProjectDetails(f)
  {
   var projectID ;
    projectID = this._mapProjectData1.filter((arr)=>
 {
  return arr.Name == f.innerText;
 });

 this._route.navigate(['/view-project/'+projectID[0].Id]);
 this._service.emitProjectDetails(projectID[0]);
 }
navigateToProject():any[]{
  if(AuthorizationService.UserRole=="BuildPM"){
    let _routeParams=[];
    _routeParams.push('/add-project');
    return _routeParams;
  }
}
_haveAddPermission():boolean{
  return AuthorizationService.IsBuildPM;
}
GetUserRole():String{
  return AuthorizationService.UserRole;
}
}
