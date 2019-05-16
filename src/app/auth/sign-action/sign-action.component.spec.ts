import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignActionComponent } from './sign-action.component';

describe('SignActionComponent', () => {
  let component: SignActionComponent;
  let fixture: ComponentFixture<SignActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
