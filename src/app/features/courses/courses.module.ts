import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseComponent } from './containers/course/course.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoursesComponent, CourseComponent, CourseFormComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
