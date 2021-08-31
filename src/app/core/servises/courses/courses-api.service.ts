import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs';

const BASE_API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class CoursesApiService {
  constructor(private http: HttpClient) {}
  getCourses(limit: number): Observable<Course[]> {

    return this.http.get<Course[]>(`${BASE_API}/courses?_start=2`,
      {
      params: new HttpParams().set('_limit', `${limit}`),
    }
    );
  }
  deleteCourse(id: number): Observable<{}> {
    return this.http.delete(`${BASE_API}/courses/${id}`);
  }
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${BASE_API}/courses/`, course);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${BASE_API}/courses/${id}`);
  }
  editCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${BASE_API}/courses/${course.id}`, course);
  }
  getFilteredCourses(value: string): Observable<Course[]> {
    // return this.http.get<Course[]>(`${BASE_API}/courses?title_like=${value}`);
    return this.http.get<Course[]>(`${BASE_API}/courses?q=${value}`);
  }
}
