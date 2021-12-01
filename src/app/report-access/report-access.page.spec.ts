import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportAccessPage } from './report-access.page';

describe('ReportAccessPage', () => {
  let component: ReportAccessPage;
  let fixture: ComponentFixture<ReportAccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
