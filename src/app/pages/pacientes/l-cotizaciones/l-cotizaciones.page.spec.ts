import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LCotizacionesPage } from './l-cotizaciones.page';

describe('LCotizacionesPage', () => {
  let component: LCotizacionesPage;
  let fixture: ComponentFixture<LCotizacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LCotizacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LCotizacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
