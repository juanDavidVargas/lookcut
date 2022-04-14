import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarberiasPage } from './barberias.page';

describe('BarberiasPage', () => {
  let component: BarberiasPage;
  let fixture: ComponentFixture<BarberiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarberiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
