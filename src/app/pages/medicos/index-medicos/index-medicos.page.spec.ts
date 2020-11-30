import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndexMedicosPage } from './index-medicos.page';

describe('IndexMedicosPage', () => {
  let component: IndexMedicosPage;
  let fixture: ComponentFixture<IndexMedicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexMedicosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexMedicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
