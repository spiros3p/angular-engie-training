import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceDescription',
})
export class ReplaceDescriptionPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (!value) return '-';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    else if (value!.length >= 78) return `${value?.slice(0, 78)}...`;
    return value;
  }
}
