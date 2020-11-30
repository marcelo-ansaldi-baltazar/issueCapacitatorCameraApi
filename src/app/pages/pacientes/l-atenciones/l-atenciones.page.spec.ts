import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LAtencionesPage } from './l-atenciones.page';

describe('LAtencionesPage', () => {
  let component: LAtencionesPage;
  let fixture: ComponentFixture<LAtencionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LAtencionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LAtencionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
