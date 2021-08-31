import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export class CustomValidators {
  static range(control: AbstractControl): ValidationErrors | null {
    if (
      control.value !== undefined &&
      (isNaN(control.value) || control.value < 1 || control.value > 600)
    ) {
      return { range: true };
    } else return null;
  }

  static date(control: AbstractControl): ValidationErrors | null {
    let mathes =
      /^([0-9]{4}[-]?((0[13-9]|1[012])[-]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-]?31|02[-]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-]?02[-]?29)$$/.exec(
        control.value
      );
    if (control.value !== undefined && !mathes) {
      return { date: true };
    } else return null;
  }
  static rangeParams(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        control.value !== undefined &&
        (isNaN(control.value) || control.value < min || control.value > max)
      ) {
        return { range: true };
      } else return null;
    };
  }
}
