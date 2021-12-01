import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UmbraPage } from './umbra.page';

describe('UmbraPage', () => {
  let component: UmbraPage;
  let fixture: ComponentFixture<UmbraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmbraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UmbraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
