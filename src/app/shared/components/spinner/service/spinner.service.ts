import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SpinnerService {
  public spinner$ = new BehaviorSubject<boolean>(false);
  constructor() {}
  requestStart() {
    this.spinner$.next(true);
  }
  requestEnd() {
    this.spinner$.next(false);
  }
}










// то что было

// export class SpinnerService {
//   private spinner$ = new BehaviorSubject<boolean>(false);

//   public loading$$ = this.spinner$.asObservable();

//   constructor() {}
//   requestStart() {
//     this.spinner$.next(true);
//   }
//   requestEnd() {
//     this.spinner$.next(false);
//   }
// }