import { Component, OnInit } from '@angular/core';
import { Project } from './addproject.interface';
import { SendDataService } from '../Services/send-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import{AuthorizationService} from '../authorizedUser';
import { Role } from '../role';

@Component({
  templateUrl: './add-project.html',
  styles: [
    '.noDisplay{display:none !important}',
    '.fullDisplay {background-color: black;display: block;width: 100%;height: 1200px;position: absolute;opacity: 0.5;top: 0;}',
    'figure{margin:0;transform:translate(-50%,-50%) rotate(0deg) scale(1.4,1.4);position:absolute;left:50%;top:50%;border-radius:150px;box-sizing:border-box;animation:rotation 20s infinite linear;}',
    'figure div:after{content:"";width:20px;height:20px;border:1px solid #fff;box-sizing:border-box;position:absolute;left:20px;top:20px;animation:shuffle 2s infinite;}',
    'figure div:nth-child(1){transform:rotate(0deg)}',
    'figure div:nth-child(1):after{animation-delay:-0.5s;}',
    'figure div:nth-child(2){transform:rotate(45deg)}',
    'figure div:nth-child(2):after{animation-delay:-1s;}',
    'figure div:nth-child(3){transform:rotate(90deg)}',
    'figure div:nth-child(3):after{animation-delay:-1.5s;}',
    'figure div:nth-child(4){transform:rotate(135deg)}',
    'figure div:nth-child(4):after{animation-delay:-2s;}',
    'figure div:nth-child(5){transform:rotate(180deg)}',
    'figure div:nth-child(5):after{animation-delay:-2.5s;}',
    'figure div:nth-child(6){transform:rotate(225deg)}',
    'figure div:nth-child(6):after{animation-delay:-3s;}',
    'figure div:nth-child(7){transform:rotate(270deg)}',
    'figure div:nth-child(7):after{animation-delay:-3.5s;}',
    'figure div:nth-child(8){transform:rotate(315deg)}',
    'figure div:nth-child(8):after{animation-delay:-4;}',
    '@keyframes rotation{100%{transform:translate(-50%,-50%) rotate(-360deg) scale(1.4,1.4);}}',
    '@keyframes shuffle{50%{transform:scale(0.4,0.4) rotate(-90deg);border-radius:50%;}}',
  ]
})
export class AddProjectComponent implements OnInit {
  projectList = [];
  projectNames = [];
  projectName: string;
  disableProject: boolean;
  phaseList = [];
  phaseNames = [];
  phaseName: string;
  disablePhase: boolean;
  milestoneList = [];
  milestoneNames = [];
  milestoneName: string;
  disableMilestone: boolean;
  deviceList = [];
  deviceNames = [];
  deviceName: string;
  disableDevice: boolean;
  accessoryList = [];
  accessoryNames = [];
  accessoryName: string;
  disableAccessory: boolean;
  disableConfiguration: boolean;
  provisioned: boolean;
  userId: number = 50;
  projectId: number = 0;
  milestoneId: number = 0;
  phaseId: number = 0;
  deviceId: number = 0;
  accessoryId: number= 0;
  configurationId: number = 0;
  bool = true;
  projectDetails;
  sub;
  wasClicked: boolean = false;
  shippedDate;
  targetDate;
  configuration = {
    Name: '',
    Components: '',
    StartQty: '',
    Yield: '',
    NetQty: '',
    RequestedQty: '',
    SmokeTest: '',
    Provisoned: '',
    ShippedDate: '',
    TargetDate: '',
    Remark: ''
  };
  constructor(private _service: SendDataService, private _route: Router, private _activatedRoute: ActivatedRoute) { }
  onSubmit(f) {
    this.CreateProject(f);
  }
  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(params => {
      params['projectId'] > 0 ? this.projectId = params['projectId'] : this.projectId = null;
      params['phaseId'] > 0 ? this.phaseId = params['phaseId'] : this.phaseId = null;
      params['milestoneId'] > 0 ? this.milestoneId = params['milestoneId'] : this.milestoneId = null;
      params['deviceId'] > 0 ? this.deviceId = params['deviceId'] : this.deviceId = null;
      params['accessoryId'] > 0 ? this.accessoryId = params['accessoryId'] : this.accessoryId = null;
      params['configurationId'] > 0 ? this.configurationId = params['configurationId'] : this.configurationId = null;
      if (params['projectId']) {
        this._service.read('/Projects/GetProjectById/' + params['projectId'])
          .subscribe(res => {
            this.projectName = res[0].Name;
            this.disableProject = true;
          });
      }
      if (params['phaseId']) {
        this._service.read('/Phases/' + params['phaseId'])
          .subscribe(res => {
            this.phaseName = res[0].Name;
            this.disablePhase = true;
          });
      }
      if (params['milestoneId']) {
        this._service.read('/Milestones/' + params['milestoneId'])
          .subscribe(res => {
            this.milestoneName = res[0].Name;
            this.disableMilestone = true;
          });
      }
      if (params['deviceId']) {
        this._service.read('/Devices/' + params['deviceId'])
          .subscribe(res => {
            this.deviceName = res[0].Name;
            this.disableDevice = true;
          });
      }
      if (params['accessoryId'] > 0) {
        this._service.read('/DeviceAccessories/' + params['accessoryId'])
          .subscribe(res => {
            this.accessoryName = res[0].Name;
            this.disableAccessory = true;
          });
      }
      if (params['configurationId']) {
        this._service.read('/BuildConfigurations/GetBuildConfigurationById/' + params['configurationId'])
          .subscribe(res => {
            this.configuration = res[0];
            if(this.configuration.ShippedDate != null){
              let date = new Date(this.configuration.ShippedDate);
              let formatted = this.configuration.ShippedDate.substring(0, 10);
              this.shippedDate = { date: { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() }, formatted: formatted };
            }
            if(this.configuration.TargetDate != null){
              let date = new Date(this.configuration.TargetDate);
              let formatted = this.configuration.TargetDate.substring(0, 10);
              this.targetDate = { date: { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() }, formatted: formatted };
            }
            this.disableConfiguration = true;
            this.disableAccessory = true;
          });
      }
    });
    this._service.read('/Projects')
      .subscribe(x => {
        this.projectList = x;
        x.forEach(element => {
          this.projectNames.push(element.Name);
        });
      });
    this._service.read('/Phases')
      .subscribe(x => {
        this.phaseList = x;
        x.forEach(element => {
          this.phaseNames.push(element.Name);
        });
      });
    this._service.read('/Milestones')
      .subscribe(x => {
        this.milestoneList = x;
        x.forEach(element => {
          this.milestoneNames.push(element.Name);
        });
      });
    this._service.read('/Devices')
      .subscribe(x => {
        this.deviceList = x;
        x.forEach(element => {
          this.deviceNames.push(element.Name);
        });
      });
    this._service.read('/DeviceAccessories')
      .subscribe(x => {
        this.accessoryList = x;
        x.forEach(element => {
          this.accessoryNames.push(element.Name);
        });
      });
  }
  CreateProject(f) {
    if (this.projectName != "" && this.projectName != undefined) {
      this.projectList.forEach(element => {
        if (element.Name == this.projectName) {
          this.projectId = element.Id;
        }
      });
      let req = {
        Name: this.projectName,
        Description: f.value.Description }
      if (this.projectId == null) {
        this._service.create(req, "/Projects/CreateProject").subscribe((response) => {
          if (response.statusText == "Created") {
            let temp
            temp = response['_body'];
            if (temp) {
              temp = JSON.parse(temp);
              this.projectId = temp.Id;
              this.projectDetails = temp;
              this.createPhase(f);
            }
            return response;
          }
        });
      }
      else {
        this.createPhase(f);
      }
    }
  }
  createPhase(f) {
    if (this.phaseName != "" && this.phaseName != undefined) {
      let req = {
        Name: this.phaseName
      }
      this.bool = false;
      this.phaseList.forEach(element => {
        if (element.Name == this.phaseName) {
          this.phaseId = element.Id;
        }
      });
      if (this.phaseId == null) {
        this._service.create(req, "/Phases/CreatePhase").subscribe((response) => {
          if (response.statusText == "Created") {
            let temp
            temp = response['_body'];
            if (temp) {
              temp = JSON.parse(temp);
              this.phaseId = temp.Id;
              this.CreateMilestone(f);
            }
          }
        });
      }
      else {
        this.CreateMilestone(f);
      }
    }
    else {
      this.CreateConfiguration(f);
    }
  }
  CreateMilestone(f) {
    if (this.milestoneName != "" && this.milestoneName != undefined) {
      let req = {
        Name: this.milestoneName
      }
      this.bool = true;
      this.milestoneList.forEach(element => {
        if (element.Name == this.milestoneName) {
          this.milestoneId = element.Id;
        }
      });
      if (this.milestoneId == null) {
        this._service.create(req, "/MileStones/CreateMilestone").subscribe((response) => {
          if (response.statusText == "Created") {
            let temp
            temp = response['_body'];
            if (temp) {
              temp = JSON.parse(temp);
              this.milestoneId = temp.Id;
              this.CreateDevice(f);
            }
          }
        });
      }
      else {
        this.CreateDevice(f);
      }
    }
    else {
      this.CreateConfiguration(f);
    }
  }
  CreateDevice(f) {
    if (this.deviceName != "" && this.deviceName != undefined) {
      let req = {
        Name: this.deviceName
      }
      this.deviceList.forEach(element => {
        if (element.Name == this.deviceName) {
          this.deviceId = element.Id;
        }
      });
      if (this.deviceId == null) {
        this._service.create(req, "/Devices/CreateDevice").subscribe((response) => {
          if (response.statusText == "Created") {
            let temp
            temp = response['_body'];
            if (temp) {
              temp = JSON.parse(temp);
              this.deviceId = temp.Id;
              this.CreateAccessory(f);
            }
            return response;
          }
        });
      }
      else {
        this.CreateAccessory(f);
      }
    }
    else {
      this.CreateAccessory(f);
    }
  }
  CreateAccessory(f) {
    if (this.accessoryName != "" && this.accessoryName != undefined) {
      let req = {
        Name: this.accessoryName
      }
      this.accessoryList.forEach(element => {
        if (element.Name == this.accessoryName) {
          this.accessoryId = element.Id;
        }
      });
      if (this.accessoryId == null) {
        this._service.create(req, "/DeviceAccessories/CreateDeviceAccessory").subscribe((response) => {
          if (response.statusText == "Created") {
            let temp;
            temp = response['_body'];
            if (temp) {
              temp = JSON.parse(temp);
              this.accessoryId = temp.Id;
              this.CreateConfiguration(f);
            }
            return response;
          }
        });
      }
      else {
        this.CreateConfiguration(f);
      }
    }
    else {
      this.CreateConfiguration(f);
    }
  }
  CreateConfiguration(f) {
    this.bool = true;
    let req = {
      Name: this.configuration.Name.replace(/\s+/g,' ') == "" ? null : this.configuration.Name.replace(/\s+/g,' '),
      Components: f.value.components,
      StartQty: f.value.StartQty,
      Yield:f.value.Yield,
      NetQty:f.value.NetQty,
      RequestedQty:f.value.RequestedQty,
      SmokeTest: f.value.SmokeTest ? true : false,
      Provisoned: f.value.Provisioned ? true : false,
      ShippedDate: (this.shippedDate == undefined) ? null : new Date(this.shippedDate.formatted),
      TargetDate: (this.targetDate == undefined) ? null : new Date(this.targetDate.formatted),
      Remark: f.value.Remark,
      DeviceID: this.deviceId == 0 ? null : this.deviceId,
      DeviceAccessorieId: this.accessoryId == 0 ? null : this.accessoryId,
      ProjectId: this.projectId == 0 ? null : this.projectId,
      PhaseId: this.phaseId == 0 ? null : this.phaseId,
      milestoneId: this.milestoneId == 0 ? null : this.milestoneId,
      userId: this.userId
    }
    this._service.create(req, "/BuildConfigurations/CreateBuildConfiguration").subscribe((response) => {
      if(response.json().Id){
        let putObject = {
          Name: this.configuration.Name.replace(/\s+/g,' ') == "" ? null : this.configuration.Name.replace(/\s+/g,' '),
          Components: f.value.components,
          StartQty: f.value.StartQty,
          Yield:f.value.Yield,
          NetQty:f.value.NetQty,
          RequestedQty:f.value.RequestedQty,
          SmokeTest: f.value.SmokeTest ? true : false,
          Provisoned: f.value.Provisioned ? true : false,
          ShippedDate: (this.shippedDate == undefined) ? null : new Date(this.shippedDate.formatted),
          TargetDate: (this.targetDate == undefined) ? null : new Date(this.targetDate.formatted),
          Remark: f.value.Remark,
          DeviceID: this.deviceId == 0 ? null : this.deviceId,
          DeviceAccessorieId: this.accessoryId == 0 ? null : this.accessoryId,
          ProjectId: this.projectId == 0 ? null : this.projectId,
          PhaseId: this.phaseId == 0 ? null : this.phaseId,
          milestoneId: this.milestoneId == 0 ? null : this.milestoneId,
          userId: this.userId,
          IsActive: true,
          Id: response.json().Id
        }
        this._service.put(putObject, "/BuildConfigurations/UpdateBuildConfiguration/"+response.json().Id )
        .subscribe(response => console.log(response));
        this._route.navigate(this._routeToViewProject());
        this._service.emitProjectDetails(this.projectId);
      }
      else
      if (response.statusText == "Created") {
        let temp
        temp = response['_body'];
        if (temp) {
          temp = JSON.parse(temp);
          this.bool = true;
          this._route.navigate(this._routeToViewProject());
          this._service.emitProjectDetails(this.projectId);
        }
      }
    });
  }
  _routeToViewProject(): any[] {
    let _routeParams = [];
    if (this.projectId > 0) {
      _routeParams.push('/view-project');
      this.projectId > 0 ? _routeParams.push(this.projectId) : null;
      this.phaseId > 0 ? _routeParams.push(this.phaseId) : null;
      this.milestoneId > 0 ? _routeParams.push(this.milestoneId) : null;
      this.deviceId > 0 ? _routeParams.push(this.deviceId) : null;
      this.accessoryId > 0 ? _routeParams.push(this.accessoryId) : null;
      if( this.configurationId > 0){
      (this.accessoryId == 0 || this.accessoryId == null) ? _routeParams.push(0) : null;
      _routeParams.push(this.configurationId);
    }
    }
    else {
      _routeParams.push('/dashboard');
    }
    return _routeParams;
  }
  onClick(){
    this.wasClicked=!this.wasClicked;
  }
  _haveAddPermission(): boolean {
    return AuthorizationService.UserRole == Role.BuildPM;
  }
}
