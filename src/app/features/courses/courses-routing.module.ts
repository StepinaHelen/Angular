import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseComponent } from './containers/course/course.component';
import { FormResolver } from './components/course-form/resolver/form.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: 'add',
    component: CourseComponent,
  },
  {
    path: ':id',
    component: CourseComponent,
    resolve: [FormResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
