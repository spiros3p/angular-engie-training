import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[angularEngieTrainingHighlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('lightgray');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('white');
  }

  constructor(private element: ElementRef) {}

  private highlight(color: string) {
    (this.element.nativeElement as HTMLElement).style.backgroundColor = color;
  }
}
