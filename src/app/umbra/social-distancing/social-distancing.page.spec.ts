import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialDistancingPage } from './social-distancing.page';

describe('SocialDistancingPage', () => {
  let component: SocialDistancingPage;
  let fixture: ComponentFixture<SocialDistancingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialDistancingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialDistancingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
