import { Injectable } from '@angular/core';
import { Course } from 'src/app/core/models/course.model';
import { CoursesApiService } from 'src/app/core/servises/courses/courses-api.service';
import { SpinnerService } from 'src/app/shared/components/spinner/service/spinner.service';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  showSpinner: boolean = false;
  subscription: Subscription;

  public course$$: BehaviorSubject<Course | null> =new BehaviorSubject<Course | null>(null);
  public course$: Observable<Course | null> = this.course$$.asObservable();

  constructor(
    private coursesApiService: CoursesApiService,
    public spinnerService: SpinnerService,
    private router: Router,
     private route: ActivatedRoute,
  ) {}

  getCourses(limit: number): Observable<Course[]> {
    this.spinnerService.requestStart();

    return this.coursesApiService
      .getCourses(limit)
      .pipe(finalize(() => this.spinnerService.requestEnd()));
  }

  deleteCourse(id: number): Observable<{}> {
    this.spinnerService.requestStart();
    return this.coursesApiService
      .deleteCourse(id)
      .pipe(finalize(() => this.spinnerService.requestEnd()));
  }

  addCourse(course: Course) {
    this.spinnerService.requestStart();

    return this.coursesApiService.addCourse(course).pipe(
      tap(() => this.router.navigate(['/courses'])),
      finalize(() => this.spinnerService.requestEnd())
    );
  }

  editCourse(course: Course) {
    this.spinnerService.requestStart();
    return this.coursesApiService.editCourse(course).pipe(
      tap(() => this.router.navigate(['/courses'])),
      finalize(() => this.spinnerService.requestEnd())
    );
  }

  getCourseById(id: number): Observable<Course> {
    this.spinnerService.requestStart();
    return this.coursesApiService.getCourse(id).pipe(
      tap((data: any) => {
     
        this.course$$.next(data);
      }),
      finalize(() => this.spinnerService.requestEnd())
    );
  }

  getFilteredCourses(value: string) {
    this.spinnerService.requestStart();

    return this.coursesApiService
      .getFilteredCourses(value)
      .pipe(finalize(() => this.spinnerService.requestEnd()));
  }
}
