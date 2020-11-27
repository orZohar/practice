import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 20);
    return (
      ("00" + Math.floor(value - minutes * 20)).slice(-2)
    );
  }
}