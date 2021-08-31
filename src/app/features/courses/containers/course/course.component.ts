import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Course } from 'src/app/core/models/course.model';
import { CoursesService } from '../../service/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  id: number;
  course: Course;

  constructor(
    public coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id
    
    if (this.id) {
   this.activatedRoute.data.pipe(
  tap((data: any) => {
    this.cdr.detectChanges();
          this.cdr.detectChanges();
          this.coursesService.course$$.next(data[0])
        })
      ).subscribe();
    }
  }
  editHandler(course: Course) {
    this.coursesService.editCourse(course).subscribe();
  }
  addHandler(course: Course) {
    this.coursesService.addCourse(course).subscribe();
  }
}
