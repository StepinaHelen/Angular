import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converting',
  pure: false,
})
export class ConvertingPipe implements PipeTransform {
  transform(value: string, ...args: any): unknown {
    let data = Number.parseInt(value);

    let hours: any = Math.floor(data / 60);
    let minute: any = Number(data - hours * 60);

    if (minute < 10) {
      minute = `0${minute}`;
    }
    let transformedData = `${hours}` + 'h ' + `${minute}` + 'min';
    return transformedData;
  }
}
