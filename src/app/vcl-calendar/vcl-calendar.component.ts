import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { range } from "lodash";
import { CalendarDate } from './calendar-date.interface';

declare var moment: any;
const DD_MM_YYYY = 'DD/MM/YYYY';
const MONTHS = 'months';
const MONTH = 'month';
const DAY = 'day';
const DAYS = 'days';

@Component({
  selector: 'app-vcl-calendar',
  templateUrl: './vcl-calendar.component.html',
  styleUrls: ['./vcl-calendar.component.scss']
})

export class VclCalendarComponent implements OnInit {

  @Input() currentDate: string;
  @Input() maxDate: string;
  @Input() minDate: string;
  @Input() disabledWeekend = false;

  @Output() chosenDate = new EventEmitter;
  @Output() close = new EventEmitter;

  moment = (window as any).moment;

  currentDateMoment: any;
  maxDateMoment: any;
  minDateMoment: any;

  namesOfDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'sab'];
  weeks: Array<CalendarDate[]> = [];

  selectedDate: any;

  constructor(public elRef: ElementRef) { }


  private fillDates(currentMoment: any) {
    const firstOfMonth = moment(currentMoment).startOf(MONTHS).day();
    const lastOfMonth = moment(currentMoment).endOf(MONTH).day();

    const firstDayOfGrid = moment(currentMoment).startOf(MONTH).subtract(firstOfMonth, DAYS);
    const lastDayOfGrid = moment(currentMoment).endOf(MONTH).subtract(lastOfMonth, DAYS).add(7, DAYS);
    const startCalendar = firstDayOfGrid.date();

    return range(startCalendar, startCalendar + lastDayOfGrid.diff(firstDayOfGrid, DAYS)).map((date) => {
      const newDate = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
        day: moment(newDate).format("DD"),
        dayName: moment(newDate).format("dddd"),
        month: moment(newDate).format("MMMM"),
        year: moment(newDate).format("YYYY"),
        isWeekend: this.isWeekend(moment(newDate).format("d"))
      };
    });
  }

  private generateCalendar(): void {
    const dates = this.fillDates(this.currentDateMoment);
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private isToday(date: any): boolean {
    return moment().isSame(moment(date), DAY);
  }

  private isWeekend(dayOfWeek: any): boolean {
    return dayOfWeek%6==0;
  }

  private isSelected(date: any): boolean {
    return this.selectedDate === moment(date).format(DD_MM_YYYY);
  }

  public prevMonth(prevMonthDisabled: boolean): void {
    if(prevMonthDisabled){
      return ;
    }
    this.currentDateMoment = moment(this.currentDateMoment).subtract(1, MONTHS);
    this.generateCalendar();
  }

  public nextMonth(nextMonthDisabled: boolean): void {
    if(nextMonthDisabled){
      return ;
    }
    this.currentDateMoment = moment(this.currentDateMoment).add(1, MONTHS);
    this.generateCalendar();
  }

  public isEnabledNextMonth(currentDate): boolean {

    if(this.maxDate){
      return moment(currentDate).isBefore(this.maxDateMoment, MONTHS);
    }
    return true;
  }

  public isEnabledPrevMonth(currentDate): boolean {

    if(this.minDate){
      return moment(currentDate).isAfter(this.minDateMoment, MONTHS);
    }
    return true;
  }

  public isSelectableDate(date: any): boolean {
    //desabilita os dias que nao pertecem ao mes selecionado
    const sameMonth = moment(date).isSame(this.currentDateMoment, MONTH);

    const beforeMinDate = !this.minDate ? false : moment(date).isBefore(this.minDateMoment);

    const afterMaxDate = !this.maxDate ? false : moment(date).isAfter(this.maxDateMoment);;

    return sameMonth && !afterMaxDate && !beforeMinDate;
  }

  public selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format(DD_MM_YYYY);
    this.chosenDate.emit(this.selectedDate);
    this.closeCalendar();
  }

  public getA11yLabel(day: CalendarDate, selected: boolean) {
    return `${day.dayName}, ${day.day} de ${day.month} de ${day.year} ${selected ? 'data selecionada':'selecionar data'}`;
  }

  public closeCalendar(){
    this.close.emit(true);
  }

  public setFocus( selector: string ){
    setTimeout( () => {
      (document.querySelector('.'+selector) as HTMLElement)?.focus();
    }, 0);

  }

  public keyPress(event: KeyboardEvent, current: string, target:string){
    if(current == 'vcl-calendar__close-btn' && (event.keyCode == 9 && !event.shiftKey)){
      this.setFocus(target);
    }

    if(current == 'vcl-calendar__nav-prev' && (event.keyCode == 9 && event.shiftKey)){
      this.setFocus(target);
    }

  }

  ngOnInit(): void {
    this.moment.locale('pt-br');

    if(this.currentDate){
      this.currentDateMoment = moment(this.currentDate, DD_MM_YYYY);
      this.selectedDate = this.currentDate;
    } else {
      this.currentDateMoment = moment();
    }

    if(this.maxDate){
      this.maxDateMoment = moment(this.maxDate, DD_MM_YYYY);
      if(this.currentDateMoment.isAfter(this.maxDateMoment)){
        this.currentDateMoment = this.maxDateMoment;
      }
    }

    if(this.minDate){
      this.minDateMoment = moment(this.minDate, DD_MM_YYYY);

      if(this.currentDateMoment.isBefore(this.minDateMoment)){
        this.currentDateMoment = this.minDateMoment;
      }

    }

    this.generateCalendar();

    this.setFocus('vcl-calendar__nav-prev');
  }

}
