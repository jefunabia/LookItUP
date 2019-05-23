import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsaComponent } from './tsa.component';

describe('TsaComponent', () => {
  let component: TsaComponent;
  let fixture: ComponentFixture<TsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
