import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CenterStructureDetailComponent } from './center-structure-detail.component';

describe('CenterStructure Management Detail Component', () => {
  let comp: CenterStructureDetailComponent;
  let fixture: ComponentFixture<CenterStructureDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CenterStructureDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ centerStructure: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CenterStructureDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CenterStructureDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load centerStructure on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.centerStructure).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
