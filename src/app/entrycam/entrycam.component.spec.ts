import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrycamComponent } from './entrycam.component';

describe('EntrycamComponent', () => {
  let component: EntrycamComponent;
  let fixture: ComponentFixture<EntrycamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrycamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrycamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
