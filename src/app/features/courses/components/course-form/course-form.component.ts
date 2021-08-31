import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CustomValidators } from '../../../../shared/custom.validators';
import { Course } from 'src/app/core/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../service/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent implements OnInit {
  @Input() set course(course: any) {
    if (course && course.id) {
      this.id = course.id;
      this.isEdit = true;
      this.courseForm.patchValue(course);
    }
    this.cdr.detectChanges();
  }



  @Output() add = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();

  id: number | null;
  isEdit: boolean = false;

  courseForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(50)]],
    duration: ['', [Validators.required, CustomValidators.rangeParams(1, 600)]],
    date: ['', [Validators.required, CustomValidators.date]],
    author: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    public coursesService: CoursesService
  ) {}

  ngOnInit(): void {
  }
  get getDuration(): boolean {
    const duration = this.courseForm.get('duration');
    return (
      (!!duration?.hasError('range') && duration?.value.length > 0) ||
      (!!duration?.hasError('range') &&
        !!duration?.touched &&
        duration?.value.length > 0)
    );
  }

  get getData(): boolean {
    const date = this.courseForm.get('date');
    return (
      (!!date?.hasError('date') && !!date?.touched && date?.value.length > 0) ||
      (!!date?.hasError('date') && date?.value.length > 0)
    );
  }
  get isValidTitle(): boolean {
    const title = this.courseForm.get('title');
    return (
      (!!title?.hasError('maxlength') && !!title?.touched) ||
      (!!title?.hasError('maxlength') && title?.value.length > 0)
    );
  }
  get isRequaredTitle(): boolean {
    const title = this.courseForm.get('title');
    return (
      (!!title?.hasError('required') && !!title?.touched) ||
      title?.value.length === 0
    );
  }

  get isValidDescription(): boolean {
    const description = this.courseForm.get('description');
    return (
      (!!description?.hasError('maxlength') && !!description?.touched) ||
      (description?.value.length > 0 && !!description?.hasError('maxlength'))
    );
  }

  get isRequaredDescription(): boolean {
    const description = this.courseForm.get('description');
    return (
      (!!description?.hasError('required') && !!description?.touched) ||
      description?.value.length === 0
    );
  }
  get isRequaredDuration(): boolean {
    const duration = this.courseForm.get('duration');
    return (
      (!!duration?.hasError('required') && !!duration?.touched) ||
      duration?.value.length === 0
    );
  }
  get isRequaredDate(): boolean {
    const date = this.courseForm.get('date');
    return (
      (!!date?.hasError('required') && !!date?.touched) ||
      date?.value.length === 0
    );
  }
  onAdd() {
    if (this.courseForm.valid) {
      this.add.emit(this.courseForm.value);
    }
  }

  onEdit() {
    if (this.courseForm.valid) {
      this.edit.emit({ ...this.courseForm.value, id: this.id });
    }
  }
}
