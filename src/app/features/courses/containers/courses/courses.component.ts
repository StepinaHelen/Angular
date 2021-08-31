import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Course } from 'src/app/core/models/course.model';
import { CoursesService } from '../../service/courses.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/components/spinner/service/spinner.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  limit: number = 2;
  start: number = 2;
  
  coursesLenght: number;
  
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(
    []
  );
  public courses$: Observable<Course[]> = this.courses$$.asObservable();

  showSpinner: boolean = false;

  notFound: boolean = false;

  searchControl = new FormControl('');
  constructor(
    public coursesServise: CoursesService,
    public spinnerService: SpinnerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllCourses();


    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.coursesServise.getFilteredCourses(value);
        }),
        tap((data: any) => {
          this.notFound = false;
          this.courses$$.next(data);
          this.cdr.detectChanges();
        })
      )
      .subscribe((value) => {
        if (value.length === 0) {
          this.notFound = true;
          this.cdr.detectChanges();
        }
      });
  }

  getAllCourses() {
    this.coursesServise.getCourses(this.limit).subscribe({
      next: (data: Course[]) => {
        this.getQueryParams()
        this.courses$$.next(data);
        this.coursesLenght = data.length;
        this.cdr.detectChanges();
      },
    });
  }

  handleDelete(id: number) {
    this.coursesServise
      .deleteCourse(id)
      .pipe(
        switchMap(() => {
          return this.coursesServise.getCourses(this.limit);
        }),
        tap((data) => {
          this.courses$$.next(data);
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  handleEdit(id: number) {
    this.cdr.detectChanges();
    this.router.navigate([`/courses`, id],);
  }
  getQueryParams() {
    this.router.navigate([`/courses`],{
      queryParams: { _start: this.start, _limit: this.limit },
    });
  }

  handleLoadMore() {
    this.limit += 2;
     if(this.limit> this.coursesLenght+2){
         this.notFound = true;
     } 
       this.getAllCourses();
  }
}
