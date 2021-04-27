import { Component, ElementRef, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ISelect, ISelectOutput } from './iselect.interface';
import { Search } from './search';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vcl-select',
  templateUrl: './vcl-select.component.html',
  styleUrls: ['./vcl-select.component.scss']
})

export class VclSelectComponent implements OnInit {

  @Input() initialValue: string;

  @Input() searchPlaceholder = 'filtrar';

  @Input() showSearch = false;

  @Input() optionsList: Array<ISelect>;

  @Output() optionSelected = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  timestamp = new Date().getTime();

  show = false;

  a11yFeedbackText: string;

  list: Array<ISelect>;

  search = new Search();

  componentsId = {
    label: `vclSelectLabel${this.timestamp}`,
    button: `vclSelectButton${this.timestamp}`,
    list: `vclSelectList${this.timestamp}`,
    selected: ''
  };

  selectedOption: ISelectOutput;

  toggle = () => this.show = !this.show;

  trackByIdentity = (index: number, item: any) => item;

  filterList = (text: string) => {
    if (!text || text === ''){
      this.list = this.optionsList;
      return;
    }
    this.list = this.optionsList.filter(item => item.label.includes(text) || item.value.includes(text));
    this.a11yFeedback();
  }

  a11yFeedback = () => {

    this.a11yFeedbackText = '';

    if (!this.list.length){
      this.a11yFeedbackText = 'nenhum resultado encontrado';
    }

    if (this.list.length === 1){
      this.a11yFeedbackText = '1 resultado encontrado';
    } else {
      this.a11yFeedbackText = `${this.list.length} resultados encontrados`;
    }

    setTimeout( () => this.a11yFeedbackText = '', 1000);

  }

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
    this.list = this.optionsList;

    this.list.find( item => {
      if (this.initialValue && this.initialValue === item.value){
        this.selectedOption = item;
        return false;
      }
      if (item.selected){
        this.selectedOption = item;
        return false;
      }
    });

    if (!this.selectedOption) {
      this.selectedOption = this.list[0];
    }
  }

}
