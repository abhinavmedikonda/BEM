import { Component, OnInit } from '@angular/core';
import { Project } from './addproject.interface';
import { SendDataService } from '../Services/send-data.service';
import { Router } from '@angular/router';


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
    projectNames = [];
    projectEntered: string;
    phaseNames = [];
    phaseEntered: string;
    milestoneNames = [];
    milestoneEntered: string;
    deviceNames = [];
    deviceEntered: string;
    provisioned: boolean;

    userId: number = 50;
    projectId: number;
    milestoneId: number;
    phaseId: number;
    bool = true;

    constructor(private _addProjectService: SendDataService, private _route: Router) { }
    onSubmit(f) {
        this.CreateProject(f);
    }
    ngOnInit() {

        this._addProjectService.read('/Projects')

            .subscribe(x => {

                x.forEach(element => {

                    this.projectNames.push(element.Name);

                });

            });

        this._addProjectService.read('/Phases')

            .subscribe(x => {

                x.forEach(element => {

                    this.phaseNames.push(element.Name);

                });

            });

        this._addProjectService.read('/Milestones')

            .subscribe(x => {

                x.forEach(element => {

                    this.milestoneNames.push(element.Name);

                });

            });

        this._addProjectService.read('/Devices')

            .subscribe(x => {

                x.forEach(element => {

                    this.deviceNames.push(element.Name);

                });

            });

    }
    createPhase(project: any, f) {
        if (f.value.Phase !== "") {

            let req = {
                Name: f.value.Phase,
                ProjectID: project.Id
            }
            this.bool = false;
            this._addProjectService.create(req, "/Phases/CreatePhase").subscribe((response) => {
                console.log(response);

                if (response.statusText == "Created") {
                    let temp
                    temp = response['_body'];
                    if (temp) {
                        temp = JSON.parse(temp);
                        this.phaseId = temp.Id;

                        this.CreateMilestone(temp, f);

                    }
                }
            });
        }
        else {
            this.bool = true;
            this._route.navigate(['/view-project']);
        }
    }
    CreateMilestone(phase: any, f) {
        if (f.value.Phase !== "") {

            let req = {
                Name: f.value.mileStone,
                PhaseID: phase.Id
            }
            this.bool = true;
            this._addProjectService.create(req, "/MileStones/CreateMilestone").subscribe((response) => {
                console.log(response);

                if (response.statusText == "Created") {
                    let temp
                    temp = response['_body'];
                    if (temp) {
                        temp = JSON.parse(temp);
                        this.milestoneId = temp.Id;

                        this.CreateDevice(temp, f);

                    }
                }
            });
        }
        else {
            this.bool = false;
            this._route.navigate(['/view-project']);
        }
    }
    CreateConfiguration(device: any, f) {
        if (f.value.ConfigurationName !== "") {
            this.bool = true;
            let req = {
                Name: f.value.ConfigurationName,
                Components: f.value.components, ApprovedQty: f.value.ApprovedQty,
                SmokeTest: f.value.SmokeTest,
                Provisoned: f.value.Provisioned,
                Remark: f.value.Remark,
                DeviceID: device.Id,
                ProjectId: this.projectId,
                PhaseId: this.phaseId,
                milestoneId: this.milestoneId,
                userId: this.userId,
            }
            this._addProjectService.create(req, "/BuildConfigurations/CreateBuildConfigurations").subscribe((response) => {
                console.log(response);

                if (response.statusText == "Created") {
                    let temp
                    temp = response['_body'];
                    if (temp) {
                        temp = JSON.parse(temp);
                        this.bool = true;
                        this._route.navigate(['/view-project']);


                    }
                }
            });
        }
        else {
            this._route.navigate(['/view-project']);
        }
    }
    CreateDevice(milestone: any, f) {
        if (f.value.Phase !== "") {

            let req = {
                Name: f.value.device,
                MileStoneID: milestone.Id
            }
            this._addProjectService.create(req, "/Devices/CreateDevice").subscribe((response) => {
                console.log(response);

                if (response.statusText == "Created") {
                    let temp
                    temp = response['_body'];
                    if (temp) {
                        temp = JSON.parse(temp);

                        this.CreateConfiguration(temp, f);

                    }
                    return response;
                }
            });
        }
        else {
            this._route.navigate(['/view-project']);
        }
    }
    CreateProject(f) {
        //server side validation should be done here
        if (f.value.Name !== "") {
            let req = { Name: f.value.Name }
            this._addProjectService.create(req, "/Projects/CreateProject").subscribe((response) => {
                console.log(response);

                if (response.statusText == "Created") {
                    let temp
                    temp = response['_body'];
                    if (temp) {
                        temp = JSON.parse(temp);
                        this.projectId = temp.Id;

                        this.createPhase(temp, f);

                    }
                    return response;
                }
            });
        }
        else {
            this._route.navigate(['/view-project']);
        }
    }


}
