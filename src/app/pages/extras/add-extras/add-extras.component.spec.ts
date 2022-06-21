import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtrasComponent } from './add-extras.component';

describe('AddExtrasComponent', () => {
  let component: AddExtrasComponent;
  let fixture: ComponentFixture<AddExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
