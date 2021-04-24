import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VclSelectComponent } from './vcl-select.component';

describe('VclSelectComponent', () => {
  let component: VclSelectComponent;
  let fixture: ComponentFixture<VclSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VclSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VclSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
