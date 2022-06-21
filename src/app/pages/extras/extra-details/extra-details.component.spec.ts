import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraDetailsComponent } from './extra-details.component';

describe('ExtraDetailsComponent', () => {
  let component: ExtraDetailsComponent;
  let fixture: ComponentFixture<ExtraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
