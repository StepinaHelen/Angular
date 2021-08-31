import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses',
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then(
        (module) => module.CoursesModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then(
        (module) => module.AboutModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/error/error.module').then(
        (module) => module.ErrorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
