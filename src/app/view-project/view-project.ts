import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../Services/send-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../authorizedUser';
import { Role } from '../role';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.html',
})
export class ViewProjectComponent implements OnInit {
  _sub: any;
  _projectId: number;
  _allProjectConfigurations: any[] = [];
  _project;
  _phases = [];
  _phaseId: number;
  _paramPhaseId: number;
  _milestones = [];
  _milestoneId: number;
  _paramMilestoneId: number;
  _devices = [];
  _deviceId: number;
  _deviceName: string;
  _paramDeviceId: number;
  _accessories = [];
  _accessoryId: number;
  _paramAccessoryId: number;
  _configurations = [];
  _configurationId: number;
  _paramConfigurationId: number;
  _distinct: number[] = [];
  _accessoriesLength: number[] = [];
  _deviceDropDownClickedId: number;
  constructor(private route: ActivatedRoute, private _service: SendDataService) { }
  ngOnInit() {
    AuthorizationService.getUserDetails(this._service);
    this._sub = this.route.params.subscribe(params => {
      this._projectId = +params['projectId'];
      params['phaseId'] > 0 ? this._paramPhaseId = params['phaseId'] : null;
      params['milestoneId'] > 0 ? this._paramMilestoneId = params['milestoneId'] : null;
      params['deviceId'] > 0 ? this._paramDeviceId = params['deviceId'] : null;
      params['accessoryId'] > 0 ? this._paramAccessoryId = params['accessoryId'] : null;
      params['configurationId'] > 0 ? this._paramConfigurationId = params['configurationId'] : null;
      this._service.read('/Projects/GetProjectById/' + this._projectId)
        .subscribe(res => {
          this._project = res;
          this._phases = [];
          this._distinct = [];
          this._service.getConfigurationsByProjectId(this._projectId)
            .subscribe(res => {
              this._allProjectConfigurations = res;
              this._allProjectConfigurations.forEach(element => {
                if (element.PhaseId != null && !this._distinct.includes(element.PhaseId)) {
                  this._service.read('/Phases/' + element.PhaseId)
                    .subscribe(res => {
                      this._phases.push(res[0]);
                    });
                  this._distinct.push(element.PhaseId);
                }
              })
              if (this._distinct.length > 0) {
                if (this._paramPhaseId > 0) {
                  this._getMilestones(this._paramPhaseId);
                } else {
                  this._getMilestones(this._distinct[0]);
                }
              }
              else {
                this._getMilestones(0);
              }
            });
        });
    });
  }
  _getMilestones(phaseId: number) {
    this._milestones = [];
    this._distinct = [];
    this._phaseId = phaseId;
    this._allProjectConfigurations
      .filter(element => element.PhaseId == phaseId)
      .forEach(element => {
        if (element.MilestoneId != null && !this._distinct.includes(element.MilestoneId)) {
          this._service.read('/Milestones/' + element.MilestoneId)
            .subscribe(res => {
              this._milestones.push(res[0]);
            });
          this._distinct.push(element.MilestoneId);
        };
      });
    if (this._distinct.length > 0) {
      if (this._paramMilestoneId > 0) {
        this._getDevices(this._paramMilestoneId);
      } else {
        this._getDevices(this._distinct[0]);
      }
    } else {
      this._getDevices(0);
    }
  }
  _getDevices(milestoneId: number) {
    this._devices = [];
    this._distinct = [];
    this._milestoneId = milestoneId;
    let accessories: number[] = [];
    this._allProjectConfigurations
      .filter(element => element.PhaseId == this._phaseId && element.MilestoneId == milestoneId)
      .forEach(element => {
        if (element.DeviceId != null && !this._distinct.includes(element.DeviceId)) {
          this._service.read('/Devices/' + element.DeviceId)
            .subscribe(res => {
              this._devices.push(res[0]);
            });
          this._distinct.push(element.DeviceId);
          accessories = [];
          this._allProjectConfigurations
            .filter(record => record.PhaseId == this._phaseId && record.MilestoneId == milestoneId && record.DeviceId == element.DeviceId && record.DeviceAccessorieId != null)
            .forEach(row => {
              if (row.DeviceAccessorieId != null && !accessories.includes(row.DeviceAccessorieId)) {
                accessories.push(row.DeviceAccessorieId)
              }
            })
          this._accessoriesLength[element.DeviceId] = accessories.length;
        };
      })
    if (this._distinct.length > 0) {
      if (this._paramDeviceId > 0) {
        this._getConfigurationsByDevice(this._paramDeviceId, '');
      } else {
        this._getConfigurationsByDevice(this._distinct[0], '');
      }
    }
    else {
      this._getConfigurationsByDevice(0, '');
    }
  }
  _getConfigurationsByDevice(deviceId: number, mode: string) {
    if (mode != 'deviceDropDownClick') {
      this._deviceDropDownClickedId = 0;
    }
    if (deviceId > 0) {
      this._service.read('/Devices/' + deviceId)
        .subscribe(res => {
          this._deviceName = res[0].Name
        });
    }
    this._configurations = [];
    this._accessories = [];
    this._distinct = [];
    this._configurationId = 0;
    this._accessoryId = 0;
    this._deviceId = deviceId;
    this._configurations = this._allProjectConfigurations
      .filter(element => element.PhaseId == this._phaseId && element.MilestoneId == this._milestoneId && element.DeviceId == deviceId && element.DeviceAccessorieId == null && element.Name != null);
    this._allProjectConfigurations
      .forEach(element => {
        if (element.PhaseId == this._phaseId && element.MilestoneId == this._milestoneId && element.DeviceId == deviceId && element.DeviceAccessorieId != null && !this._distinct.includes(element.DeviceAccessorieId)) {
          this._service.read('/DeviceAccessories/' + element.DeviceAccessorieId)
            .subscribe(res => {
              this._accessories.push(res[0]);
            });
          this._distinct.push(element.DeviceAccessorieId);
        };
      });
    if (this._distinct.length > 0) {
      if (this._paramAccessoryId > 0 && mode !='inScreen') {
        this._deviceDropDownClickedId = this._deviceId;
        this._getConfigurationsByAccessory(this._paramAccessoryId);
      }
      // else {
      //   this._getConfigurationsByAccessory(this._distinct[0]);
      // }
    }
    // else {
    //   this._getConfigurationsByAccessory(0);
    // }
    this._mapUserRequests();
  }
  _getConfigurationsByAccessory(accessoryId: number) {
    this._configurations = [];
    this._configurationId = 0;
    this._accessoryId = accessoryId;
    this._configurations = this._allProjectConfigurations
      .filter(element => element.PhaseId == this._phaseId && element.MilestoneId == this._milestoneId && element.DeviceId == this._deviceId && element.DeviceAccessorieId == accessoryId && element.Name != null);
    if(this._paramConfigurationId > 0){
      this._configurationId = this._paramConfigurationId;
    }
    this._mapUserRequests();
  }
  _mapUserRequests() {
    for (let configuration of this._configurations) {
      this.getUserRequests(configuration.Id).subscribe(data => {
        configuration.UserRequests = data;
      });
    }
  }
  _editConfiguration(configurationId: number): any[] {
    return this._routeToAddProject(8, configurationId);
  }
  _routeToAddProject(level: number, configurationId: number = 0): any[] {
    let _routeParams = [];
    _routeParams.push('/add-project');
    _routeParams.push(this._projectId);
    (this._phaseId > 0 && level > 3) ? _routeParams.push(this._phaseId) : null;
    (this._milestoneId > 0 && level > 4) ? _routeParams.push(this._milestoneId) : null;
    (this._deviceId > 0 && level > 5) ? _routeParams.push(this._deviceId) : null;
    (this._accessoryId > 0 && level > 6) ? _routeParams.push(this._accessoryId) : null;
    if(configurationId > 0 && level > 7){
      (this._accessoryId == 0 && level > 6) ? _routeParams.push(0) : null;
      _routeParams.push(configurationId);
    }
    return _routeParams;
  }
  _deviceDropDownClick(deviceDropDownClickedId: number) {
    this._deviceDropDownClickedId = deviceDropDownClickedId;
    this._getConfigurationsByDevice(deviceDropDownClickedId, 'deviceDropDownClick');
  }
  getUserRequests(buildConfigurationId): any {
    // return this._service.read("/UserRequests/GetUserRequestByBuildConfigUserId?id=" + buildConfigurationId + "&userId=" + AuthorizationService.UserId).map( /// <<<=== use `map` here
    return this._service.read("/UserRequests/GetUserRequestByBuildConfigurationId/" + buildConfigurationId).map(
      (response) => {
        return response;
      });
  }
  editDetails(buildConfigurationId, userRequestId, event) {
    let userRequest;
    let userRequests = this._configurations
      .find(element => element.Id == buildConfigurationId).UserRequests;
    for (let i = 0; i < userRequests.length; i++) {
      for (let j = 0; j < userRequests[i].length; j++) {
        if (userRequests[i][j].Id == userRequestId) {
          userRequest = userRequests[i][j];
        }
      }
    }
    if (userRequestId == "" || userRequestId == undefined) {
    }
    else {
      this.edit(userRequest, buildConfigurationId, userRequestId);
    }
  }
  edit(userRequest, buildConfigurationId, userRequestId) {
    let req = {
      Id: userRequest.Id,
      BuildConfigurationId: buildConfigurationId,
      RequestedQty: userRequest.RequestedQty,
      Location: userRequest.Location,
      SubSystem: userRequest.SubSystem,
      Priority: userRequest.Priority,
      UserName: userRequest.UserName
      // TeamId: 1 ,
    }
    this._service.put(req, '/UserRequests/UpdateUserRequest/' + userRequestId).subscribe((response) => {
    });
  }
  enableEdit(event) {
    if (this._canUpdateRecordInURT()) {
      let editItems = event.currentTarget.parentNode.parentNode.getElementsByTagName("input");
      for (var items of editItems) {
        items.disabled = false;
      }
    }
  }
  _haveAddPermission(): boolean {
    return AuthorizationService.UserRole == Role.BuildPM;
  }
  _canAddRecordInURT(): boolean {
    return AuthorizationService.UserRole == Role.Tester;
  }
  _canUpdateRecordInURT(): boolean {
    return AuthorizationService.UserRole == Role.BuildPM || AuthorizationService.UserRole == Role.LeadPM;
  }
  _canDeleteRecordInURT(): boolean {
    return AuthorizationService.UserRole == Role.BuildPM || AuthorizationService.UserRole == Role.LeadPM;
  }
}
