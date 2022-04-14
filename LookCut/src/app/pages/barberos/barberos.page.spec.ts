import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarberosPage } from './barberos.page';

describe('BarberosPage', () => {
  let component: BarberosPage;
  let fixture: ComponentFixture<BarberosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarberosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
