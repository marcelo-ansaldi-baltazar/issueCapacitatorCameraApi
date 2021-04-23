import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElegirPerfilPage } from './elegir-perfil.page';

describe('ElegirPerfilPage', () => {
  let component: ElegirPerfilPage;
  let fixture: ComponentFixture<ElegirPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElegirPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
