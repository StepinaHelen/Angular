import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appBorder]',
})
export class BorderDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.defaultDate = '';
  }
  @Input() defaultDate: string;

  ngOnInit() {
    const data1: any = Date.parse(this.defaultDate);
    const date2: any = Date.now();
    let diff: any = (date2 - data1) / (3600 * 24 * 1000);
    if (diff < 14) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'border',
        '3px ridge #0bc5f3'
      );
    }
  }
}
