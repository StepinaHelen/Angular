import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {
  @Input() item: any;

  @Output() deleted = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete() {
    this.deleted.emit(this.item.id);
  }
  onEdit() {
    this.edit.emit(this.item.id);
  }
}
