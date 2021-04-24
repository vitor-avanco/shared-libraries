import { Component, ElementRef, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ISelect, ISelectOutput } from './iselect.interface';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vcl-select',
  templateUrl: './vcl-select.component.html',
  styleUrls: ['./vcl-select.component.scss']
})

export class VclSelectComponent implements OnInit {

  @Input() optionsList: Array<ISelect>;

  @Output() optionSelected = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  timestamp = new Date().getTime();

  show = false;

  componentsId = {
    label: `vclSelectLabel${this.timestamp}`,
    button: `vclSelectButton${this.timestamp}`,
    list: `vclSelectList${this.timestamp}`,
    selected: ''
  };

  selectedOption: ISelectOutput;

  toggle = () => this.show = !this.show;

  trackByIdentity = (index: number, item: any) => item;

  setSelectValue = (listIndex: number, isDisabled: boolean) => {
    if (isDisabled){
      return;
    }
    this.selectedOption = this.optionsList[listIndex];
    this.selectedOption.id = `${this.componentsId.list}${listIndex}`;

    (document.getElementById(this.componentsId.button) as HTMLElement).focus();
    this.optionSelected.emit(this.selectedOption);
    this.toggle();
  }

  navigationListFocus = (currentIndex: number, navDirection: string) => {

    if (navDirection === 'up' && !currentIndex) {
      return ;
    }

    if (navDirection === 'down' && this.optionsList.length === currentIndex + 1) {
      return ;
    }

    if (navDirection === 'up') {
      (document.querySelectorAll(`.${this.componentsId.list}`)[currentIndex - 1] as HTMLElement).focus();
      return ;
    }

    (document.querySelectorAll(`.${this.componentsId.list}`)[currentIndex + 1] as HTMLElement).focus();
  }

  @HostListener('document:click', ['$event'])
  clickout = (event: Event) => {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  tabKeyPress = (event: Event, shift: boolean, currentIndex?: number) => {

    if (shift){
      this.show = false;
      return;
    }

    if (this.optionsList.length === currentIndex + 1){
      this.show = false;
    }

  }

  ngOnInit(): void {
    this.componentsId.selected = this.componentsId.label;

    this.optionsList.find( item => {
      if (item.selected){
        this.selectedOption = item;
      }
    });

    if (!this.selectedOption) {
      this.selectedOption = this.optionsList[0];
    }
  }

}
