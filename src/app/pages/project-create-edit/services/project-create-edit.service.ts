import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IProject } from '../../../shared/interfaces/IProject';


@Injectable({
  providedIn: 'root'
})
export class ProjectCreateEditService {

  constructor(private http: HttpClient) { }

  fetchProjectBy(id: string) {
    return this.http.get<IProject>(`${environment.apiURL}projects/${id}`)
  }

  postProject(project: IProject) {
    return this.http.post(`${environment.apiURL}projects`, project)
  }

  putProject(project: IProject, id: string) {
    return this.http.put(`${environment.apiURL}projects/${id}`, project)
  }

}
