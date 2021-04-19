import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  data: string;

  teste(data: any) {
    this.data = data;
  }
  title = 'datepicker';
}
