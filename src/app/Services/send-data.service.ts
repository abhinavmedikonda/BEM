import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Request, RequestMethod, Response,JsonpModule } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class SendDataService {
    public projectDetails = new EventEmitter<Object>();
    public pushDat = new EventEmitter<Object>();
    private _baseURL = 'https://dcmapi.azurewebsites.net/API';
    private _baseURLProjects = this._baseURL + '/Projects';
    private _options: { headers: Headers } = { headers: new Headers({ 'Content-Type': 'application/json' }) };

    constructor(private _http: Http, private _route: Router) {}
    emitProjectDetails(f)
    {
        this.projectDetails.emit(f);
    }
    getConfigurationsByProjectId(id: number):Observable<any>{
        return this._http
            .get(this._baseURL+"/BuildConfigurations/GetBuildConfigurationByProjectId/"+id, this._options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    create(project: any,subUrl:any) {
       return this._http.post(this._baseURL+subUrl, project, this._options);

    }

    put(project: any,subUrl:any) {
       return this._http.put(this._baseURL+subUrl, project, this._options);

    }

    onReadData()
    {

            }
  emitProjectSelected(f)
            {   this.pushDat.emit(f);
                this._route.navigate(['view-project']);


            }
    redirect(response)
    {

    this._route.navigate(['/']) ;

    }
  onSuccess(response, f) {

        this._route.navigate(['/']);
    }
    read(url): Observable<any> {
        return this._http
            .get(this._baseURL+url, this._options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    update(project: any): Observable<any> {
        return this._http
            .put(`${this._baseURLProjects}/${project._id}`, project)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    delete(projectId: any,url): Observable<any> {

        return this._http
            .delete(this._baseURL+url+ projectId)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    list(): Observable<any> {
        return this._http
            .get(this._baseURLProjects)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }

}
