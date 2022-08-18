import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeptoComponent } from './add-depto.component';

describe('AddDeptoComponent', () => {
  let component: AddDeptoComponent;
  let fixture: ComponentFixture<AddDeptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
