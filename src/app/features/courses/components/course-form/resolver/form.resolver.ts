import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
const BASE_API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class FormResolver implements Resolve<boolean> {
  constructor(private http: HttpClient) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>{
    return this.http.get(`${BASE_API}/courses/${route.params['id']}`);
  }
}
