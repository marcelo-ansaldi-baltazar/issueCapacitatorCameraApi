import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LAtencionesPacientesPage } from './l-atenciones-pacientes.page';

describe('LAtencionesPage', () => {
  let component: LAtencionesPacientesPage;
  let fixture: ComponentFixture<LAtencionesPacientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LAtencionesPacientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LAtencionesPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
