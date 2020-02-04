import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempletesComponent } from './templetes.component';

describe('TempletesComponent', () => {
  let component: TempletesComponent;
  let fixture: ComponentFixture<TempletesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempletesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
