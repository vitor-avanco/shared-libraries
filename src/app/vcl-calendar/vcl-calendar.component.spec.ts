import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VclCalendarComponent } from './vcl-calendar.component';

describe('VclCalendarComponent', () => {
  let component: VclCalendarComponent;
  let fixture: ComponentFixture<VclCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VclCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VclCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
