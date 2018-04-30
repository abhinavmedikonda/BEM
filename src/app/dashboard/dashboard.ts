import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../Services/send-data.service';
import{ ViewProjectComponent} from '../view-project/view-project';
import{AuthorizationService} from '../authorizedUser';
import{ Role} from '../role';
@Component({
  templateUrl: './dashboard.html',

})
export class DashboardComponent implements OnInit {

  constructor(private _Service:SendDataService) { }

  ngOnInit() {
    AuthorizationService.getUserDetails(this._Service);
    this._Service.onReadData();

  }
navigateToProject():any[]{
  if(AuthorizationService.UserRole==Role.BuildPM){
    let _routeParams=[];
    _routeParams.push('/add-project');
    return _routeParams;
  }
}
_haveAddPermission():boolean{
  return AuthorizationService.IsBuildPM;
}
}
