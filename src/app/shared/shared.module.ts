import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { BorderDirective } from '../directives/border.directive';
import { ConvertingPipe } from '../pipes/converting.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    CourseItemComponent,
    BorderDirective,
    ConvertingPipe,
    SpinnerComponent,
  ],
  exports: [CourseItemComponent, SpinnerComponent],
  imports: [CommonModule],
})
export class SharedModule {}
