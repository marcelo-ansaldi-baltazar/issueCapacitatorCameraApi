import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CotizarExamenPage } from './cotizar-examen.page';

describe('CotizarExamenPage', () => {
  let component: CotizarExamenPage;
  let fixture: ComponentFixture<CotizarExamenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizarExamenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CotizarExamenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
