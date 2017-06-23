import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../Services/send-data.service';

@Component({
    selector: 'app-view-project',
    templateUrl: './view-project3.html',

})
export class ViewProjectComponent implements OnInit {
    _mapProjectData = [];
    _mapProjectData1 = [];
    projectName = {
        name: "", id: ""
    };
    activeModal = false;
    _initialLoad = {
        initialProjectLoad: true,
        initialPhaseLoad: true,
        initialMilestoneload: true,
        initialConfigLoad: true,
        initialDeviceLoad: true
    }
    _mapMilestoneData;
    _mapPhaseData;
    _mapDeviceData;
    _mapConfigurationData;
    constructor(private _getData: SendDataService) {

        this._getData.pushDat.subscribe((data) => {
            this._getAllProjects();
            this._getSelectedProject(data);


        })



    }
    _getSelectedProject(d) {
        var project;
        project = this._mapProjectData1.filter(function (arr) {
            return arr.Name == d;

        });
        this._initialLoad.initialProjectLoad = true;
        this._initialLoad.initialPhaseLoad = true;
        this._initialLoad.initialMilestoneload = true;
        this._initialLoad.initialDeviceLoad = true;
        this._initialLoad.initialConfigLoad = true;
        this._getProjetData(project[0].Id);
    }
    _getAllProjects() {
        //initialise spinner
        this._getData.read('/Projects').subscribe((response) => {

            this._mapProjectData1 = response;
            this._getProjetData(this._mapProjectData1[0].Id);
            //remove spinner


        })

    }
    deleteProject(f, event) {

        this.projectName.name = f.attributes[1].value;
        this.activeModal = true;
        let project;
        project = this._mapProjectData1.filter(function (arr) {
            return arr.Name == f.attributes[1].value;

        });


    }
    deleteYesClicked() {

        let project;
        var temp = this.projectName.name;
        project = this._mapProjectData1.filter(function (arr) {
            return arr.Name == temp;

        });
        this._getData.delete(project[0].Id, '/Projects/DeleteProject?Id=').subscribe((response) => {
            console.log(response);
            window.location.reload();
            this.activeModal = false;
        })

    }
    deleteCancelClicked() {
        this.activeModal = false;
    }

    getProjectDetails(f, event) {
        event.stopPropagation();
        let project;
        project = this._mapProjectData1.filter(function (arr) {
            return arr.Name == event.currentTarget.innerText;

        });
        this._initialLoad.initialProjectLoad = true;
        this._initialLoad.initialPhaseLoad = true;
        this._initialLoad.initialMilestoneload = true;
        this._initialLoad.initialDeviceLoad = true;
        this._initialLoad.initialConfigLoad = true;
        this._getProjetData(project[0].Id);

    }
    _getProjetData(temp) {


        this._getData.read('/Projects/GetProjectById?Id=' + temp).subscribe((response) => {

            this._mapProjectData = response;
            if (this._initialLoad.initialPhaseLoad == true) {
                this._getPhaseDetails(this._mapProjectData);
                this._initialLoad.initialPhaseLoad = false;
            }

        })
    }
    _getPhaseDetails(project) {
        let temp
        for (let phase of project) {
            temp = phase.Id;
        }
        this._getData.read('/Phases').subscribe((response) => {

            this._mapPhaseData = response;
            this._mapPhaseData = this._mapPhaseData.filter(function (arr) {
                return arr.ProjectId == temp

            });
            if (this._initialLoad.initialMilestoneload == true) {
                this._getMilestones(this._mapPhaseData[0].Id);
                this._initialLoad.initialMilestoneload = false;
            }
        })
    }
    _getMilestones(f) {
        this._getData.read('/MileStones').subscribe((response) => {

            this._mapMilestoneData = response;
            this._mapMilestoneData = this._mapMilestoneData.filter(function (arr) {
                return arr.PhaseId == f;

            });
            if (this._initialLoad.initialDeviceLoad == true && this._mapMilestoneData.length != 0) {
                this._getDevices(this._mapMilestoneData[0].Id);
                this._initialLoad.initialDeviceLoad = false;
            }
            else {
                this._mapDeviceData = null;
                this._mapConfigurationData = null;
            }
            //this._getMilestones(this._mapPhaseData);
        })
    }
    _getDevices(f) {
        this._getData.read('/Devices').subscribe((response) => {

            this._mapDeviceData = response;
            this._mapDeviceData = this._mapDeviceData.filter(function (arr) {
                return arr.MilestoneId == f;

            });
            if (this._initialLoad.initialConfigLoad == true && this._mapDeviceData.length != 0) {
                this._getConfiguration(this._mapDeviceData[0].Id);
                this._initialLoad.initialConfigLoad = false;
            }
            else {
                this._mapConfigurationData = null;
            }
            //this._getMilestones(this._mapPhaseData);
        })
    }
    _getConfiguration(f) {
        this._getData.read('/BuildConfigurations').subscribe((response) => {

            this._mapConfigurationData = response;
            this._mapConfigurationData = this._mapConfigurationData.filter(function (arr) {
                return arr.DeviceId == f;

            });

            // this._getDevices(this._mapMilestoneData[0].Id);
            //this._getMilestones(this._mapPhaseData);
        })
    }
    _populateData(f) {
        console.log(f);
    }
    ngOnInit() {
        this._getAllProjects();


    }

    getPhaseData(f) {
        let getPhase;
        getPhase = this._mapPhaseData.filter(function (arr) {
            return arr.Name == f.innerText;

        });
        this._initialLoad.initialMilestoneload = true;
        this._initialLoad.initialDeviceLoad = true;
        this._initialLoad.initialConfigLoad = true;
        this._getMilestones(getPhase[0].Id);
    }
    getMilestonData(f) {
        let mile;
        mile = this._mapMilestoneData.filter(function (arr) {
            return arr.Name == f.innerText;

        });
        this._initialLoad.initialDeviceLoad = true;
        this._initialLoad.initialConfigLoad = true;
        this._getDevices(mile[0].Id);
    }
    getDeviceData(f) {
        let device;
        device = this._mapDeviceData.filter(function (arr) {
            return arr.Name == f.innerText;

        });
        this._initialLoad.initialConfigLoad = true;
        this._getConfiguration(device[0].Id);
    }


}
