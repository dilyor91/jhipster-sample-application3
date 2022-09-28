import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CenterStructureFormService } from './center-structure-form.service';
import { CenterStructureService } from '../service/center-structure.service';
import { ICenterStructure } from '../center-structure.model';

import { CenterStructureUpdateComponent } from './center-structure-update.component';

describe('CenterStructure Management Update Component', () => {
  let comp: CenterStructureUpdateComponent;
  let fixture: ComponentFixture<CenterStructureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let centerStructureFormService: CenterStructureFormService;
  let centerStructureService: CenterStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CenterStructureUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CenterStructureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CenterStructureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    centerStructureFormService = TestBed.inject(CenterStructureFormService);
    centerStructureService = TestBed.inject(CenterStructureService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const centerStructure: ICenterStructure = { id: 456 };

      activatedRoute.data = of({ centerStructure });
      comp.ngOnInit();

      expect(comp.centerStructure).toEqual(centerStructure);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICenterStructure>>();
      const centerStructure = { id: 123 };
      jest.spyOn(centerStructureFormService, 'getCenterStructure').mockReturnValue(centerStructure);
      jest.spyOn(centerStructureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ centerStructure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: centerStructure }));
      saveSubject.complete();

      // THEN
      expect(centerStructureFormService.getCenterStructure).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(centerStructureService.update).toHaveBeenCalledWith(expect.objectContaining(centerStructure));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICenterStructure>>();
      const centerStructure = { id: 123 };
      jest.spyOn(centerStructureFormService, 'getCenterStructure').mockReturnValue({ id: null });
      jest.spyOn(centerStructureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ centerStructure: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: centerStructure }));
      saveSubject.complete();

      // THEN
      expect(centerStructureFormService.getCenterStructure).toHaveBeenCalled();
      expect(centerStructureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICenterStructure>>();
      const centerStructure = { id: 123 };
      jest.spyOn(centerStructureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ centerStructure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(centerStructureService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
