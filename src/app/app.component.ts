import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  data: string;
  title = 'datepicker';

  optionsList = [
    {
      label: 'selecione uma opção',
      value: 'teste',
      disabled: true
    },
    {
      label: 'opcao 1',
      value: 'opcao1',
      selected: true
    },
    {
      label: 'opcao 2',
      value: 'opcao2'
    },
    {
      label: 'opcao 3',
      value: 'opcao3'
    },
    {
      label: 'opcao 4',
      value: 'opcao4'
    }
  ];

  teste = (data: any) => {
    this.data = data;
  }

  itemSelecionado = (event: any) => {
    console.log(event);
  }}
