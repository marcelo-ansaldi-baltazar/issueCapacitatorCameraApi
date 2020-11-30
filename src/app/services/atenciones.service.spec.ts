import { TestBed } from '@angular/core/testing';

import { AtencionesService } from './atenciones.service';

describe('AtencionesService', () => {
  let service: AtencionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtencionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
