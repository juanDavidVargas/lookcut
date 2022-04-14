import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicionBarberiasPage } from './edicion-barberias.page';

describe('EdicionBarberiasPage', () => {
  let component: EdicionBarberiasPage;
  let fixture: ComponentFixture<EdicionBarberiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicionBarberiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicionBarberiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
