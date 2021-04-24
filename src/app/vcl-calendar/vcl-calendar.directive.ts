import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Output, Renderer2, ViewContainerRef, EventEmitter, Input } from '@angular/core';
import { VclCalendarComponent } from './vcl-calendar.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[vclCalendar]'
})
export class VclCalendarDirective {

  @Input() currentDate: string;
  @Input() maxDate: string;
  @Input() minDate: string;
  @Input() disabledWeekend = false;

  @Output() chosenDate = new EventEmitter();

  vclCalendar: HTMLElement;

  constructor(
      private el: ElementRef,
      private renderer: Renderer2,
      private componentFactoryResolver: ComponentFactoryResolver,
      private viewContainerRef: ViewContainerRef) { }

  @HostListener('click')
  onClick = () => {
    !this.vclCalendar ? this.show() : this.hide();
  }

  @HostListener('window:resize', ['$event'])
  onResize = () => {
    if (this.vclCalendar){
      this.setPosition();
    }
  }

  show = () => {
    this.create();
    this.setPosition();
  }

  hide = () => {
    this.el.nativeElement.focus();
    this.renderer.removeChild(document.body, this.vclCalendar);
    this.vclCalendar = null;
  }

  create = () => {
    this.vclCalendar = this.renderer.createElement('span');

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(VclCalendarComponent);

    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    if (this.currentDate){
      componentRef.instance.currentDate = this.currentDate;
    }

    if (this.maxDate){
      componentRef.instance.maxDate = this.maxDate;
    }

    if (this.minDate){
      componentRef.instance.minDate = this.minDate;
    }

    if (this.disabledWeekend){
      componentRef.instance.disabledWeekend = this.disabledWeekend;
    }

    componentRef.instance.chosenDate.subscribe(data => this.chosenDate.emit(data));
    componentRef.instance.close.subscribe(() => this.hide());

    this.renderer.appendChild(
      this.vclCalendar,
      componentRef.injector.get(VclCalendarComponent).elRef.nativeElement
   );

    this.renderer.appendChild(document.body, this.vclCalendar);
  }

  setPosition = () => {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const top = hostPos.bottom + 10;
    const left = hostPos.left;

    this.renderer.setStyle(this.vclCalendar, 'position', 'absolute');
    this.renderer.setStyle(this.vclCalendar, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.vclCalendar, 'left', `${left}px`);
  }

}
