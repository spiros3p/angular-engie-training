import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceTitle',
})
export class ReplaceTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length >= 15) return `${value?.slice(0, 12)}...`;
    return value;
  }
}
