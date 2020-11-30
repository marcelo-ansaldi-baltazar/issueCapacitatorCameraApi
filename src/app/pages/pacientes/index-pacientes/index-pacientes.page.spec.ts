import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndexPacientesPage } from './index-pacientes.page';

describe('IndexPacientesPage', () => {
  let component: IndexPacientesPage;
  let fixture: ComponentFixture<IndexPacientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPacientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
