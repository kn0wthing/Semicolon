import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrpageComponent } from './qrpage.component';

describe('QrpageComponent', () => {
  let component: QrpageComponent;
  let fixture: ComponentFixture<QrpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrpageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
